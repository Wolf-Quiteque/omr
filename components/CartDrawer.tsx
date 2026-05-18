'use client';

import { useEffect } from 'react';
import { useCart } from './CartProvider';

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <div
        className={`cart-overlay${drawerOpen ? ' cart-overlay--active' : ''}`}
        onClick={closeDrawer}
      ></div>
      <aside className={`cart-drawer${drawerOpen ? ' cart-drawer--active' : ''}`}>
        <div className="cart-drawer__header">
          <span className="cart-drawer__title">A Tua Selecção</span>
          <button className="cart-drawer__close" aria-label="Fechar" onClick={closeDrawer}>
            ×
          </button>
        </div>
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <p className="cart-drawer__empty-text">A tua selecção está vazia.</p>
              <p className="cart-drawer__affirmation">O aroma é o ritual invisível.</p>
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              {items.map((item, idx) => (
                <div className="cart-item" key={`${item.id}-${idx}`}>
                  <p className="cart-item__name">
                    {item.name} — {item.tagline}
                  </p>
                  <p className="cart-item__price">{item.price}</p>
                </div>
              ))}
              <p className="cart-item__affirm">Escolheste com intenção.</p>
            </div>
          )}
        </div>
        <div className="cart-drawer__footer">
          <button className="cart-drawer__checkout">Finalizar Compra</button>
        </div>
      </aside>
    </>
  );
}
