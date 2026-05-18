-- ─────────────────────────────────────────────────────────────
-- OMR Beauty Angola — Schema (run once in Supabase SQL editor)
-- ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ───────── Helper: who's an admin? ─────────
-- Admin = a user whose auth.users.app_metadata.role = 'admin'.
-- We use app_metadata (not user_metadata) because users can't edit it.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- ───────── products ─────────
create table if not exists public.products (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name             text not null,
  tagline          text not null,
  price_kz         integer not null check (price_kz >= 0),
  description      jsonb not null default '[]'::jsonb, -- string[]
  specs            jsonb not null default '[]'::jsonb, -- string[]
  ritual           text not null default '',
  images           jsonb not null default '[]'::jsonb, -- string[] (urls)
  category         text not null check (category in ('parfum','oil','candle','accessory')),
  featured_order   integer,
  in_stock         boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists products_category_idx       on public.products (category);
create index if not exists products_featured_order_idx on public.products (featured_order);

-- ───────── orders ─────────
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  order_number      text unique not null,
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text,
  shipping_address  text,
  total_kz          integer not null check (total_kz >= 0),
  status            text not null default 'pending'
                    check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- ───────── order_items ─────────
create table if not exists public.order_items (
  id               uuid primary key default gen_random_uuid(),
  order_id         uuid not null references public.orders(id) on delete cascade,
  product_id       uuid references public.products(id) on delete set null,
  product_name     text not null,                  -- snapshot at order time
  product_tagline  text not null,
  price_kz         integer not null check (price_kz >= 0),
  quantity         integer not null default 1 check (quantity > 0),
  created_at       timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- ───────── updated_at trigger ─────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- ───────── Order number generator ─────────
-- Format: OMR-YYYYMMDD-XXXX (XXXX = 4-digit hex of random bytes)
create or replace function public.generate_order_number()
returns text language plpgsql as $$
declare
  candidate text;
  attempts int := 0;
begin
  loop
    candidate := 'OMR-' || to_char(now(), 'YYYYMMDD') || '-' ||
                 upper(encode(gen_random_bytes(2), 'hex'));
    if not exists (select 1 from public.orders where order_number = candidate) then
      return candidate;
    end if;
    attempts := attempts + 1;
    if attempts > 8 then
      raise exception 'Could not generate unique order number';
    end if;
  end loop;
end;
$$;

-- ───────── RLS ─────────
alter table public.products    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

-- Drop old policies if re-running
drop policy if exists "products: public read"        on public.products;
drop policy if exists "products: admin write"        on public.products;
drop policy if exists "orders: admin read"           on public.orders;
drop policy if exists "orders: public insert"        on public.orders;
drop policy if exists "orders: admin update"         on public.orders;
drop policy if exists "order_items: admin read"      on public.order_items;
drop policy if exists "order_items: public insert"   on public.order_items;

-- Products: anyone can read, only admins can write.
create policy "products: public read"
  on public.products for select
  to anon, authenticated
  using (true);

create policy "products: admin write"
  on public.products for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Orders: admins can read all; anyone can create a pending order via checkout.
create policy "orders: admin read"
  on public.orders for select
  to authenticated
  using (public.is_admin());

create policy "orders: public insert"
  on public.orders for insert
  to anon, authenticated
  with check (status = 'pending');

create policy "orders: admin update"
  on public.orders for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Order items: admins can read all; checkout inserts items tied to the new order.
create policy "order_items: admin read"
  on public.order_items for select
  to authenticated
  using (public.is_admin());

create policy "order_items: public insert"
  on public.order_items for insert
  to anon, authenticated
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.status = 'pending'
    )
  );
