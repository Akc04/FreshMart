'use client';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Tag, Zap, Percent } from 'lucide-react';

const saleProducts  = products.filter((p) => p.badge === 'Sale');
const newProducts   = products.filter((p) => p.badge === 'New');
const organicProducts = products.filter((p) => p.badge === 'Organic');

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

function DealsHeroAnimations() {
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  const spring = { type: 'spring' as const, stiffness: 200, damping: 20 };

  // Parallax falling tags
  const tags = [
    { emoji: '🏷️', top: '10%', left: '10%', delay: 0 },
    { emoji: '🎫', top: '30%', left: '20%', delay: 1 },
    { emoji: '🏷️', top: '60%', left: '15%', delay: 0.5 },
    { emoji: '🎫', top: '20%', right: '25%', delay: 1.5 },
    { emoji: '🏷️', top: '70%', right: '15%', delay: 2 },
  ];

  return (
    <div className="deals-hero-graphics" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Falling Tags */}
      {tags.map((tag, idx) => (
        <motion.div
          key={idx}
          className="falling-tag"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: [0, 600], opacity: [0, 0.2, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: tag.delay, ease: 'linear' }}
          style={{ position: 'absolute', ...tag, fontSize: '2.5rem', zIndex: 0 }}
        >
          {tag.emoji}
        </motion.div>
      ))}

      {/* Gift Box and Products */}
      <div className="graphics-group gift-group">
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Chocolate%20Bar.png" 
          className="contained-item"
          animate={isHovered ? { x: -120, y: -180, rotate: -20, scale: 1.1 } : { x: 0, y: 0, rotate: 0, scale: 0.3 }}
          transition={spring}
          alt="Chocolate"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Beverage%20Box.png" 
          className="contained-item"
          animate={isHovered ? { x: 120, y: -150, rotate: 20, scale: 1.2 } : { x: 0, y: 0, rotate: 0, scale: 0.3 }}
          transition={spring}
          alt="Coffee"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Lollipop.png" 
          className="contained-item"
          animate={isHovered ? { x: 0, y: -220, rotate: 0, scale: 1.1 } : { x: 0, y: 0, rotate: 0, scale: 0.3 }}
          transition={spring}
          alt="Candy"
        />
        <span className="container-emoji" style={{ fontSize: '12rem' }}>🎁</span>
      </div>
    </div>
  );
}

export default function DealsPage() {
  return (
    <div className="page-wrapper">
      {/* Header */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #d97706 100%)', marginBottom: 40, position: 'relative', overflow: 'hidden' }}>
        <DealsHeroAnimations />
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
