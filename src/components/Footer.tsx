'use client';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="logo" style={{ fontSize: '1.1rem' }}>
            <Leaf size={18} />
            <span>FreshMart</span>
          </Link>
          <p>Fresh groceries delivered to your door. Quality guaranteed.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <Link href="/">All Products</Link>
            <Link href="/deals">Deals & Offers</Link>
            <Link href="/wishlist">My Wishlist</Link>
          </div>
          <div>
            <h4>Account</h4>
            <Link href="/orders">Order History</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
          <div>
            <h4>Help</h4>
            <a href="#">FAQ</a>
            <a href="#">Delivery Info</a>
            <a href="#">Returns Policy</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://github.com/Akc04/grocery-app" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FreshMart. Built with ❤️</p>
      </div>
    </footer>
  );
}
