import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import products from './data/products';

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
          ))}
        </div>
      </main>

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
