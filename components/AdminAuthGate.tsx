import { FormEvent, useEffect, useState } from 'react';
import { api } from '../lib/api';
import { AdminCMS } from './AdminCMS';

type AdminUser = { email: string };

export function AdminAuthGate({ pathname }: { pathname: string }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    void api<{ user: AdminUser | null }>('/api/auth/session').then(data => {
      if (mounted) setUser(data.user);
    }).catch(reason => {
      if (mounted) setError(reason instanceof Error ? reason.message : 'Unable to check your session.');
    }).finally(() => { if (mounted) setChecking(false); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!checking && user && pathname === '/admin/login') window.location.replace('/admin');
  }, [checking, user, pathname]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      const result = await api<{ user: AdminUser }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: email.trim(), password }) });
      setUser(result.user);
      setPassword('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in.');
    } finally { setPending(false); }
  }

  async function signOut() {
    try {
      await api('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.replace('/admin/login');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to sign out.'); }
  }

  if (checking) return <div className="min-h-screen bg-[#0f0f0f] text-[#9e9e9e] flex items-center justify-center">Checking session...</div>;

  if (user) return <>
    <div className="fixed right-4 top-4 z-[80] flex items-center gap-3">
      <span className="hidden text-xs text-[#9e9e9e] sm:inline">{user.email}</span>
      <button type="button" onClick={signOut} className="rounded-full bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 text-sm font-medium">Sign out</button>
    </div>
    {error && <div role="alert" className="bg-red-900 p-3 text-white">{error}</div>}
    <AdminCMS />
  </>;

  return <div className="min-h-screen bg-[#0f0f0f] text-[#eeeeee] flex items-center justify-center px-4">
    <form onSubmit={signIn} className="w-full max-w-md rounded-3xl border border-[#2a2a2a] bg-[#171717] p-6 space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#9e9e9e]">POD Studio</p>
        <h1 className="text-3xl font-['Red_Hat_Display'] font-bold mt-2">Admin sign in</h1>
      </div>
      <label className="block space-y-2"><span className="text-sm text-[#bdbdbd]">Email</span>
        <input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required className="w-full rounded-xl bg-[#101010] border border-[#2a2a2a] px-3 py-2 text-sm outline-none focus:border-[#616161]" />
      </label>
      <label className="block space-y-2"><span className="text-sm text-[#bdbdbd]">Password</span>
        <input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required className="w-full rounded-xl bg-[#101010] border border-[#2a2a2a] px-3 py-2 text-sm outline-none focus:border-[#616161]" />
      </label>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={pending} className="w-full rounded-full bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 text-sm font-medium disabled:opacity-60">{pending ? 'Signing in...' : 'Sign in'}</button>
    </form>
  </div>;
}
