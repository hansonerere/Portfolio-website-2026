import { FormEvent, useEffect, useMemo, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { hasAdminAllowlist, isAdminUser } from '../lib/adminAuth';
import { supabase } from '../lib/supabase';
import { AdminCMS } from './AdminCMS';

const ADMIN_HOME_PATH = '/admin';
const ADMIN_LOGIN_PATH = '/admin/login';

interface AdminAuthGateProps {
  pathname: string;
}

function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

function StatusScreen({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#eeeeee] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-['Red_Hat_Display'] font-bold">{title}</h1>
        <p className="text-sm text-[#9e9e9e]">{description}</p>
      </div>
    </div>
  );
}

export function AdminAuthGate({ pathname }: AdminAuthGateProps) {
  const normalizedPath = useMemo(() => normalizePathname(pathname), [pathname]);
  const isLoginPath = normalizedPath === ADMIN_LOGIN_PATH;
  const isProtectedAdminPath =
    normalizedPath === ADMIN_HOME_PATH ||
    (normalizedPath.startsWith('/admin/') && normalizedPath !== ADMIN_LOGIN_PATH);

  const [checkingSession, setCheckingSession] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        setErrorMessage(error.message);
      }

      setCurrentUser(data.session?.user ?? null);
      setCheckingSession(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (checkingSession) return;

    if (isLoginPath && currentUser && isAdminUser(currentUser)) {
      window.location.replace(ADMIN_HOME_PATH);
      return;
    }

    if (isProtectedAdminPath && !currentUser) {
      window.location.replace(ADMIN_LOGIN_PATH);
    }
  }, [checkingSession, currentUser, isLoginPath, isProtectedAdminPath]);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  }

  async function handleGitHubSignIn() {
    setErrorMessage(null);
    setIsSubmitting(true);

    const redirectTo = `${window.location.origin}${ADMIN_LOGIN_PATH}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    setErrorMessage(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    window.location.replace(ADMIN_LOGIN_PATH);
  }

  if (!hasAdminAllowlist) {
    return (
      <StatusScreen
        title="Admin not configured"
        description="Set VITE_ADMIN_EMAILS in your env (comma-separated), then redeploy."
      />
    );
  }

  if (checkingSession) {
    return <StatusScreen title="Checking session..." description="Please wait a moment." />;
  }

  if (isLoginPath) {
    if (currentUser && isAdminUser(currentUser)) {
      return <StatusScreen title="Signed in" description="Redirecting to the admin dashboard..." />;
    }

    if (currentUser && !isAdminUser(currentUser)) {
      return (
        <div className="min-h-screen bg-[#0f0f0f] text-[#eeeeee] flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#2a2a2a] bg-[#171717] p-6 space-y-4">
            <h1 className="text-2xl font-['Red_Hat_Display'] font-bold">Access denied</h1>
            <p className="text-sm text-[#9e9e9e]">
              Signed in as <strong>{currentUser.email}</strong>, but this account is not in the admin allowlist.
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full rounded-full bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 text-sm font-medium"
            >
              Sign out
            </button>
            {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#0f0f0f] text-[#eeeeee] flex items-center justify-center px-4">
        <form
          onSubmit={handleSignIn}
          className="w-full max-w-md rounded-3xl border border-[#2a2a2a] bg-[#171717] p-6 space-y-5"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#9e9e9e]">Admin Login</p>
            <h1 className="text-3xl font-['Red_Hat_Display'] font-bold mt-2">Sign in</h1>
          </div>

          <label className="block space-y-2">
            <span className="text-sm text-[#bdbdbd]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-xl bg-[#101010] border border-[#2a2a2a] px-3 py-2 text-sm outline-none focus:border-[#616161]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-[#bdbdbd]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-xl bg-[#101010] border border-[#2a2a2a] px-3 py-2 text-sm outline-none focus:border-[#616161]"
            />
          </label>

          {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in to admin'}
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px bg-[#2a2a2a] flex-1" />
            <span className="text-xs text-[#9e9e9e]">or</span>
            <div className="h-px bg-[#2a2a2a] flex-1" />
          </div>

          <button
            type="button"
            onClick={handleGitHubSignIn}
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#24292f] text-white px-4 py-2 text-sm font-medium hover:bg-[#2f363d] disabled:opacity-60"
          >
            Continue with GitHub
          </button>
        </form>
      </div>
    );
  }

  if (!currentUser) {
    return <StatusScreen title="Redirecting..." description="You need to sign in to continue." />;
  }

  if (!isAdminUser(currentUser)) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-[#eeeeee] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#2a2a2a] bg-[#171717] p-6 space-y-4">
          <h1 className="text-2xl font-['Red_Hat_Display'] font-bold">Access denied</h1>
          <p className="text-sm text-[#9e9e9e]">
            Signed in as <strong>{currentUser.email}</strong>, but this account is not in the admin allowlist.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-full bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 text-sm font-medium"
          >
            Sign out
          </button>
          {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed right-4 top-4 z-[80]">
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-full bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 text-sm font-medium shadow-lg"
        >
          Sign out
        </button>
      </div>
      <AdminCMS />
    </>
  );
}
