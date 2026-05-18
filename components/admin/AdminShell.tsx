'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const LINKS = [
  { href: '/admin', label: 'Resumo' },
  { href: '/admin/products', label: 'Produtos' },
  { href: '/admin/orders', label: 'Encomendas' },
];

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          OMR
          <small>Admin Angola</small>
        </div>
        {LINKS.map((link) => {
          const active =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`admin__nav-link${active ? ' admin__nav-link--active' : ''}`}
            >
              {link.label}
            </Link>
          );
        })}
        <div className="admin__sidebar-footer">
          <span>{email}</span>
          <button
            className="admin__btn"
            onClick={signOut}
            style={{ alignSelf: 'flex-start' }}
          >
            Sair
          </button>
          <Link href="/" style={{ fontSize: '0.7rem' }}>
            ← Ver loja
          </Link>
        </div>
      </aside>
      <main className="admin__main">{children}</main>
    </div>
  );
}
