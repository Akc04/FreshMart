'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { items, addToCart, setQuantity } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const wishlisted = isWishlisted(product.id);

  const badgeColors: Record<string, string> = {
    Organic: 'badge-green',
    Fresh: 'badge-blue',
    Sale: 'badge-red',
    New: 'badge-purple',
  };

  function handleAddToCart() {
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  }

  function handleWishlist() {
    toggleWishlist(product);
    showToast(
      wishlisted ? `Removed from wishlist` : `${product.name} added to wishlist ❤️`,
      wishlisted ? 'info' : 'success'
    );
  }

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="product-img"
          />
        </Link>
        {product.badge && (
          <span className={`badge ${badgeColors[product.badge] ?? 'badge-green'}`}>
            {product.badge}
          </span>
        )}
        <button
          id={`wishlist-${product.id}`}
          className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <div>
            <span className="product-price">₹{product.price}</span>
            <span className="product-unit"> {product.unit}</span>
          </div>

          {product.stock === 0 ? (
            <span className="out-of-stock-label">Out of Stock</span>
          ) : qty === 0 ? (
            <button
              id={`add-${product.id}`}
              className="btn-add"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={15} />
              Add
            </button>
          ) : (
            <div className="qty-controls">
              <button className="qty-btn" onClick={() => setQuantity(product.id, qty - 1)}>
                <Minus size={14} />
              </button>
              <span className="qty-val">{qty}</span>
              <button className="qty-btn" onClick={() => setQuantity(product.id, qty + 1)}>
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
