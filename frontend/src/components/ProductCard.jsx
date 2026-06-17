import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
