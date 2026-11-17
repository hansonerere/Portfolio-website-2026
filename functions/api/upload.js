import { getAdmin } from '../_lib/auth.js';
import { assertSameOrigin } from '../_lib/site.js';

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

export async function onRequestPost({ request, env }) {
  if (!await getAdmin(request, env)) return json({ error: 'Please sign in.' }, 401);
  if (!env.MEDIA_BUCKET || !env.R2_PUBLIC_BASE_URL) {
    return json({ error: 'R2 upload is not configured.' }, 500);
  }

  try { assertSameOrigin(request); } catch { return json({ error: 'Invalid request origin.' }, 403); }
  if (Number(request.headers.get('content-length')) > 55 * 1024 * 1024) return json({ error: 'Files must be smaller than 50 MB.' }, 413);

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = sanitizeFolder(formData.get('folder'));

  if (!(file instanceof File)) {
    return json({ error: 'Missing uploaded file.' }, 400);
  }

  if (file.size > 50 * 1024 * 1024) return json({ error: 'Files must be smaller than 50 MB.' }, 413);
  const key = `${folder}/${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;

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
