'use client';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Tag, Zap, Percent } from 'lucide-react';

const saleProducts  = products.filter((p) => p.badge === 'Sale');
const newProducts   = products.filter((p) => p.badge === 'New');
const organicProducts = products.filter((p) => p.badge === 'Organic');

export default function DealsPage() {
  return (
    <div className="page-wrapper">
      {/* Header */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #d97706 100%)', marginBottom: 40 }}>
        <div className="hero-content">
          <div className="hero-pill"><Tag size={13} /> Limited Time Offers</div>
          <h1>Today&apos;s Deals 🔥</h1>
          <p>Grab these limited-time offers before they&apos;re gone. Fresh products at unbeatable prices.</p>
        </div>
      </section>

      {/* Promo codes banner */}
      <div className="promo-banner">
        <Percent size={18} />
        <span>Use code <strong>FRESH10</strong> for 10% off · <strong>SAVE20</strong> for 20% off · <strong>FIRSTORDER</strong> for 15% off</span>
      </div>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <div className="section-heading">
            <h2>🏷️ On Sale</h2>
            <span>{saleProducts.length} items</span>
          </div>
          <div className="product-grid">
            {saleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <div className="section-heading">
            <h2>✨ New Arrivals</h2>
            <span>{newProducts.length} items</span>
          </div>
          <div className="product-grid">
            {newProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Organic Picks */}
      {organicProducts.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <div className="section-heading">
            <h2>🌿 Organic Picks</h2>
            <span>{organicProducts.length} items</span>
          </div>
          <div className="product-grid">
            {organicProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
