'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ShoppingCart, Plus, Minus, Heart, ArrowLeft, Star, Package, Truck, Shield } from 'lucide-react';

export default function ProductClient({ product, related }: { product: Product, related: Product[] }) {
  const { items, addToCart, setQuantity } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  
  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const wishlisted = isWishlisted(product.id);

  const badgeColors: Record<string, string> = {
    Organic: 'badge-green', Fresh: 'badge-blue', Sale: 'badge-red', New: 'badge-purple',
  };

  return (
    <div className="page-wrapper">
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--slate-500)', fontSize: '0.88rem', marginBottom: 24 }}>
        <ArrowLeft size={15} /> Back to Shop
      </Link>

      <div className="product-detail-layout">
        {/* Image */}
        <div className="product-detail-img-wrap">
          <Image src={product.image} alt={product.name} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          {product.badge && (
            <span className={`badge ${badgeColors[product.badge] ?? 'badge-green'}`} style={{ fontSize: '0.8rem', padding: '5px 14px' }}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <p className="product-category">{product.category}</p>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-800)', lineHeight: 1.2, marginBottom: 8 }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            {[1,2,3,4,5].map((s) => <Star key={s} size={16} fill="var(--green-500)" color="var(--green-500)" />)}
            <span style={{ fontSize: '0.85rem', color: 'var(--slate-400)' }}>(4.9 · 128 reviews)</span>
          </div>

          <p style={{ color: 'var(--slate-500)', lineHeight: 1.7, marginBottom: 24 }}>{product.description}</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 28 }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slate-800)' }}>₹{product.price}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--slate-400)' }}>{product.unit}</span>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {qty === 0 ? (
              <button
                id={`detail-add-${product.id}`}
                className="btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onClick={() => { addToCart(product); showToast(`${product.name} added to cart!`); }}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            ) : (
              <div className="qty-controls" style={{ flex: 1, justifyContent: 'center', padding: '10px 16px' }}>
                <button className="qty-btn" onClick={() => setQuantity(product.id, qty - 1)}><Minus size={16} /></button>
                <span className="qty-val" style={{ fontSize: '1.1rem', minWidth: 32 }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQuantity(product.id, qty + 1)}><Plus size={16} /></button>
              </div>
            )}
            <button
              id={`detail-wishlist-${product.id}`}
              className={`wishlist-btn-lg ${wishlisted ? 'wishlisted' : ''}`}
              onClick={() => { toggleWishlist(product); showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️', wishlisted ? 'info' : 'success'); }}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Perks */}
          <div className="product-perks">
            <div className="perk"><Truck size={18} /><span>Free delivery over ₹500</span></div>
            <div className="perk"><Package size={18} /><span>Delivered in 2–4 hours</span></div>
            <div className="perk"><Shield size={18} /><span>100% freshness guarantee</span></div>
          </div>

          <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--slate-100)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--slate-500)' }}>
            {product.stock > 0
              ? <span style={{ color: 'var(--green-600)', fontWeight: 600 }}>✅ In Stock ({product.stock} available)</span>
              : <span style={{ color: 'var(--red-500)', fontWeight: 600 }}>❌ Out of Stock</span>}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <div className="section-heading">
            <h2>More in {product.category}</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => {
              const { default: ProductCard } = require('@/components/ProductCard');
              return <ProductCard key={p.id} product={p} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
