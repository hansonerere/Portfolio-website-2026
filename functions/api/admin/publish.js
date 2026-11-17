import { getAdmin } from '../../_lib/auth.js';
import { assertSameOrigin, json, publishContent } from '../../_lib/site.js';

export async function onRequestPost({ request, env }) {
  if (!await getAdmin(request, env)) return json({ error: 'Please sign in.' }, 401);
  try {
    assertSameOrigin(request);
    await publishContent(env);
    return json({ ok: true });
  } catch {
    return json({ error: 'Unable to publish a content backup.' }, 503);
  }
}
