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
      <div className="navbar-inner">
        <Link href="/" className="logo">
          <Leaf size={22} />
          <span>FreshMart</span>
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link">Shop</Link>
          <Link href="/deals" className="nav-link">🔥 Deals</Link>
          <Link href="/orders" className="nav-link">Orders</Link>

          <Link href="/wishlist" className="nav-icon-btn" id="nav-wishlist" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="cart-badge">{wishlist.length}</span>
            )}
          </Link>

          <Link href="/cart" className="cart-btn" id="nav-cart">
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
