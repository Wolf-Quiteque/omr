'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUI } from './UIProvider';
import { useCart } from './CartProvider';

const LIGHT_NAV_PATHS = ['/produto', '/jornal'];

export default function Nav() {
  const pathname = usePathname();
  const isLight = LIGHT_NAV_PATHS.some((p) => pathname.startsWith(p));
  const { mobileMenuOpen, toggleMobileMenu } = useUI();
  const { count, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={[
        'nav',
        isLight ? 'nav--light' : '',
        scrolled ? 'nav--scrolled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link href="/" className="nav__logo">
        OMR
      </Link>
      <ul className="nav__links">
        <li>
          <Link href="/#featured" className="nav__link">
            Colecção
          </Link>
        </li>
        <li>
          <Link href="/jornal" className="nav__link">
            Jornal
          </Link>
        </li>
        <li>
          <Link href="/sobre" className="nav__link">
            Sobre
          </Link>
        </li>
      </ul>
      <div className="nav__actions">
        <button
          className="nav__cart"
          aria-label="Abrir sacola"
          onClick={openDrawer}
        >
          Sacola ({count})
        </button>
        <button
          className={`nav__hamburger${mobileMenuOpen ? ' nav__hamburger--active' : ''}`}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
