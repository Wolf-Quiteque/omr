// DB row types. Keep in sync with supabase/migrations/001_init.sql.

export type ProductCategory = 'parfum' | 'oil' | 'candle' | 'accessory';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export type ProductRow = {
  id: string;
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
  created_at: string;
  updated_at: string;
};

export type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string | null;
  total_kz: number;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_tagline: string;
  price_kz: number;
  quantity: number;
  created_at: string;
};

export type OrderWithItems = OrderRow & { items: OrderItemRow[] };

/** Format a Kz integer as "Kz 115.000". */
export function formatKz(amount: number): string {
  return `Kz ${new Intl.NumberFormat('pt-PT').format(amount)}`;
}
