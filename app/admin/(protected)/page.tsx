import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatKz } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const supabase = await createSupabaseServerClient();

  const [{ count: productCount }, { count: orderCount }, { data: recentOrders }, { data: pendingRevenue }] =
    await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase
        .from('orders')
        .select('id, order_number, customer_name, total_kz, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase.from('orders').select('total_kz').neq('status', 'cancelled'),
    ]);

  const totalRevenue =
    pendingRevenue?.reduce((acc, r) => acc + (r.total_kz || 0), 0) ?? 0;

  return (
    <>
      <header className="admin__page-header">
        <div>
          <h1 className="admin__page-title">Resumo</h1>
          <p className="admin__page-subtitle">Visão geral da loja.</p>
        </div>
      </header>

      <section className="admin__stats">
        <div className="admin__card admin__stat">
          <p className="admin__stat-label">Produtos</p>
          <p className="admin__stat-value">{productCount ?? 0}</p>
        </div>
        <div className="admin__card admin__stat">
          <p className="admin__stat-label">Encomendas</p>
          <p className="admin__stat-value">{orderCount ?? 0}</p>
        </div>
        <div className="admin__card admin__stat">
          <p className="admin__stat-label">Receita acumulada</p>
          <p className="admin__stat-value">{formatKz(totalRevenue)}</p>
        </div>
      </section>

      <header className="admin__page-header" style={{ marginTop: '2rem' }}>
        <div>
          <h2 className="admin__page-title" style={{ fontSize: '1.1rem' }}>
            Encomendas recentes
          </h2>
        </div>
        <Link href="/admin/orders" className="admin__btn">
          Ver todas →
        </Link>
      </header>

      <div className="admin__card">
        <table className="admin__table">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(recentOrders ?? []).length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#78716c', padding: '2rem' }}>
                  Ainda sem encomendas.
                </td>
              </tr>
            ) : (
              recentOrders!.map((o) => (
                <tr key={o.id}>
                  <td>{o.order_number}</td>
                  <td>{o.customer_name}</td>
                  <td>{formatKz(o.total_kz)}</td>
                  <td>
                    <span className={`admin__pill admin__pill--${o.status}`}>{o.status}</span>
                  </td>
                  <td>{new Date(o.created_at).toLocaleDateString('pt-PT')}</td>
                  <td>
                    <Link href={`/admin/orders/${o.id}`}>Abrir</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
