'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 500;

export default function CartPage() {
  const { items, subtotal, totalItems, setQuantity, removeFromCart } = useCart();
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <ShoppingBag size={72} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added anything yet. Start shopping!</p>
          <Link href="/">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Your Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})</h1>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-list">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--slate-100)' }}>
                <Image src={product.image} alt={product.name} fill sizes="72px" style={{ objectFit: 'cover' }} />
              </div>

              <div className="cart-item-info">
                <p className="cart-item-name">{product.name}</p>
                <p className="cart-item-unit">{product.unit}</p>
                <p className="cart-item-price">₹{(product.price * quantity).toLocaleString()}</p>
              </div>

              <div className="cart-item-actions">
                <button className="remove-btn" onClick={() => removeFromCart(product.id)} id={`remove-${product.id}`}>
                  <Trash2 size={16} />
                </button>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => setQuantity(product.id, quantity - 1)}>
                    <Minus size={12} />
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button className="qty-btn" onClick={() => setQuantity(product.id, quantity + 1)}>
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            {deliveryFee === 0
              ? <span className="free-delivery">FREE 🎉</span>
              : <span>₹{deliveryFee}</span>
            }
          </div>
          {deliveryFee > 0 && (
            <p style={{ fontSize: '0.78rem', color: 'var(--slate-400)', marginTop: 6 }}>
              Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery
            </p>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <Link href="/checkout">
            <button id="checkout-btn" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/">
            <button className="btn-secondary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
