import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { Search, Clock } from 'lucide-react';

const MAX_SUGGESTIONS = 6;

export default function SearchAutocomplete({
  search,
  onSearchChange,
  products,
  recentSearches,
  onAddSearch,
  onClearRecentSearches,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const query = search.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!query) return [];
    const seen = new Set();
    const matches = [];
    for (const p of products) {
      const name = p.name;
      if (seen.has(name)) continue;
      if (name.toLowerCase().includes(query)) {
        seen.add(name);
        matches.push(name);
        if (matches.length >= MAX_SUGGESTIONS) break;
      }
    }
    return matches;
  }, [query, products]);

  const hasDropdownContent = suggestions.length > 0 || recentSearches.length > 0;
  const showDropdown = isOpen && hasDropdownContent;

  const allItems = useMemo(() => {
    const items = [];
    suggestions.forEach((s) => items.push({ type: 'suggestion', value: s }));
    recentSearches.forEach((s) => items.push({ type: 'recent', value: s }));
    return items;
  }, [suggestions, recentSearches]);

  const selectItem = useCallback(
    (value) => {
      onSearchChange(value);
      onAddSearch(value);
      setIsOpen(false);
      setHighlightIndex(-1);
      inputRef.current?.blur();
    },
    [onSearchChange, onAddSearch]
  );

  const commitSearch = useCallback(() => {
    if (search.trim()) {
      onAddSearch(search.trim());
    }
    setIsOpen(false);
    setHighlightIndex(-1);
  }, [search, onAddSearch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setHighlightIndex(-1);
        inputRef.current?.blur();
        return;
      }

      if (!showDropdown) {
        if (e.key === 'Enter') {
          commitSearch();
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < allItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : allItems.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < allItems.length) {
          selectItem(allItems[highlightIndex].value);
        } else {
          commitSearch();
        }
      }
    },
    [showDropdown, allItems, highlightIndex, selectItem, commitSearch]
  );

  useEffect(() => {
    setHighlightIndex(-1);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Search
        size={14}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sn-tertiary pointer-events-none"
      />
      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(e) => {
          onSearchChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        aria-label="Search products"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-controls="search-listbox"
        role="combobox"
        className="w-56 text-sm pl-8 pr-3 py-1.5 rounded-field border border-subtle bg-card text-sn-primary placeholder-sn-tertiary focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary-400"
      />

      {showDropdown && (
        <div
          id="search-listbox"
          role="listbox"
          className="absolute top-full left-0 mt-1 w-72 bg-card border border-subtle rounded-field shadow-lg z-50 overflow-hidden"
        >
          {suggestions.length > 0 && (
            <div>
              <p className="px-3 pt-2.5 pb-1 text-[10px] font-medium text-sn-tertiary uppercase tracking-wider">
                Suggestions
              </p>
              {suggestions.map((name, idx) => {
                const itemIndex = idx;
                return (
                  <button
                    key={name}
                    role="option"
                    aria-selected={highlightIndex === itemIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectItem(name)}
                    onMouseEnter={() => setHighlightIndex(itemIndex)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                      highlightIndex === itemIndex
                        ? 'bg-tertiary text-sn-primary'
                        : 'text-sn-secondary hover:bg-tertiary'
                    }`}
                  >
                    <Search size={13} className="text-sn-tertiary flex-shrink-0" />
                    <span className="truncate">{name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {recentSearches.length > 0 && (
            <div>
              {suggestions.length > 0 && (
                <div className="border-t border-subtle" />
              )}
              <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
                <p className="text-[10px] font-medium text-sn-tertiary uppercase tracking-wider">
                  Recent Searches
                </p>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onClearRecentSearches}
                  className="text-[10px] text-link hover:underline cursor-pointer"
                  aria-label="Clear recent searches"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((term, idx) => {
                const itemIndex = suggestions.length + idx;
                return (
                  <button
                    key={term}
                    role="option"
                    aria-selected={highlightIndex === itemIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectItem(term)}
                    onMouseEnter={() => setHighlightIndex(itemIndex)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                      highlightIndex === itemIndex
                        ? 'bg-tertiary text-sn-primary'
                        : 'text-sn-secondary hover:bg-tertiary'
                    }`}
                  >
                    <Clock size={13} className="text-sn-tertiary flex-shrink-0" />
                    <span className="truncate">{term}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
