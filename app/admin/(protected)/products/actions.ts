'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { deleteR2Object, r2KeyFromUrl } from '@/lib/r2';
import type { ProductCategory } from '@/lib/supabase/types';

export type ProductFormPayload = {
  slug: string;
  name: string;
  tagline: string;
  price_kz: number;
  description: string[];
  specs: string[];
  ritual: string;
  images: string[];
  category: ProductCategory;
  featured_order: number | null;
  in_stock: boolean;
};

function parseFormData(formData: FormData): ProductFormPayload {
  const slug = String(formData.get('slug') ?? '').trim();
  const name = String(formData.get('name') ?? '').trim();
  const tagline = String(formData.get('tagline') ?? '').trim();
  const price_kz = parseInt(String(formData.get('price_kz') ?? '0'), 10) || 0;
  const description = String(formData.get('description') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const specs = String(formData.get('specs') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const ritual = String(formData.get('ritual') ?? '').trim();
  const images = String(formData.get('images') ?? '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const category = (String(formData.get('category') ?? 'parfum') as ProductCategory);
  const featuredRaw = String(formData.get('featured_order') ?? '').trim();
  const featured_order = featuredRaw === '' ? null : parseInt(featuredRaw, 10) || null;
  const in_stock = formData.get('in_stock') === 'on';

  return {
    slug,
    name,
    tagline,
    price_kz,
    description,
    specs,
    ritual,
    images,
    category,
    featured_order,
    in_stock,
  };
}

function validate(payload: ProductFormPayload): string | null {
  if (!/^[a-z0-9-]+$/.test(payload.slug)) {
    return 'Slug inválido. Usa apenas letras minúsculas, dígitos e hífens.';
  }
  if (!payload.name) return 'O nome é obrigatório.';
  if (!payload.tagline) return 'A descrição curta (tagline) é obrigatória.';
  if (payload.price_kz < 0) return 'O preço não pode ser negativo.';
  if (payload.images.length === 0) return 'Adiciona pelo menos uma imagem.';
  if (!['parfum', 'oil', 'candle', 'accessory'].includes(payload.category)) {
    return 'Categoria inválida.';
  }
  return null;
}

export async function createProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = parseFormData(formData);
  const error = validate(payload);
  if (error) return { error };

  const { error: insertErr } = await supabase.from('products').insert(payload);
  if (insertErr) return { error: insertErr.message };

  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/produto');
  redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = parseFormData(formData);
  const error = validate(payload);
  if (error) return { error };

  const { error: updateErr } = await supabase.from('products').update(payload).eq('id', id);
  if (updateErr) return { error: updateErr.message };

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
  revalidatePath('/');
  revalidatePath('/produto');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  const { supabase } = await requireAdmin();

  // Best-effort: clean up R2 objects we own.
  const { data: row } = await supabase.from('products').select('images').eq('id', id).maybeSingle();
  if (row?.images && Array.isArray(row.images)) {
    for (const url of row.images as string[]) {
      const key = r2KeyFromUrl(url);
      if (key) {
        try {
          await deleteR2Object(key);
        } catch {
          // Don't block deletion on R2 errors.
        }
      }
    }
  }

  const { error: delErr } = await supabase.from('products').delete().eq('id', id);
  if (delErr) return { error: delErr.message };

  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/produto');
}
