import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import products, { CATEGORIES } from './data/products';

const SORT_OPTIONS = [
  { value: 'default', label: 'Sort by' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Name: A → Z' }
];

const PRICE_RANGES = [
  { value: 'all', label: 'Price range' },
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: '$25 – $50' },
  { value: '50-100', label: '$50 – $100' },
  { value: '100+', label: 'Over $100' }
];

const FILTER_SELECT_CLASS =
  'appearance-none bg-white border border-[#d1d5db] rounded-full px-4 py-1.5 pr-8 text-sm font-medium text-[#374151] hover:bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-action/20 cursor-pointer transition-colors';

const PAGE_TITLES = {
  shop: { title: 'Shop', subtitle: 'Browse our full catalog' },
  categories: { title: 'Categories', subtitle: 'Filter by department' },
  orders: { title: 'Orders', subtitle: '3 pending orders' },
  settings: { title: 'Settings', subtitle: 'Account & preferences' }
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedWishlistItems, setSelectedWishlistItems] = useState(new Set());
  const [activePage, setActivePage] = useState('shop');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    let items = activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

    if (priceRange !== 'all') {
      const [min, max] = priceRange === '100+'
        ? [100, Infinity]
        : priceRange.split('-').map(Number);
      items = items.filter((p) => p.price >= min && p.price < (max === Infinity ? max : max + 0.01));
    }

    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-asc') items = [...items].sort((a, b) => a.name.localeCompare(b.name));

    return items;
  }, [activeCategory, priceRange, sortBy, search]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  const toggleWishlistItemSelect = (id) => {
    setSelectedWishlistItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAllWishlist = () => {
    if (selectedWishlistItems.size === wishlist.length) {
      setSelectedWishlistItems(new Set());
    } else {
      setSelectedWishlistItems(new Set(wishlist.map((i) => i.id)));
    }
  };

  const addSelectedToCart = () => {
    selectedWishlistItems.forEach((id) => {
      const product = wishlist.find((p) => p.id === id);
      if (product) {
        addToCart(product);
      }
    });
  };

  const removeSelectedFromWishlist = () => {
    setWishlist((prev) => prev.filter((i) => !selectedWishlistItems.has(i.id)));
    setSelectedWishlistItems(new Set());
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const pageTitle = activePage === 'wishlist' ? 'Wishlist' : PAGE_TITLES[activePage]?.title;
  const pageSubtitle = activePage === 'wishlist' 
    ? `${wishlist.length} saved item${wishlist.length !== 1 ? 's' : ''}`
    : PAGE_TITLES[activePage]?.subtitle;

  return (
    <div className="flex h-screen bg-page">
      <Sidebar activePage={activePage} onNavigate={setActivePage} wishlistCount={wishlist.length} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
          search={search}
          onSearchChange={setSearch}
          pageTitle={pageTitle}
          pageSubtitle={pageSubtitle}
        />

        <main className="flex-1 overflow-y-auto px-6 py-6 bg-page">
          {activePage === 'wishlist' ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-sn-tertiary">
                  {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
                </p>
                {wishlist.length > 0 && (
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-sn-secondary hover:text-sn-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedWishlistItems.size === wishlist.length && wishlist.length > 0}
                        onChange={toggleSelectAllWishlist}
                        className="w-4 h-4 rounded border border-subtle cursor-pointer"
                      />
                      Select all
                    </label>
                  </div>
                )}
              </div>

              {selectedWishlistItems.size > 0 && (
                <div className="mb-4 p-4 bg-primary/10 rounded-lg flex items-center justify-between">
                  <span className="text-sm font-medium text-sn-primary">
                    {selectedWishlistItems.size} item{selectedWishlistItems.size !== 1 ? 's' : ''} selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={addSelectedToCart}
                      className="px-4 py-2 bg-action text-white text-sm rounded-field hover:bg-action-hover transition-colors cursor-pointer font-medium"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={removeSelectedFromWishlist}
                      className="px-4 py-2 bg-error/20 text-error text-sm rounded-field hover:bg-error/30 transition-colors cursor-pointer font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((p) => (
                  <div key={p.id} className="relative">
                    {activePage === 'wishlist' && (
                      <div className="absolute top-2 left-2 z-10">
                        <input
                          type="checkbox"
                          checked={selectedWishlistItems.has(p.id)}
                          onChange={() => toggleWishlistItemSelect(p.id)}
                          className="w-5 h-5 rounded border-2 border-subtle cursor-pointer accent-action"
                        />
                      </div>
                    )}
                    <ProductCard 
                      product={p} 
                      onAddToCart={addToCart}
                      onToggleWishlist={addToWishlist}
                      isInWishlist={isInWishlist(p.id)}
                    />
                  </div>
                ))}
              </div>
              {wishlist.length === 0 && (
                <p className="text-center text-sn-tertiary mt-16">Your wishlist is empty. Add items to get started!</p>
              )}
            </>
          ) : (
            <>
              {/* Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="relative">
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className={FILTER_SELECT_CLASS}
                  >
                    <option value="All">All categories</option>
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#374151] pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={FILTER_SELECT_CLASS}
                  >
                    {PRICE_RANGES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#374151] pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={FILTER_SELECT_CLASS}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#374151] pointer-events-none" />
                </div>
              </div>

              {/* Result count */}
              <p className="text-sm text-sn-tertiary mb-4">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {search && <span className="ml-1">matching "<strong className="text-sn-secondary">{search}</strong>"</span>}
              </p>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onAddToCart={addToCart}
                    onToggleWishlist={addToWishlist}
                    isInWishlist={isInWishlist(p.id)}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <p className="text-center text-sn-tertiary mt-16">No products found. Try a different search or category.</p>
              )}
            </>
          )}
        </main>
      </div>

      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
    </div>
  );
}
