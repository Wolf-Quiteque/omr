import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatKz } from '@/lib/supabase/types';
import { deleteProduct } from './actions';
import DeleteButton from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ProductsListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, name, tagline, price_kz, category, featured_order, in_stock, images')
    .order('featured_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false });

  return (
    <>
      <header className="admin__page-header">
        <div>
          <h1 className="admin__page-title">Produtos</h1>
          <p className="admin__page-subtitle">Gere o catálogo público da OMR Beauty.</p>
        </div>
        <Link href="/admin/products/new" className="admin__btn admin__btn--primary">
          + Novo produto
        </Link>
      </header>

      {error && <div className="admin__error">{error.message}</div>}

      <div className="admin__card">
        <table className="admin__table">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Stock</th>
              <th>Destaque</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: '#78716c', padding: '2rem' }}>
                  Ainda não há produtos. Cria o primeiro.
                </td>
              </tr>
            ) : (
              products!.map((p) => {
                const thumb = (p.images as string[] | null)?.[0];
                return (
                  <tr key={p.id}>
                    <td>
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumb} alt={p.name} className="admin__table-thumb" />
                      ) : (
                        <div className="admin__table-thumb" />
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#78716c' }}>{p.tagline}</div>
                    </td>
                    <td>{categoryLabel(p.category)}</td>
                    <td>{formatKz(p.price_kz)}</td>
                    <td>{p.in_stock ? 'Em stock' : 'Esgotado'}</td>
                    <td>{p.featured_order ?? '—'}</td>
                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link href={`/admin/products/${p.id}`} className="admin__btn">
                        Editar
                      </Link>
                      <DeleteButton
                        confirmText={`Apagar "${p.name}"?`}
                        action={async () => {
                          'use server';
                          await deleteProduct(p.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function categoryLabel(c: string) {
  switch (c) {
    case 'parfum': return 'Eau de Parfum';
    case 'oil': return 'Óleo';
    case 'candle': return 'Vela';
    case 'accessory': return 'Acessório';
    default: return c;
  }
}
