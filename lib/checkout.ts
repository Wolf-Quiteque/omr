'use server';

import { createSupabaseServerClient } from './supabase/server';

export type CheckoutItem = {
  product_id: string;
  product_name: string;
  product_tagline: string;
  price_kz: number;
  quantity: number;
};

export type CheckoutPayload = {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address?: string;
  notes?: string;
  items: CheckoutItem[];
};

export type CheckoutResult =
  | { ok: true; order_number: string }
  | { ok: false; error: string };

export async function createOrder(payload: CheckoutPayload): Promise<CheckoutResult> {
  if (!payload.customer_name?.trim()) return { ok: false, error: 'O nome é obrigatório.' };
  if (!payload.customer_email?.trim()) return { ok: false, error: 'O email é obrigatório.' };
  if (!payload.items?.length) return { ok: false, error: 'A sacola está vazia.' };

  for (const it of payload.items) {
    if (!it.product_id || it.price_kz < 0 || it.quantity < 1) {
      return { ok: false, error: 'Item inválido na sacola.' };
    }
  }

  const supabase = await createSupabaseServerClient();

  // Server-trusted price computation: re-read from DB to guard against
  // tampering with the client cart.
  const productIds = [...new Set(payload.items.map((i) => i.product_id))];
  const { data: products, error: lookupErr } = await supabase
    .from('products')
    .select('id, name, tagline, price_kz, in_stock')
    .in('id', productIds);

  if (lookupErr) return { ok: false, error: lookupErr.message };
  const byId = new Map((products ?? []).map((p) => [p.id, p]));

  const trustedItems: CheckoutItem[] = [];
  let total = 0;
  for (const it of payload.items) {
    const p = byId.get(it.product_id);
    if (!p) return { ok: false, error: `Produto não encontrado: ${it.product_name}` };
    if (!p.in_stock) return { ok: false, error: `${p.name} está esgotado.` };
    const item: CheckoutItem = {
      product_id: p.id,
      product_name: p.name,
      product_tagline: p.tagline,
      price_kz: p.price_kz,
      quantity: it.quantity,
    };
    trustedItems.push(item);
    total += p.price_kz * it.quantity;
  }

  // Generate order number via the DB function so it's collision-safe.
  const { data: orderNumberRow, error: rpcErr } = await supabase.rpc('generate_order_number');
  if (rpcErr || !orderNumberRow) {
    return { ok: false, error: 'Falha a gerar o número da encomenda.' };
  }

  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumberRow as unknown as string,
      customer_name: payload.customer_name.trim(),
      customer_email: payload.customer_email.trim(),
      customer_phone: payload.customer_phone?.trim() || null,
      shipping_address: payload.shipping_address?.trim() || null,
      notes: payload.notes?.trim() || null,
      total_kz: total,
      status: 'pending',
    })
    .select('id, order_number')
    .single();

  if (orderErr || !order) {
    return { ok: false, error: orderErr?.message || 'Falha a criar encomenda.' };
  }

  const { error: itemsErr } = await supabase.from('order_items').insert(
    trustedItems.map((it) => ({
      order_id: order.id,
      product_id: it.product_id,
      product_name: it.product_name,
      product_tagline: it.product_tagline,
      price_kz: it.price_kz,
      quantity: it.quantity,
    })),
  );

  if (itemsErr) {
    // Roll back the empty order so we don't leave an orphan.
    await supabase.from('orders').delete().eq('id', order.id);
    return { ok: false, error: itemsErr.message };
  }

  return { ok: true, order_number: order.order_number };
}
