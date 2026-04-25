'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';

interface WishlistContextValue {
  wishlist: Product[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('grocery_wishlist');
        return stored ? JSON.parse(stored) : [];
      } catch { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('grocery_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = (id: string) => wishlist.some((p) => p.id === id);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
