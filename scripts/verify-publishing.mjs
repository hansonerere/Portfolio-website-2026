import fs from 'node:fs';
import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:8788';
const credentials = fs.readFileSync('.migration-private/admin-credentials.txt', 'utf8');
const email = credentials.match(/^Email: (.+)$/m)?.[1];
const password = credentials.match(/^Password: (.+)$/m)?.[1];
const login = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { origin: base, 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
assert.equal(login.status, 200, 'Administrator login failed.');
const cookie = login.headers.get('set-cookie').split(';')[0];
try {
  const form = new FormData();
  form.append('folder', 'migration-verification');
  form.append('file', new Blob([Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6P5sAAAAASUVORK5CYII='), char => char.charCodeAt(0))], { type: 'image/png' }), 'pixel.png');
  const uploaded = await fetch(`${base}/api/upload`, { method: 'POST', headers: { cookie, origin: base }, body: form });
  assert.equal(uploaded.status, 200, await uploaded.clone().text());
  const asset = await uploaded.json();
  assert.ok(asset.url.startsWith('https://assets.podstudio.work/'));
  const published = await fetch(`${base}/api/admin/publish`, { method: 'POST', headers: { cookie, origin: base } });
  assert.equal(published.status, 200, await published.clone().text());
  if (!base.includes('127.0.0.1')) {
    assert.equal((await fetch(asset.url, { method: 'HEAD' })).status, 200);
    const backup = await fetch('https://assets.podstudio.work/content/published.json');
    assert.equal(backup.status, 200);
    const content = await backup.json();
    assert.equal(content.projects.length, 10);
    assert.equal(content.projectGallery.length, 90);
  }
  const result = { base, upload: 'passed', publishing: 'passed', verificationObject: asset.key };
  fs.writeFileSync('.migration-private/publishing-verification.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await fetch(`${base}/api/auth/logout`, { method: 'POST', headers: { cookie, origin: base } });
}
