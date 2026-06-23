import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useRecentSearches from './useRecentSearches';

describe('useRecentSearches', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with an empty list when localStorage is empty', () => {
    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.recentSearches).toEqual([]);
  });

  it('should add a search and persist to localStorage', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      result.current.addSearch('headphones');
    });

    expect(result.current.recentSearches).toEqual(['headphones']);
    expect(JSON.parse(localStorage.getItem('ecom_recent_searches'))).toEqual(['headphones']);
  });

  it('should keep only the last 5 unique searches', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      result.current.addSearch('one');
      result.current.addSearch('two');
      result.current.addSearch('three');
      result.current.addSearch('four');
      result.current.addSearch('five');
      result.current.addSearch('six');
    });

    expect(result.current.recentSearches).toEqual(['six', 'five', 'four', 'three', 'two']);
    expect(result.current.recentSearches).toHaveLength(5);
  });

  it('should move duplicate search to the front (case-insensitive)', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      result.current.addSearch('Headphones');
      result.current.addSearch('Watch');
      result.current.addSearch('headphones');
    });

    expect(result.current.recentSearches).toEqual(['headphones', 'Watch']);
  });

  it('should ignore empty or whitespace-only searches', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      result.current.addSearch('');
      result.current.addSearch('   ');
    });

    expect(result.current.recentSearches).toEqual([]);
  });

  it('should clear all recent searches', () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      result.current.addSearch('headphones');
      result.current.addSearch('watch');
    });

    act(() => {
      result.current.clearRecentSearches();
    });

    expect(result.current.recentSearches).toEqual([]);
    expect(JSON.parse(localStorage.getItem('ecom_recent_searches'))).toEqual([]);
  });

  it('should load persisted searches from localStorage on init', () => {
    localStorage.setItem(
      'ecom_recent_searches',
      JSON.stringify(['alpha', 'beta', 'gamma'])
    );

    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.recentSearches).toEqual(['alpha', 'beta', 'gamma']);
  });

  it('should handle corrupted localStorage gracefully', () => {
    localStorage.setItem('ecom_recent_searches', 'not-valid-json{{{');

    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.recentSearches).toEqual([]);
  });
});
