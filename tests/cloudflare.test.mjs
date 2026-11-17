import test from 'node:test';
import assert from 'node:assert/strict';
import { assertSameOrigin, publishContent, readJson } from '../functions/_lib/site.js';
import { getAdmin, issueSession, sha256, validPassword } from '../functions/_lib/auth.js';
import { onRequest as saveRecord } from '../functions/api/admin/records.js';

const base = 'https://portfolio.example';
const password = 'high-entropy-random-test-password-only';
const env = {
  ADMIN_EMAIL: 'admin@example.com',
  ADMIN_PASSWORD_HASH: await sha256(password),
  SESSION_SECRET: 'test-only-session-secret-with-at-least-32-characters',
};
const request = new Request(base);
const cookie = (await issueSession(request, env)).split(';')[0];

test('password and signed secure session reject tampering', async () => {
  assert.equal(await validPassword(env, password), true);
  assert.equal(await validPassword(env, 'incorrect'), false);
  const issued = await issueSession(request, env);
  assert.match(issued, /HttpOnly; SameSite=Strict/);
  assert.match(issued, /; Secure/);
  assert.equal((await getAdmin(new Request(base, { headers: { cookie } }), env)).email, env.ADMIN_EMAIL);
  assert.equal(await getAdmin(new Request(base, { headers: { cookie: cookie + 'modified' } }), env), null);
  assert.equal(await getAdmin(request, env), null);
  assert.equal(await getAdmin(new Request(base, { headers: { cookie } }), {}), null);
});

test('same-origin writes are enforced and request size is bounded', async () => {
  assert.doesNotThrow(() => assertSameOrigin(new Request(base, { headers: { origin: base } })));
  assert.throws(() => assertSameOrigin(new Request(base, { headers: { origin: 'https://attacker.example' } })));
  assert.throws(() => assertSameOrigin(request));
  await assert.rejects(readJson(new Request(base, { method: 'POST', headers: { 'content-type': 'application/json' }, body: 'x'.repeat(256001) })), /too large/);
});

test('invalid nested contact data cannot break public rendering', async () => {
  const response = await saveRecord({
    env,
    request: new Request(`${base}/api/admin/records`, {
      method: 'PUT', headers: { cookie, origin: base, 'content-type': 'application/json' },
      body: JSON.stringify({ table: 'about_cards', id: 1, values: { contact_info: [null] } }),
    }),
  });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /Invalid contact/);
});

test('R2 rate-limit retry rereads the most recent D1 content', async () => {
  let version = 0;
  let writes = 0;
  let saved;
  const DB = {
    prepare: sql => sql,
    batch: async () => {
      version++;
      return ['homepage', 'services', 'about', 'cards', 'projects', 'sections', 'gallery'].map((_, index) => ({ results: index === 0 ? [{ id: 1, hero_video_url: `version-${version}` }] : [] }));
    },
  };
  await publishContent({ DB, MEDIA_BUCKET: { put: async (_key, body) => {
    if (++writes === 1) throw new Error('429 Too Many Requests');
    saved = JSON.parse(body);
  } } });
  assert.equal(writes, 2);
  assert.equal(saved.homepage.hero_video_url, 'version-2');
});

test('R2 non-rate-limit failures are surfaced without retry', async () => {
  await assert.rejects(publishContent({ DB: { batch: async () => { throw new Error('database unavailable'); }, prepare: sql => sql }, MEDIA_BUCKET: {} }), /database unavailable/);
});
