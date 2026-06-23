import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-subtle overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover"
        />
        <span className="absolute top-2 left-2 bg-card/90 backdrop-blur text-xs font-normal text-sn-secondary px-2 py-0.5 rounded-full">
          {product.category}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-normal text-sn-primary">{product.name}</h3>
        <p className="text-sm text-sn-secondary line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-sn-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 bg-primary text-primary-content text-sm px-3 py-2 rounded-field hover:bg-primary-900 transition-colors cursor-pointer"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
