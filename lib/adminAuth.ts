import { User } from '@supabase/supabase-js';

const rawAdminEmails = import.meta.env.VITE_ADMIN_EMAILS || '';

const adminEmailAllowlist = rawAdminEmails
  .split(',')
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

export const hasAdminAllowlist = adminEmailAllowlist.length > 0;

export function isAdminUser(user: User | null) {
  if (!user?.email || !hasAdminAllowlist) {
    return false;
  }

  return adminEmailAllowlist.includes(user.email.toLowerCase());
}
