import { createSupabaseServerClient } from './supabase/server';
import type { ProductRow } from './supabase/types';

/**
 * Read products from Supabase. Returns [] if Supabase isn't configured
 * (e.g. during local dev before env is set), so the build never crashes.
 */
export async function getProducts(): Promise<ProductRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('featured_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });
    if (error) {
      console.error('[getProducts]', error.message);
      return [];
    }
    return (data ?? []) as ProductRow[];
  } catch (err) {
    console.error('[getProducts]', err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle<ProductRow>();
    return data;
  } catch (err) {
    console.error('[getProductBySlug]', err);
    return null;
  }
}

export function pickFeatured(
  products: ProductRow[],
  category: 'parfum' | 'oil' | 'candle' | 'accessory',
  limit: number,
): ProductRow[] {
  return products.filter((p) => p.category === category && p.in_stock).slice(0, limit);
}
