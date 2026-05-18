import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
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
      <body>{children}</body>
    </html>
  );
}
