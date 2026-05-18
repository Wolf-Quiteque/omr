'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type ProductCardProps = {
  href: string;
  image: string;
  alt: string;
  name: string;
  price: string;
};

export default function ProductCard({ href, image, alt, name, price }: ProductCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className={`product-card fade-in${visible ? ' fade-in--visible' : ''}`}
    >
      <div className="product-card__image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt} loading="lazy" />
      </div>
      <div className="product-card__info">
        <span className="product-card__name">{name}</span>
        <span className="product-card__price">{price}</span>
      </div>
    </Link>
  );
}
