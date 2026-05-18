'use client';

import { useEffect, useState } from 'react';

const DISMISS_KEY = 'omr-modal-dismissed';

export default function EmailModal() {
  const [active, setActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setActive(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setActive(false);
    if (typeof window !== 'undefined') sessionStorage.setItem(DISMISS_KEY, 'true');
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement | null;
    if (!input || !input.value) return;
    setSubmitted(true);
    setTimeout(close, 2000);
  };

  return (
    <div
      className={`modal-overlay${active ? ' modal-overlay--active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="modal" role="dialog" aria-label="Junta-te à OMR Beauty">
        <h2 className="modal__title">Entra no Estado OMR</h2>
        <p className="modal__subtitle">
          Acesso antecipado a novas fragrâncias, artigos do jornal e lançamentos privados.
        </p>
        {submitted ? (
          <p
            style={{
              fontSize: '0.85rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.04em',
            }}
          >
            Bem-vindo ao estado.
          </p>
        ) : (
          <form className="modal__form" onSubmit={onSubmit}>
            <input
              type="email"
              className="modal__input"
              placeholder="O teu email"
              required
              autoComplete="email"
              aria-label="Email"
            />
            <button type="submit" className="modal__submit">
              Entrar
            </button>
          </form>
        )}
        <button className="modal__dismiss" onClick={close}>
          Continuar a navegar
        </button>
      </div>
    </div>
  );
}
