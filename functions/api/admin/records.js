import { getAdmin } from '../../_lib/auth.js';
import { CONTENT_TABLES, assertSameOrigin, decodeRow, invalidateContent, json, readJson } from '../../_lib/site.js';

function validate(values, allowed) {
  const result = {};
  for (const [field, value] of Object.entries(values)) {
    if (!allowed.includes(field)) throw new Error(`Unknown field: ${field}`);
    if (field === 'is_active') {
      if (typeof value !== 'boolean') throw new Error('Invalid active flag.');
      result[field] = Number(value);
    } else if (['contact_info', 'clients'].includes(field)) {
      if (value !== null && !Array.isArray(value)) throw new Error('Expected an array.');
      if (value && (value.length > 100 || value.some(item => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) return true;
        const keys = field === 'clients' ? ['name', 'year'] : ['label', 'value', 'type'];
        return keys.some(key => typeof item[key] !== 'string' || item[key].length > 2000)
          || (field === 'contact_info' && !['email', 'social', 'text'].includes(item.type));
      }))) throw new Error('Invalid contact or client entries.');
      result[field] = value === null ? null : JSON.stringify(value);
    } else if (['order_index', 'homepage_id', 'about_page_id'].includes(field)) {
      if (value !== null && (!Number.isSafeInteger(value) || value < 0 || value > 10000000)) throw new Error('Invalid position or parent ID.');
      result[field] = value;
    } else {
      if (value !== null && (typeof value !== 'string' || value.length > 100000)) throw new Error('Invalid text value.');
      if (field === 'type' && !['image', 'video'].includes(value)) throw new Error('Invalid media type.');
      if (field === 'layout_span' && !['full', 'half'].includes(value)) throw new Error('Invalid layout.');
      if (value && (field.includes('url') || ['image_url', 'cover_image', 'hero_video_poster'].includes(field))) {
        const parsed = new URL(value);
        if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Media URLs must use HTTP or HTTPS.');
      }
      result[field] = value;
    }
  }
  if (!Object.keys(result).length) throw new Error('No changes provided.');
  return result;
}

export async function onRequest(context) {
  const { request, env } = context;
  if (!await getAdmin(request, env)) return json({ error: 'Please sign in.' }, 401);
  if (!['POST', 'PUT', 'DELETE'].includes(request.method)) return json({ error: 'Method not allowed.' }, 405);
  try {
    assertSameOrigin(request);
    const { table, id, values } = await readJson(request);
    if (!Object.hasOwn(CONTENT_TABLES, table)) throw new Error('Invalid content table.');
    if (id !== undefined && (table === 'projects' ? typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id) : !Number.isSafeInteger(id) || id < 1)) throw new Error('Invalid record ID.');
    if (request.method === 'DELETE') {
      if (id === undefined) throw new Error('Record ID is required.');
      await env.DB.prepare(`DELETE FROM ${table} WHERE id = ?1`).bind(id).run();
      await invalidateContent(context);
      return json({ ok: true });
    }
    const payload = validate(values, CONTENT_TABLES[table]);
    const fields = Object.keys(payload);
    let row;
    if (request.method === 'PUT') {
      if (id === undefined) throw new Error('Record ID is required.');
      row = await env.DB.prepare(`UPDATE ${table} SET ${fields.map((field, index) => `${field} = ?${index + 1}`).join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?${fields.length + 1} RETURNING *`).bind(...fields.map(field => payload[field]), id).first();
      if (!row) return json({ error: 'Record not found.' }, 404);
    } else {
      if (table === 'projects') { fields.push('id'); payload.id = crypto.randomUUID(); }
      row = await env.DB.prepare(`INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map((_, index) => `?${index + 1}`).join(', ')}) RETURNING *`).bind(...fields.map(field => payload[field])).first();
    }
    await invalidateContent(context);
    return json(decodeRow(row));
  } catch (error) {
    return json({ error: error.message || 'Unable to save content.' }, 400);
  }
}
