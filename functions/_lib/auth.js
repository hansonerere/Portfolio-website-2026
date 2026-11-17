const COOKIE = 'podstudio_session';
const MAX_AGE = 8 * 60 * 60;
const encoder = new TextEncoder();
const encode = value => btoa(String.fromCharCode(...value)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
const decode = value => Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), char => char.charCodeAt(0));

async function sessionKey(env) {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD_HASH || !env.SESSION_SECRET || env.SESSION_SECRET.length < 32) {
    throw new Error('Admin authentication is not configured.');
  }
  return crypto.subtle.importKey('raw', encoder.encode(env.SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function sha256(value) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)))].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function validPassword(env, password) {
  const key = await sessionKey(env);
  const digest = await sha256(password);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(env.ADMIN_PASSWORD_HASH));
  return crypto.subtle.verify('HMAC', key, signature, encoder.encode(digest));
}

export async function issueSession(request, env) {
  const key = await sessionKey(env);
  const payload = encode(encoder.encode(JSON.stringify({ email: env.ADMIN_EMAIL.toLowerCase(), exp: Math.floor(Date.now() / 1000) + MAX_AGE })));
  const signature = encode(new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload))));
  return cookie(request, `${payload}.${signature}`, MAX_AGE);
}

function cookie(request, value, maxAge) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

export function clearSession(request) {
  return cookie(request, '', 0);
}

export async function getAdmin(request, env) {
  const value = request.headers.get('cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!value) return null;
  try {
    const [payload, signature, extra] = value.split('.');
    if (!payload || !signature || extra) return null;
    const key = await sessionKey(env);
    if (!await crypto.subtle.verify('HMAC', key, decode(signature), encoder.encode(payload))) return null;
    const session = JSON.parse(new TextDecoder().decode(decode(payload)));
    if (session.exp <= Date.now() / 1000 || session.email !== env.ADMIN_EMAIL.toLowerCase()) return null;
    return { email: session.email };
  } catch {
    return null;
  }
}
