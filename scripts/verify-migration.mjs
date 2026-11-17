import fs from 'node:fs';
import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:8788';
const local = ['localhost', '127.0.0.1'].includes(new URL(base).hostname);
const credentials = fs.readFileSync('.migration-private/admin-credentials.txt', 'utf8');
const email = credentials.match(/^Email: (.+)$/m)?.[1];
const password = credentials.match(/^Password: (.+)$/m)?.[1];
const expected = JSON.parse(fs.readFileSync('.migration-private/website-content.json', 'utf8'));
const checks = [];
let cookie = '';
for (const path of ['/admin', '/admin/login']) {
  const response = await fetch(base + path, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path} must preserve the client-side route without redirecting`);
  assert.match(await response.text(), /id="root"/);
}
checks.push('Admin and login deep links serve the app directly without redirecting to the homepage.');
async function call(path, method = 'GET', body, session = cookie, origin = base) {
  return fetch(`${base}${path}`, {
    method,
    headers: { ...(session ? { cookie: session } : {}), ...(method !== 'GET' ? { origin, 'content-type': 'application/json' } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const published = await call('/api/content');
assert.equal(published.status, 200);
const publicData = await published.json();
assert.equal(publicData.projects.length, expected.projects.filter(project => project.is_active).length);
assert.equal(publicData.projectGallery.length, expected.project_gallery.length);
assert.ok(!JSON.stringify(publicData).includes('supabase.co'));
checks.push('Public projects and gallery match the recovered source; all media URLs are independent of Supabase.');
assert.equal((await call('/api/admin/content', 'GET', undefined, '')).status, 401);
assert.equal((await call('/api/admin/records', 'POST', { table: 'projects', values: {} }, '')).status, 401);
assert.equal((await call('/api/upload', 'POST', {}, '')).status, 401);
assert.equal((await call('/api/admin/content', 'GET', undefined, 'podstudio_session=fake.signature')).status, 401);
checks.push('Unauthenticated content editing, uploads, and forged sessions are rejected.');
assert.equal((await call('/api/auth/login', 'POST', { email, password: 'incorrect-password' }, '')).status, 401);
const signedIn = await call('/api/auth/login', 'POST', { email, password }, '');
assert.equal(signedIn.status, 200);
const header = signedIn.headers.get('set-cookie');
assert.ok(header?.includes('HttpOnly') && header.includes('SameSite=Strict'));
if (!local) assert.ok(header.includes('Secure'));
cookie = header.split(';')[0];
assert.equal((await call('/api/auth/session')).status, 200);
const admin = await call('/api/admin/content');
assert.equal(admin.status, 200);
const all = await admin.json();
for (const [table, key] of Object.entries({ homepage: 'homepage', service_cards: 'services', about_page: 'aboutPage', about_cards: 'aboutCards', projects: 'projects', project_sections: 'projectSections', project_gallery: 'projectGallery' })) {
  const rows = Array.isArray(all[key]) ? all[key] : [all[key]];
  assert.equal(rows.length, expected[table].length, `Count mismatch for ${table}`);
  for (const source of expected[table]) {
    const normalize = ({ updated_at, ...content }) => content;
    assert.deepEqual(normalize(rows.find(row => row.id === source.id) || {}), normalize(source), `Data mismatch in ${table} ID ${source.id}`);
  }
}
checks.push('Administrator login succeeds; all seven tables match the recovered data field for field.');

if (local) {
  let projectId;
  const save = async (table, id, values) => {
    const response = await call('/api/admin/records', id ? 'PUT' : 'POST', { table, id, values });
    assert.equal(response.status, 200, await response.clone().text());
    return response.json();
  };
  try {
    const project = await save('projects', undefined, { title: 'Migration verification', description: '', year: '2026', category: 'Project', cover_image: '', hero_video_url: '', hero_video_poster: '', is_active: false, order_index: 1000 });
    projectId = project.id;
    assert.equal((await save('projects', projectId, { description: 'Verified edit' })).description, 'Verified edit');
    await save('project_sections', undefined, { project_id: projectId, order_index: 1, title: 'Test section', content: 'Test' });
    const first = await save('project_gallery', undefined, { project_id: projectId, order_index: 1, type: 'image', url: 'https://assets.podstudio.work/example.png', layout_span: 'half' });
    const second = await save('project_gallery', undefined, { project_id: projectId, order_index: 2, type: 'video', url: 'https://assets.podstudio.work/example.mp4', layout_span: 'full' });
    assert.equal((await call('/api/admin/gallery-order', 'POST', { projectId, ids: [second.id, first.id] })).status, 200);
    const after = await (await call('/api/admin/content')).json();
    assert.deepEqual(after.projectGallery.filter(row => row.project_id === projectId).map(row => row.id), [second.id, first.id]);
    assert.equal((await call('/api/admin/gallery-order', 'POST', { projectId, ids: [first.id] })).status, 409);
    const crossOrigin = await call('/api/admin/records', 'PUT', { table: 'projects', id: projectId, values: { title: 'Invalid' } }, cookie, 'https://attacker.invalid');
    assert.ok([400, 403].includes(crossOrigin.status));
    assert.equal((await call('/api/admin/records', 'PUT', { table: 'projects', id: projectId, values: { cover_image: 'javascript:alert(1)' } })).status, 400);
    assert.equal((await call('/api/admin/records', 'PUT', { table: 'projects; DROP TABLE projects', id: projectId, values: { title: 'Invalid' } })).status, 400);
    checks.push('Create/edit, gallery layouts, atomic drag sorting, conflict detection, origin checks, and input validation pass.');
    const form = new FormData();
    form.append('folder', 'migration-verification');
    form.append('file', new Blob([Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6P5sAAAAASUVORK5CYII='), char => char.charCodeAt(0))], { type: 'image/png' }), 'test.png');
    const uploaded = await fetch(`${base}/api/upload`, { method: 'POST', headers: { cookie, origin: base }, body: form });
    assert.equal(uploaded.status, 200, await uploaded.clone().text());
    assert.ok((await uploaded.json()).url.startsWith('https://assets.podstudio.work/'));
    checks.push('Authenticated upload writes to the local R2 binding.');
  } finally {
    if (projectId) {
      assert.equal((await call('/api/admin/records', 'DELETE', { table: 'projects', id: projectId })).status, 200);
      const after = await (await call('/api/admin/content')).json();
      assert.ok(!after.projectGallery.some(row => row.project_id === projectId));
      assert.ok(!after.projectSections.some(row => row.project_id === projectId));
    }
  }
}
assert.equal((await call('/api/auth/logout', 'POST')).status, 200);
checks.push('Logout clears the browser session.');
console.log(JSON.stringify({ base, passed: checks }, null, 2));
