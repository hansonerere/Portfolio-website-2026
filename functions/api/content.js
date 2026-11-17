import { contentData, json } from '../_lib/site.js';

export async function onRequestGet(context) {
  const key = new Request(new URL('/api/content', context.request.url));
  const cached = await caches.default.match(key);
  if (cached) return cached;
  try {
    if (!context.env.DB) throw new Error('Content database is not configured.');
    const response = json(await contentData(context.env.DB), 200, { 'cache-control': 'public, max-age=30, s-maxage=60' });
    context.waitUntil(caches.default.put(key, response.clone()));
    return response;
  } catch (error) {
    console.error(JSON.stringify({ event: 'content_read_failed', message: error.message }));
    try {
      const backup = await context.env.MEDIA_BUCKET?.get('content/published.json');
      if (backup) return new Response(backup.body, { headers: {
        'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=30',
        'x-content-source': 'published-snapshot', 'x-content-type-options': 'nosniff',
      } });
    } catch (backupError) {
      console.error(JSON.stringify({ event: 'snapshot_read_failed', message: backupError.message }));
    }
    return json({ error: 'Content is temporarily unavailable.' }, 503);
  }
}
