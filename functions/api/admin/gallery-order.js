import { getAdmin } from '../../_lib/auth.js';
import { assertSameOrigin, invalidateContent, json, readJson } from '../../_lib/site.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!await getAdmin(request, env)) return json({ error: 'Please sign in.' }, 401);
  try {
    assertSameOrigin(request);
    const { projectId, ids } = await readJson(request);
    if (typeof projectId !== 'string' || !Array.isArray(ids) || ids.length > 2000 || new Set(ids).size !== ids.length || !ids.every(Number.isSafeInteger)) throw new Error('Invalid gallery order.');
    const current = await env.DB.prepare('SELECT id FROM project_gallery WHERE project_id = ?1').bind(projectId).all();
    const existingIds = new Set(current.results.map(row => row.id));
    if (ids.length !== existingIds.size || ids.some(id => !existingIds.has(id))) return json({ error: 'Gallery changed. Reload before sorting.' }, 409);
    if (ids.length) await env.DB.batch(ids.map((id, index) => env.DB.prepare('UPDATE project_gallery SET order_index = ?1, updated_at = CURRENT_TIMESTAMP WHERE id = ?2 AND project_id = ?3').bind(index + 1, id, projectId)));
    await invalidateContent(context);
    return json({ ok: true });
  } catch (error) {
    return json({ error: error.message || 'Unable to sort gallery.' }, 400);
  }
}
