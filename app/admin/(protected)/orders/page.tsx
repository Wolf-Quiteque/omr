import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatKz } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export default async function OrdersListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, order_number, customer_name, customer_email, total_kz, status, created_at')
    .order('created_at', { ascending: false });

  return (
    <>
      <header className="admin__page-header">
        <div>
          <h1 className="admin__page-title">Encomendas</h1>
          <p className="admin__page-subtitle">Todas as encomendas, mais recentes primeiro.</p>
        </div>
      </header>

      {error && <div className="admin__error">{error.message}</div>}

      <div className="admin__card">
        <table className="admin__table">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: '#78716c', padding: '2rem' }}>
                  Ainda sem encomendas.
                </td>
              </tr>
            ) : (
              orders!.map((o) => (
                <tr key={o.id}>
                  <td>{o.order_number}</td>
                  <td>{o.customer_name}</td>
                  <td>{o.customer_email}</td>
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
