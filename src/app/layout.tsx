import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCart from '@/components/FloatingCart';

export const metadata: Metadata = {
  title: 'FreshMart — Online Grocery Store',
  description:
    'Shop fresh fruits, vegetables, dairy, bakery items and more. Fast delivery, great prices.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <FloatingCart />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
