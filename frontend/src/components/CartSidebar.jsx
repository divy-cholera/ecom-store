import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartSidebar({ cart, onClose, onUpdateQty, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card h-full shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-normal flex items-center gap-2">
            <ShoppingBag size={20} /> Cart
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-tertiary rounded-[8px] cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && (
            <p className="text-sn-tertiary text-center mt-12">Your cart is empty.</p>
          )}
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-sm text-sn-secondary">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateQty(item.id, item.qty - 1)}
                  className="p-1 hover:bg-tertiary rounded cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm">{item.qty}</span>
                <button
                  onClick={() => onUpdateQty(item.id, item.qty + 1)}
                  className="p-1 hover:bg-tertiary rounded cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-error/60 hover:text-error p-1 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between font-normal text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-action text-white py-3 rounded-field font-normal hover:bg-action-hover transition-colors cursor-pointer">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
