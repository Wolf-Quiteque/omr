import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { ProductRow } from '@/lib/supabase/types';
import { updateProduct } from '../actions';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle<ProductRow>();

  if (!product) notFound();

  async function action(formData: FormData) {
    'use server';
    return updateProduct(id, formData);
  }

  return (
    <>
      <header className="admin__page-header">
        <div>
          <h1 className="admin__page-title">{product.name}</h1>
          <p className="admin__page-subtitle">{product.tagline}</p>
        </div>
      </header>
      <div className="admin__card" style={{ padding: '1.5rem' }}>
        <ProductForm initial={product} action={action} />
      </div>
    </>
  );
}
