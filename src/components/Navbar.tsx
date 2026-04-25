'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ShoppingCart, Heart, Leaf, ClipboardList } from 'lucide-react';

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="navbar">
      <div className="navbar-inner navbar-grid">
        <div className="navbar-col-left">
          <Link href="/" className="logo">
            <Leaf size={22} />
            <span>FreshMart</span>
          </Link>
        </div>

        <div className="navbar-col-right-combined">
          <Link href="/" className="nav-link pill-nav-link" id="nav-shop">Shop</Link>
          <Link href="/deals" className="nav-link deals-nav-link" id="nav-deals">
            <span className="deals-emoji">🔥</span>
            Deals
          </Link>
          <Link href="/orders" className="nav-link pill-nav-link" id="nav-orders">Orders</Link>

          <Link href="/wishlist" className="nav-icon-btn wishlist-btn-text pill-nav-link" id="nav-wishlist" aria-label="Wishlist">
            <Heart size={20} />
            <span className="wishlist-text">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="cart-badge">{wishlist.length}</span>
            )}
          </Link>

          <Link href="/cart" className="cart-btn pill-nav-link" id="nav-cart" aria-label="Shopping Cart">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
