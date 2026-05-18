import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import Nav from '@/components/Nav';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import EmailModal from '@/components/EmailModal';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartProvider';
import { UIProvider } from '@/components/UIProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'OMR Beauty — Fragrância de Luxo | Angola',
  description:
    'OMR Beauty — Fragrâncias de luxo criadas com intenção. Eau de Parfum, óleos perfumados e velas em Angola.',
  authors: [{ name: 'Josefa Félix' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-AO" className={inter.variable}>
      <body>
        <UIProvider>
          <CartProvider>
            <Loader />
            <CustomCursor />
            <PageTransition />
            <Nav />
            <MobileMenu />
            {children}
            <Footer />
            <BackToTop />
            <EmailModal />
            <CartDrawer />
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
