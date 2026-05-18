'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useUI } from './UIProvider';

export default function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const close = () => setMobileMenuOpen(false);

  return (
    <div className={`mobile-menu${mobileMenuOpen ? ' mobile-menu--active' : ''}`}>
      <Link href="/#featured" className="mobile-menu__link" onClick={close}>
        Colecção
      </Link>
      <Link href="/jornal" className="mobile-menu__link" onClick={close}>
        Jornal
      </Link>
      <Link href="/sobre" className="mobile-menu__link" onClick={close}>
        Sobre
      </Link>
    </div>
  );
}
