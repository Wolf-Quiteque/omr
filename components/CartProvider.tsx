'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type CartItem = {
  id: string;
  name: string;
  tagline: string;
  price: string;     // pre-formatted "Kz 115.000" for display
  priceKz: number;   // raw integer for totals/order creation
};

type CartState = {
  items: CartItem[];
  count: number;
  drawerOpen: boolean;
  addItem: (item: CartItem) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => [...prev, item]);
    setDrawerOpen(true);
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const clear = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider
      value={{
        items,
        count: items.length,
        drawerOpen,
        addItem,
        openDrawer,
        closeDrawer,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
