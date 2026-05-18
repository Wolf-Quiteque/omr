'use client';

import { useEffect, useState } from 'react';
import { useCart } from './CartProvider';
import { createOrder } from '@/lib/checkout';
import { formatKz } from '@/lib/supabase/types';

type Step = 'cart' | 'checkout' | 'done';

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, clear } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const total = items.reduce((acc, i) => acc + i.priceKz, 0);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  // Reset to cart step when reopening
  useEffect(() => {
    if (drawerOpen && step === 'done') {
      setStep('cart');
    }
  }, [drawerOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  async function submitCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await createOrder({
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      shipping_address: address,
      notes,
      items: items.map((i) => ({
        product_id: i.id,
        product_name: i.name,
        product_tagline: i.tagline,
        price_kz: i.priceKz,
        quantity: 1,
      })),
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setOrderNumber(result.order_number);
    setStep('done');
    clear();
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setNotes('');
  }

  return (
    <>
      <div
        className={`cart-overlay${drawerOpen ? ' cart-overlay--active' : ''}`}
        onClick={closeDrawer}
      ></div>
      <aside className={`cart-drawer${drawerOpen ? ' cart-drawer--active' : ''}`}>
        <div className="cart-drawer__header">
          <span className="cart-drawer__title">
            {step === 'cart' && 'A Tua Selecção'}
            {step === 'checkout' && 'Finalizar Compra'}
            {step === 'done' && 'Encomenda Recebida'}
          </span>
          <button className="cart-drawer__close" aria-label="Fechar" onClick={closeDrawer}>
            ×
          </button>
        </div>

        <div className="cart-drawer__body">
          {step === 'cart' &&
            (items.length === 0 ? (
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
                <p
                  style={{
                    marginTop: '1.5rem',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  Total: <strong>{formatKz(total)}</strong>
                </p>
              </div>
            ))}

          {step === 'checkout' && (
            <form onSubmit={submitCheckout} className="checkout-form">
              {error && <div className="checkout-form__error">{error}</div>}
              <label className="checkout-form__field">
                <span>Nome completo</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label className="checkout-form__field">
                <span>Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
              <label className="checkout-form__field">
                <span>Telefone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="+244 ..."
                />
              </label>
              <label className="checkout-form__field">
                <span>Morada de entrega</span>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, bairro, cidade, província"
                />
              </label>
              <label className="checkout-form__field">
                <span>Notas (opcional)</span>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
              <p
                style={{
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                Total: <strong>{formatKz(total)}</strong>
              </p>
            </form>
          )}

          {step === 'done' && (
            <div className="cart-drawer__empty">
              <p className="cart-drawer__empty-text">Encomenda registada.</p>
              <p
                className="cart-drawer__affirmation"
                style={{ marginTop: '0.5rem', color: 'var(--ivory)' }}
              >
                Nº <strong>{orderNumber}</strong>
              </p>
              <p
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                }}
              >
                Vamos entrar em contacto por email para confirmar.
              </p>
            </div>
          )}
        </div>

        <div className="cart-drawer__footer">
          {step === 'cart' && (
            <button
              className="cart-drawer__checkout"
              disabled={items.length === 0}
              onClick={() => setStep('checkout')}
            >
              Finalizar Compra
            </button>
          )}
          {step === 'checkout' && (
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <button
                form=""
                onClick={(e) => {
                  e.preventDefault();
                  const form = (e.currentTarget as HTMLButtonElement)
                    .closest('aside')
                    ?.querySelector('form');
                  form?.requestSubmit();
                }}
                className="cart-drawer__checkout"
                disabled={submitting}
              >
                {submitting ? 'A enviar…' : 'Confirmar encomenda'}
              </button>
              <button
                onClick={() => setStep('cart')}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '0.7rem',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Voltar à selecção
              </button>
            </div>
          )}
          {step === 'done' && (
            <button className="cart-drawer__checkout" onClick={closeDrawer}>
              Continuar a navegar
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
