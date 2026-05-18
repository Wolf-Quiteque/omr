'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LIGHT_PATHS = ['/produto', '/jornal'];

export default function BackToTop() {
  const pathname = usePathname();
  const isLight = LIGHT_PATHS.some((p) => pathname.startsWith(p));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={[
        'back-to-top',
        isLight ? 'back-to-top--light' : '',
        visible ? 'back-to-top--visible' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <a
        href="#"
        className="back-to-top__link"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        Voltar
      </a>
    </div>
  );
}
