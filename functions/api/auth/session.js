import { getAdmin } from '../../_lib/auth.js';
import { json } from '../../_lib/site.js';

export async function onRequestGet({ request, env }) {
  return json({ user: await getAdmin(request, env) });
}
