import React from 'react';
import {
  Store, ShoppingBag, LayoutGrid, Heart, Clock,
  Settings, Tag, TrendingUp, Package
} from 'lucide-react';

const NAV = [
  { key: 'shop', label: 'Shop', icon: LayoutGrid },
  { key: 'categories', label: 'Categories', icon: Tag },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'settings', label: 'Settings', icon: Settings }
];

const TRENDING = [
  { name: 'Running Shoes', sales: 1284 },
  { name: 'Wireless Headphones', sales: 963 },
  { name: 'Smart Watch', sales: 847 }
];

function Avatar({ name, color }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-normal ${color}`}>
      {initials}
    </span>
  );
}

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-60 border-r border-subtle bg-page flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-subtle">
        <div className="flex items-center gap-2">
          <Store size={20} className="text-primary" />
          <h1 className="text-sm font-normal text-sn-primary tracking-tight">Ecom Store</h1>
        </div>
        <p className="text-[11px] text-sn-tertiary mt-0.5">v1.0.0 — Summer Collection</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-sm transition-colors cursor-pointer ${
              activePage === key
                ? 'bg-neutral-800 text-white'
                : 'text-sn-secondary hover:bg-tertiary'
            }`}
          >
            <Icon size={16} />
            {label}
            {key === 'orders' && (
              <span className="ml-auto text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">3</span>
            )}
            {key === 'wishlist' && (
              <span className="ml-auto text-[10px] bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded-full font-medium">5</span>
            )}
          </button>
        ))}
      </nav>

      {/* Trending Section */}
      <div className="px-4 py-3 border-t border-subtle">
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp size={12} className="text-success" />
          <span className="text-[10px] font-normal text-sn-secondary uppercase tracking-wider">Trending</span>
        </div>
        {TRENDING.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-1">
            <span className="text-[11px] text-sn-secondary truncate">{item.name}</span>
            <span className="text-[10px] text-sn-tertiary">{item.sales} sold</span>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-subtle">
        <div className="flex items-center gap-2.5">
          <Avatar name="Divy C" color="bg-primary" />
          <div className="min-w-0">
            <p className="text-xs font-normal text-sn-primary truncate">Divy Cholera</p>
            <p className="text-[10px] text-sn-tertiary">Store Admin</p>
          </div>
          <div className="ml-auto w-2 h-2 bg-accent rounded-full flex-shrink-0" title="Online" />
        </div>
      </div>
    </aside>
  );
}
