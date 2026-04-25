'use client';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (wishlist.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <Heart size={72} />
          <h2>Your wishlist is empty</h2>
          <p>Save items you love and come back to them anytime.</p>
          <Link href="/">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h1 className="page-title">My Wishlist ({wishlist.length})</h1>
      <div className="product-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-img-wrap">
              <Link href={`/product/${product.id}`}>
                <Image src={product.image} alt={product.name} fill sizes="(max-width:768px) 50vw, 25vw" className="product-img" />
              </Link>
              <button
                className="wishlist-btn wishlisted"
                onClick={() => { toggleWishlist(product); showToast('Removed from wishlist', 'info'); }}
                aria-label="Remove from wishlist"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-footer">
                <div>
                  <span className="product-price">₹{product.price}</span>
                  <span className="product-unit"> {product.unit}</span>
                </div>
                <button
                  id={`wishlist-cart-${product.id}`}
                  className="btn-add"
                  onClick={() => { addToCart(product); showToast(`${product.name} added to cart!`); }}
                >
                  <ShoppingCart size={15} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
