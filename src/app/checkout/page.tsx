'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CustomerInfo } from '@/types';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const DELIVERY_FEE = 40;
const FREE_THRESHOLD = 500;

const empty: CustomerInfo = { name: '', email: '', phone: '', address: '', city: '', pincode: '' };
type Errors = Partial<Record<keyof CustomerInfo, string>>;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm]       = useState<CustomerInfo>(empty);
  const [errors, setErrors]   = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const deliveryFee = subtotal >= FREE_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim())   e.phone   = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim())    e.city    = 'City is required';
    if (!form.pincode.trim()) e.pincode = 'Pincode is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Simulate order placement (client-side for static deploy)
    await new Promise((r) => setTimeout(r, 800));

    const orderId = `ORD-${Date.now()}`;
    const order = {
      id: orderId,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      customerInfo: form,
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('grocery_orders') || '[]');
    existing.push(order);
    localStorage.setItem('grocery_orders', JSON.stringify(existing));

    clearCart();
    setLoading(false);
    router.push(`/order-success?id=${orderId}`);
  }

  if (items.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <h2>No items to checkout</h2>
          <Link href="/">Go Shopping</Link>
        </div>
      </div>
    );
  }

  const Field = ({ id, label, placeholder, type = 'text', full = false }: {
    id: keyof CustomerInfo; label: string; placeholder: string; type?: string; full?: boolean;
  }) => (
    <div className={`form-group${full ? ' form-full' : ''}`}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className={`form-input${errors[id] ? ' error' : ''}`}
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
      />
      {errors[id] && <span className="form-error">{errors[id]}</span>}
    </div>
  );

  return (
    <div className="page-wrapper">
      <Link href="/cart" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--slate-500)', fontSize:'0.88rem', marginBottom:20 }}>
        <ArrowLeft size={15} /> Back to Cart
      </Link>
      <h1 className="page-title">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="checkout-layout">
          {/* Left — Delivery Info */}
          <div className="form-card">
            <h2>🚚 Delivery Details</h2>
            <div className="form-grid">
              <Field id="name"    label="Full Name"    placeholder="Ajay Kumar" />
              <Field id="email"   label="Email"        placeholder="ajay@example.com" type="email" />
              <Field id="phone"   label="Phone"        placeholder="+91 98765 43210" />
              <Field id="pincode" label="Pincode"      placeholder="400001" />
              <Field id="address" label="Street Address" placeholder="123, MG Road, Apt 4B" full />
              <Field id="city"    label="City"         placeholder="Mumbai" />
            </div>

            <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--green-50)', borderRadius: 10, border: '1px solid var(--green-100)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <ShieldCheck size={18} style={{ color: 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Your order will be delivered within <strong>2–4 hours</strong>. Cash on delivery available.
              </p>
            </div>
          </div>

          {/* Right — Summary */}
          <div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="summary-row">
                  <span style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.name} × {quantity}
                  </span>
                  <span>₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="summary-row" style={{ marginTop: 8 }}>
                <span>Delivery</span>
                {deliveryFee === 0
                  ? <span className="free-delivery">FREE</span>
                  : <span>₹{deliveryFee}</span>
                }
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <button id="place-order-btn" type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Placing Order…' : `Place Order — ₹${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
