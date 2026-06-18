import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import products, { CATEGORIES } from './data/products';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Name: A → Z' }
];

const PAGE_TITLES = {
  shop: { title: 'Shop', subtitle: 'Browse our full catalog' },
  categories: { title: 'Categories', subtitle: 'Filter by department' },
  orders: { title: 'Orders', subtitle: '3 pending orders' },
  wishlist: { title: 'Wishlist', subtitle: '5 saved items' },
  settings: { title: 'Settings', subtitle: 'Account & preferences' }
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activePage, setActivePage] = useState('shop');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    let items = activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

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
  }, [activeCategory, sortBy, search]);

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

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const { title: pageTitle, subtitle: pageSubtitle } = PAGE_TITLES[activePage];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
          search={search}
          onSearchChange={setSearch}
          pageTitle={pageTitle}
          pageSubtitle={pageSubtitle}
        />

        <main className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50/50">
          {/* Category Tabs + Sort */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}

            <div className="ml-auto flex items-center gap-1.5 text-sm text-gray-500">
              <ArrowUpDown size={14} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-400 mb-4">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {search && <span className="ml-1">matching "<strong className="text-gray-600">{search}</strong>"</span>}
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-400 mt-16">No products found. Try a different search or category.</p>
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
