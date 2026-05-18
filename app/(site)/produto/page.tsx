import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from './ProductDetails';
import { getProductBySlug } from '@/lib/products';

type SearchParams = Promise<{ variant?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { variant } = await searchParams;
  const product = await getProductBySlug(variant || 'intro');
  if (!product) return { title: 'Produto não encontrado — OMR Beauty' };
  return {
    title: `${product.name} — OMR Beauty Angola`,
    description: product.description?.[0] ?? product.tagline,
  };
}

export default async function ProdutoPage({ searchParams }: { searchParams: SearchParams }) {
  const { variant } = await searchParams;
  const product = await getProductBySlug(variant || 'intro');
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
