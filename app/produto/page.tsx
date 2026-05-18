import type { Metadata } from 'next';
import ProductDetails from './ProductDetails';
import { getVariant } from './products';

type SearchParams = Promise<{ variant?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { variant } = await searchParams;
  const product = getVariant(variant);
  return {
    title: `${product.name} — OMR Beauty Angola`,
    description: product.description[0],
  };
}

export default async function ProdutoPage({ searchParams }: { searchParams: SearchParams }) {
  const { variant } = await searchParams;
  const product = getVariant(variant);
  return <ProductDetails product={product} />;
}
