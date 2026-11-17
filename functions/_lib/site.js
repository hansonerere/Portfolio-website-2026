export const CONTENT_TABLES = {
  homepage: ['hero_video_url', 'hero_video_poster'],
  service_cards: ['homepage_id', 'order_index', 'number', 'title', 'description', 'image_url'],
  about_page: ['hero_title'],
  about_cards: ['about_page_id', 'order_index', 'number', 'title', 'content', 'image_url', 'contact_info', 'clients'],
  projects: ['title', 'description', 'year', 'category', 'cover_image', 'hero_video_url', 'hero_video_poster', 'is_active', 'order_index'],
  project_sections: ['project_id', 'order_index', 'title', 'content'],
  project_gallery: ['project_id', 'order_index', 'type', 'url', 'alt_text', 'layout_span'],
};

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...headers },
  });
}

export function decodeRow(row) {
  if (!row) return row;
  const result = { ...row };
  if ('is_active' in result) result.is_active = Boolean(result.is_active);
  for (const field of ['contact_info', 'clients']) {
    if (typeof result[field] === 'string') result[field] = JSON.parse(result[field]);
  }
  return result;
}

export async function contentData(db, admin = false) {
  const tables = Object.keys(CONTENT_TABLES);
  const results = await db.batch(tables.map(table => db.prepare(
    `SELECT * FROM ${table} ORDER BY ${CONTENT_TABLES[table].includes('order_index') ? 'order_index, ' : ''}id`,
  )));
  const rows = Object.fromEntries(tables.map((table, index) => [table, results[index].results.map(decodeRow)]));
  const projects = admin ? rows.projects : rows.projects.filter(row => row.is_active);
  const ids = new Set(projects.map(row => row.id));
  return {
    homepage: rows.homepage[0] || null, services: rows.service_cards,
    aboutPage: rows.about_page[0] || null, aboutCards: rows.about_cards,
    projects,
    projectSections: rows.project_sections.filter(row => ids.has(row.project_id)),
    projectGallery: rows.project_gallery.filter(row => ids.has(row.project_id)),
  };
}

export function assertSameOrigin(request) {
  const origin = request.headers.get('origin');
  const site = request.headers.get('sec-fetch-site');
  if (!origin || origin !== new URL(request.url).origin || (site && site !== 'same-origin' && site !== 'none')) {
    throw new Error('Cross-origin requests are not allowed.');
  }
}

export async function readJson(request) {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new Error('Expected JSON.');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing request body.');
  const decoder = new TextDecoder();
  let body = '';
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 256_000) { await reader.cancel(); throw new Error('Request is too large.'); }
    body += decoder.decode(value, { stream: true });
  }
  return JSON.parse(body + decoder.decode());
}

export async function invalidateContent(context) {
  const url = new URL('/api/content', context.request.url).toString();
  await caches.default.delete(new Request(url));
  context.waitUntil(publishContent(context.env).catch(error => {
    console.error(JSON.stringify({ event: 'snapshot_publish_failed', message: error.message }));
  }));
}

export async function publishContent(env) {
  if (!env.MEDIA_BUCKET) throw new Error('Media storage is not configured.');
  for (let attempt = 0; ; attempt++) {
    try {
      // Reread after each retry so concurrent saves cannot publish an old snapshot.
      const data = await contentData(env.DB);
      await env.MEDIA_BUCKET.put('content/published.json', JSON.stringify(data), {
        httpMetadata: { contentType: 'application/json', cacheControl: 'public, max-age=30' },
      });
      return;
    } catch (error) {
      if (attempt >= 4 || !/429|too many|rate.?limit/i.test(error.message)) throw error;
      await new Promise(resolve => setTimeout(resolve, 1100 * 2 ** attempt + Math.random() * 300));
    }
  }
}
