'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import type { OrderStatus } from '@/lib/supabase/types';

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath('/admin');
}
