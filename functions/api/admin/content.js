import { getAdmin } from '../../_lib/auth.js';
import { contentData, json } from '../../_lib/site.js';

export async function onRequestGet({ request, env }) {
  if (!await getAdmin(request, env)) return json({ error: 'Please sign in.' }, 401);
  return json(await contentData(env.DB, true));
}
