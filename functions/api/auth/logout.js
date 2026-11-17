import { clearSession } from '../../_lib/auth.js';
import { assertSameOrigin, json } from '../../_lib/site.js';

export async function onRequestPost({ request }) {
  try {
    assertSameOrigin(request);
    return json({ ok: true }, 200, { 'set-cookie': clearSession(request) });
  } catch {
    return json({ error: 'Invalid request origin.' }, 403);
  }
}
