import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ecom_recent_searches';
const MAX_RECENT = 5;

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

function saveToStorage(searches) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

export default function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState(loadFromStorage);

  const addSearch = useCallback((query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (s) => s.toLowerCase() !== trimmed.toLowerCase()
      );
      const next = [trimmed, ...filtered].slice(0, MAX_RECENT);
      saveToStorage(next);
      return next;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    saveToStorage([]);
  }, []);

  return { recentSearches, addSearch, clearRecentSearches };
}
