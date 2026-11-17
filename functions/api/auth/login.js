import { issueSession, sha256, validPassword } from '../../_lib/auth.js';
import { assertSameOrigin, json, readJson } from '../../_lib/site.js';

export async function onRequestPost({ request, env }) {
  try {
    assertSameOrigin(request);
    if (!env.DB || !env.SESSION_SECRET || !env.ADMIN_PASSWORD_HASH || !env.ADMIN_EMAIL) return json({ error: 'Admin login is not configured.' }, 503);
    const now = Math.floor(Date.now() / 1000);
    const ip = request.headers.get('cf-connecting-ip') || 'local';
    const bucket = await sha256(`${env.SESSION_SECRET}:${ip}:${Math.floor(now / 900)}`);
    const rate = await env.DB.prepare('INSERT INTO admin_login_attempts (bucket, attempts, expires_at) VALUES (?1, 1, ?2) ON CONFLICT(bucket) DO UPDATE SET attempts = attempts + 1 RETURNING attempts').bind(bucket, now + 900).first();
    if (rate.attempts > 10) return json({ error: 'Too many login attempts. Try again in 15 minutes.' }, 429, { 'retry-after': '900' });
    await env.DB.prepare('DELETE FROM admin_login_attempts WHERE expires_at < ?1').bind(now).run();
    const body = await readJson(request);
    if (typeof body.email !== 'string' || typeof body.password !== 'string' || body.password.length > 256) return json({ error: 'Invalid email or password.' }, 401);
    const valid = await validPassword(env, body.password);
    if (!valid || body.email.toLowerCase().trim() !== env.ADMIN_EMAIL.toLowerCase()) return json({ error: 'Invalid email or password.' }, 401);
    return json({ user: { email: env.ADMIN_EMAIL.toLowerCase() } }, 200, { 'set-cookie': await issueSession(request, env) });
  } catch (error) {
    console.error(JSON.stringify({ event: 'login_failed', message: error.message }));
    return json({ error: 'Unable to sign in.' }, 400);
  }
}
