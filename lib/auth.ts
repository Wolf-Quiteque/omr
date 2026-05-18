import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './supabase/server';

/**
 * Use in any admin server component. Redirects to /admin/login if the
 * current request isn't from an authenticated admin user.
 *
 * Middleware already redirects unauthenticated users; this also enforces
 * the role check so a logged-in non-admin can't reach the panel.
 */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const role = (user.app_metadata as { role?: string })?.role;
  if (role !== 'admin') {
    await supabase.auth.signOut();
    redirect('/admin/login');
  }

  return { user, email: user.email ?? 'admin', supabase };
}
