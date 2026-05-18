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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
