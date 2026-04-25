'use client';
import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import { products as allProducts, categories as allCategories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search, Leaf, SlidersHorizontal, Tag } from 'lucide-react';

import { motion, useScroll } from 'framer-motion';

const ALL = 'All';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const PROMO_CODES: Record<string, number> = {
  FRESH10: 10,
  SAVE20: 20,
  FIRSTORDER: 15,
};

function HeroAnimations() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBucketClicked, setIsBucketClicked] = useState(false);
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [isBucketHovered, setIsBucketHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 20);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const spring = { type: 'spring' as const, stiffness: 200, damping: 20 };
  
  const bucketActive = isBucketClicked || isBucketHovered || isScrolled;
  const cartActive = isCartClicked || isCartHovered || isScrolled;

  return (
    <div className="interactive-hero-graphics">
      {/* Bucket Group (Vegetables) */}
      <div 
        className="graphics-group bucket-group"
        onMouseEnter={() => setIsBucketHovered(true)}
        onMouseLeave={() => setIsBucketHovered(false)}
        onClick={() => setIsBucketClicked(!isBucketClicked)}
      >
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Broccoli.png" 
          className="contained-item"
          animate={bucketActive ? { x: -120, y: -160, rotate: -25, scale: 0.9 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Broccoli"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Carrot.png" 
          className="contained-item"
          animate={bucketActive ? { x: 100, y: -180, rotate: 35, scale: 0.85 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Carrot"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Tomato.png" 
          className="contained-item"
          animate={bucketActive ? { x: -40, y: -230, rotate: 15, scale: 0.85 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Tomato"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Leafy%20Green.png" 
          className="contained-item"
          animate={bucketActive ? { x: -140, y: -80, rotate: -15, scale: 0.8 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Leafy Green"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Maize.png" 
          className="contained-item"
          animate={bucketActive ? { x: 130, y: -100, rotate: 20, scale: 0.8 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Corn"
        />
        <span className="container-emoji">🧺</span>
      </div>

      {/* Cart Group (Bakery & Dairy) */}
      <div 
        className="graphics-group cart-group"
        onMouseEnter={() => setIsCartHovered(true)}
        onMouseLeave={() => setIsCartHovered(false)}
        onClick={() => setIsCartClicked(!isCartClicked)}
      >
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Baguette%20Bread.png" 
          className="contained-item"
          animate={cartActive ? { x: 140, y: -130, rotate: 45, scale: 1.0 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Bread"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cheese%20Wedge.png" 
          className="contained-item"
          animate={cartActive ? { x: 50, y: -230, rotate: -15, scale: 0.85 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Cheese"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Glass%20of%20Milk.png" 
          className="contained-item"
          animate={cartActive ? { x: -110, y: -190, rotate: -20, scale: 0.85 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Milk"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Egg.png" 
          className="contained-item"
          animate={cartActive ? { x: -140, y: -100, rotate: 10, scale: 0.7 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Egg"
        />
        <motion.img 
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Butter%20Plate.png" 
          className="contained-item"
          animate={cartActive ? { x: 150, y: -190, rotate: -10, scale: 0.8 } : { x: 0, y: 0, rotate: 0, scale: 0.35 }}
          transition={spring}
          alt="Butter"
        />
        <span className="container-emoji">🛒</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [filtered, setFiltered]     = useState<Product[]>(allProducts);
  const [categories]                = useState<string[]>([ALL, ...allCategories]);
  const [activecat, setActivecat]   = useState(ALL);
  const [search, setSearch]         = useState('');
  const [sort, setSort]             = useState<SortOption>('default');
  const [maxPrice, setMaxPrice]     = useState(500);
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = useCallback(
    (cat: string, q: string, sortBy: SortOption, price: number) => {
      let list: Product[] = allProducts;
      if (cat !== ALL) list = list.filter((p) => p.category === cat);
      if (q.trim())   list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase())
      );
      list = list.filter((p) => p.price <= price);
      switch (sortBy) {
        case 'price-asc':  list = [...list].sort((a, b) => a.price - b.price); break;
        case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
        case 'name-asc':   list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      }
      setFiltered(list);
    },
    []
  );

  useEffect(() => { applyFilters(activecat, search, sort, maxPrice); }, [activecat, search, sort, maxPrice, applyFilters]);

  const dealProducts = allProducts.filter((p) => p.badge === 'Sale' || p.badge === 'New');

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="hero" style={{ position: 'relative' }}>
        <HeroAnimations />
        <div className="hero-content">
          <div className="hero-pill"><Leaf size={13} /> Fresh Produce Daily</div>
          <h1>Groceries delivered<br />to your door 🛒</h1>
          <p>Shop from 100+ fresh products — fruits, vegetables, dairy, bakery &amp; more. Free delivery over ₹500.</p>
          <div className="hero-stats">
            <div className="hero-stat"><span>100+</span><p>Products</p></div>
            <div className="hero-stat"><span>2–4h</span><p>Delivery</p></div>
            <div className="hero-stat"><span>4.9★</span><p>Rating</p></div>
          </div>
        </div>
      </section>

      {/* Deals Banner */}
      {dealProducts.length > 0 && (
        <section className="deals-banner">
          <div className="deals-banner-inner">
            <Tag size={18} />
            <span>🔥 Hot Deals: </span>
            {dealProducts.slice(0, 3).map((p) => (
              <span key={p.id} className="deal-chip">{p.name} — ₹{p.price}</span>
            ))}
          </div>
        </section>
      )}

      {/* Search + Sort */}
      <div className="filters-bar">
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
          <input
            id="search-input"
            className="search-input"
            style={{ paddingLeft: 40 }}
            placeholder="Search groceries…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          id="sort-select"
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>

        <button
          id="toggle-filters"
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters((v) => !v)}
        >
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      {/* Price Filter */}
      {showFilters && (
        <div className="price-filter-bar">
          <label htmlFor="price-range">
            Max Price: <strong>₹{maxPrice}</strong>
          </label>
          <input
            id="price-range"
            type="range"
            min={10}
            max={500}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-range"
          />
          <button className="chip" onClick={() => { setMaxPrice(500); setSort('default'); setSearch(''); setActivecat(ALL); }}>
            Reset
          </button>
        </div>
      )}

      {/* Category Chips */}
      <div className="category-chips" style={{ marginBottom: 28 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            id={`cat-${cat.toLowerCase()}`}
            className={`chip ${activecat === cat ? 'active' : ''}`}
            onClick={() => setActivecat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="section-heading">
        <h2>{activecat === ALL ? 'All Products' : activecat}</h2>
        <span>{filtered.length} items</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <Search size={56} />
          <h2>No products found</h2>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
