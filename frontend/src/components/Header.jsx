import React from 'react';
import { ShoppingCart, Store } from 'lucide-react';

export default function Header({ cartCount, onCartOpen }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <Store size={22} className="text-indigo-600" />
          ecom store
        </div>
        <button
          onClick={onCartOpen}
          className="relative p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
