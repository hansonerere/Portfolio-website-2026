export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...options,
    credentials: 'same-origin',
    headers: { ...(options.body instanceof FormData ? {} : { 'content-type': 'application/json' }), ...options.headers },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload) throw new Error(payload?.error || `Request failed (${response.status}).`);
  return payload as T;
}
