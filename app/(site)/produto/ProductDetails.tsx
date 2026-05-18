'use client';

import { useState } from 'react';
import { RevealText } from '@/components/RevealText';
import { FadeIn } from '@/components/FadeIn';
import { useCart } from '@/components/CartProvider';
import { formatKz, type ProductRow } from '@/lib/supabase/types';

export default function ProductDetails({ product }: { product: ProductRow }) {
  const { addItem } = useCart();
  const [soldOut, setSoldOut] = useState(!product.in_stock);

  const priceLabel = formatKz(product.price_kz);

  const onAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      price: priceLabel,
      priceKz: product.price_kz,
    });
  };

  return (
    <main className="product-page">
      <div className="product-layout">
        {/* Gallery */}
        <div className="product-gallery">
          {product.images.map((src, i) => (
            <div className="product-gallery__image" key={`${src}-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${product.name} — vista ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="product-details">
          <RevealText as="h1" className="product-details__name">
            {product.name}
          </RevealText>
          <FadeIn as="p" className="product-details__tagline">
            {product.tagline}
          </FadeIn>
          <FadeIn as="p" className="product-details__price">
            {priceLabel}
          </FadeIn>

          <FadeIn className="product-details__description">
            {product.description.map((line, i) => (
              <p
                key={i}
                style={i === product.description.length - 1 ? { marginTop: '1rem' } : undefined}
              >
                {line}
              </p>
            ))}
          </FadeIn>

          <FadeIn as="ul" className="product-details__specs">
            {product.specs.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </FadeIn>

          <FadeIn className="product-details__ritual">
            <p className="product-details__ritual-label">Uso Ritual</p>
            <p className="product-details__ritual-text">{product.ritual}</p>
          </FadeIn>

          {!soldOut ? (
            <button className="btn-add-cart" onClick={onAddToCart}>
              Adicionar à Selecção — {priceLabel}
            </button>
          ) : (
            <div className="sold-out-state" style={{ display: 'block' }}>
              <p className="sold-out-state__label">Esgotado</p>
              <p className="sold-out-state__text">Sê notificado quando o produto regressar.</p>
              <button className="btn-notify">Notificar-me</button>
            </div>
          )}

          <p className="product-details__toggle" onClick={() => setSoldOut((v) => !v)}>
            Demo: Alternar estado de esgotado
          </p>
        </div>
      </div>
    </main>
  );
}
