import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatKz, type OrderRow, type OrderItemRow } from '@/lib/supabase/types';
import OrderStatusForm from './OrderStatusForm';

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [{ data: order }, { data: items }] = await Promise.all([
    supabase.from('orders').select('*').eq('id', id).maybeSingle<OrderRow>(),
    supabase.from('order_items').select('*').eq('order_id', id).order('created_at'),
  ]);

  if (!order) notFound();
  const itemRows = (items ?? []) as OrderItemRow[];

  return (
    <>
      <header className="admin__page-header">
        <div>
          <h1 className="admin__page-title">{order.order_number}</h1>
          <p className="admin__page-subtitle">
            {new Date(order.created_at).toLocaleString('pt-PT')} · {formatKz(order.total_kz)}
          </p>
        </div>
        <OrderStatusForm id={order.id} status={order.status} />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="admin__card" style={{ padding: '1.25rem' }}>
          <h2 className="admin__label" style={{ marginBottom: '0.75rem' }}>Cliente</h2>
          <p style={{ fontWeight: 500 }}>{order.customer_name}</p>
          <p style={{ fontSize: '0.85rem' }}>{order.customer_email}</p>
          {order.customer_phone && (
            <p style={{ fontSize: '0.85rem' }}>{order.customer_phone}</p>
          )}
        </div>
        <div className="admin__card" style={{ padding: '1.25rem' }}>
          <h2 className="admin__label" style={{ marginBottom: '0.75rem' }}>Envio</h2>
          <p style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>
            {order.shipping_address || '—'}
          </p>
          {order.notes && (
            <>
              <h2 className="admin__label" style={{ margin: '0.75rem 0 0.4rem' }}>Notas</h2>
              <p style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{order.notes}</p>
            </>
          )}
        </div>
      </div>

      <div className="admin__card" style={{ marginTop: '1.5rem' }}>
        <table className="admin__table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Qtd</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {itemRows.map((it) => (
              <tr key={it.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{it.product_name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#78716c' }}>{it.product_tagline}</div>
                </td>
                <td>{formatKz(it.price_kz)}</td>
                <td>{it.quantity}</td>
                <td>{formatKz(it.price_kz * it.quantity)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} style={{ textAlign: 'right', fontWeight: 500 }}>Total</td>
              <td style={{ fontWeight: 500 }}>{formatKz(order.total_kz)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
