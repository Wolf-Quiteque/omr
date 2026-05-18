import type { Metadata } from 'next';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin — OMR Beauty',
  robots: { index: false, follow: false },
};

// Admin pages opt out of the storefront's loader/cursor/footer
// by skipping the root layout chrome. The root layout still wraps
// us with <html>/<body> + providers, so we just render bare here.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
