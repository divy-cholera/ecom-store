import React from 'react';
import { ShoppingCart, Bell } from 'lucide-react';
import SearchAutocomplete from './SearchAutocomplete';

const STAFF = [
  { name: 'Ava M', color: 'bg-primary-800' },
  { name: 'Raj P', color: 'bg-primary-500' },
  { name: 'Sara K', color: 'bg-accent-400' }
];

function Avatar({ name, color }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();
  return (
    <span
      title={name}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-[10px] font-normal ring-2 ring-page ${color}`}
    >
      {initials}
    </span>
  );
}

export default function Header({
  cartCount,
  onCartOpen,
  search,
  onSearchChange,
  products,
  recentSearches,
  onAddSearch,
  onClearRecentSearches,
  pageTitle,
  pageSubtitle,
}) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-subtle bg-page">
      {/* Left — Title */}
      <div>
        <h2 className="text-base font-normal text-sn-primary">{pageTitle}</h2>
        <p className="text-xs text-sn-tertiary">{pageSubtitle}</p>
      </div>

      {/* Right — Search, Notifications, Staff, Cart */}
      <div className="flex items-center gap-3">
        <SearchAutocomplete
          search={search}
          onSearchChange={onSearchChange}
          products={products}
          recentSearches={recentSearches}
          onAddSearch={onAddSearch}
          onClearRecentSearches={onClearRecentSearches}
        />

        {/* Notification bell */}
        <button className="relative p-2 text-sn-tertiary hover:text-sn-primary transition-colors cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* Staff avatars */}
        <div className="flex -space-x-2">
          {STAFF.map((m) => <Avatar key={m.name} name={m.name} color={m.color} />)}
        </div>

        {/* Cart */}
        <button
          onClick={onCartOpen}
          className="relative p-2 hover:bg-tertiary rounded-[8px] cursor-pointer"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-content text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
