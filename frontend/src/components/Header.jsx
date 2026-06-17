import React from 'react';
import { ShoppingCart, Bell, Search } from 'lucide-react';

const STAFF = [
  { name: 'Ava M', color: 'bg-violet-500' },
  { name: 'Raj P', color: 'bg-sky-500' },
  { name: 'Sara K', color: 'bg-amber-500' }
];

function Avatar({ name, color }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();
  return (
    <span
      title={name}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-[10px] font-semibold ring-2 ring-white ${color}`}
    >
      {initials}
    </span>
  );
}

export default function Header({ cartCount, onCartOpen, search, onSearchChange, pageTitle, pageSubtitle }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
      {/* Left — Title */}
      <div>
        <h2 className="text-base font-semibold text-gray-900">{pageTitle}</h2>
        <p className="text-xs text-gray-400">{pageSubtitle}</p>
      </div>

      {/* Right — Search, Notifications, Staff, Cart */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-56 text-sm pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
          />
        </div>

        {/* Notification bell */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Staff avatars */}
        <div className="flex -space-x-2">
          {STAFF.map((m) => <Avatar key={m.name} name={m.name} color={m.color} />)}
        </div>

        {/* Cart */}
        <button
          onClick={onCartOpen}
          className="relative p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <ShoppingCart size={20} />
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
