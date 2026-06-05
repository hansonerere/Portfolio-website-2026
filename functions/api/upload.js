function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });
}

function sanitizeFolder(value) {
  return String(value || 'uploads')
    .trim()
    .replace(/[\\/]+/g, '/')
    .replace(/[^a-zA-Z0-9/_ -]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase() || 'uploads';
}

function sanitizeFilename(value) {
  const fallback = 'asset.bin';
  return String(value || fallback)
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || fallback;
}

function publicUrl(baseUrl, key) {
  const base = String(baseUrl || '').replace(/\/+$/g, '');
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return `${base}/${encodedKey}`;
}

async function verifyAdmin(request, env) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return { ok: false, error: 'Missing auth token.' };
  }

  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
  const adminEmails = String(env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!supabaseUrl || !supabaseAnonKey || adminEmails.length === 0) {
    return { ok: false, error: 'Upload auth is not configured.' };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/+$/g, '')}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { ok: false, error: 'Invalid auth token.' };
  }

  const user = await response.json();
  const email = String(user.email || '').toLowerCase();

  if (!adminEmails.includes(email)) {
    return { ok: false, error: 'This account is not allowed to upload media.' };
  }

  return { ok: true };
}

export async function onRequestPost({ request, env }) {
  if (!env.MEDIA_BUCKET || !env.R2_PUBLIC_BASE_URL) {
    return json({ error: 'R2 upload is not configured.' }, 500);
  }

  const auth = await verifyAdmin(request, env);
  if (!auth.ok) {
    return json({ error: auth.error }, 401);
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = sanitizeFolder(formData.get('folder'));

  if (!(file instanceof File)) {
    return json({ error: 'Missing uploaded file.' }, 400);
  }

  const key = `${folder}/${Date.now()}-${sanitizeFilename(file.name)}`;

  await env.MEDIA_BUCKET.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type || 'application/octet-stream',
      cacheControl: 'public, max-age=31536000, immutable',
    },
  });

  return json({
    key,
    url: publicUrl(env.R2_PUBLIC_BASE_URL, key),
  });
}

export async function onRequest() {
  return json({ error: 'Method not allowed.' }, 405);
}
