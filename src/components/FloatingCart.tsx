'use client';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FloatingCart() {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="floating-cart"
        >
          <div className="floating-cart-inner">
            <div className="floating-cart-info">
              <div className="floating-cart-badge">
                <ShoppingCart size={20} />
                <span className="floating-cart-count">{itemCount}</span>
              </div>
              <div className="floating-cart-text">
                <span className="fc-title">{itemCount} item{itemCount > 1 ? 's' : ''} in cart</span>
                <span className="fc-price">₹{totalPrice}</span>
              </div>
            </div>
            <Link href="/cart" className="floating-cart-btn">
              View Cart <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
