import { requireAdmin } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { email } = await requireAdmin();
  return <AdminShell email={email}>{children}</AdminShell>;
}
