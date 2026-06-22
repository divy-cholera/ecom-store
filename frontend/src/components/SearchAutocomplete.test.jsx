import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchAutocomplete from './SearchAutocomplete';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 59.99, category: 'Electronics' },
  { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics' },
  { id: 3, name: 'Running Shoes', price: 124.99, category: 'Footwear' },
  { id: 4, name: 'Wireless Earbuds', price: 39.99, category: 'Electronics' },
];

function renderSearch(overrides = {}) {
  const props = {
    search: '',
    onSearchChange: vi.fn(),
    products: MOCK_PRODUCTS,
    recentSearches: [],
    onAddSearch: vi.fn(),
    onClearRecentSearches: vi.fn(),
    ...overrides,
  };
  const result = render(<SearchAutocomplete {...props} />);
  return { ...result, props };
}

describe('SearchAutocomplete', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the search input', () => {
    renderSearch();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('should not show dropdown when input is empty and no recent searches', async () => {
    renderSearch();
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should show autocomplete suggestions when typing matches product names', async () => {
    const onSearchChange = vi.fn();
    const { rerender } = render(
      <SearchAutocomplete
        search=""
        onSearchChange={onSearchChange}
        products={MOCK_PRODUCTS}
        recentSearches={[]}
        onAddSearch={vi.fn()}
        onClearRecentSearches={vi.fn()}
      />
    );

    rerender(
      <SearchAutocomplete
        search="wire"
        onSearchChange={onSearchChange}
        products={MOCK_PRODUCTS}
        recentSearches={[]}
        onAddSearch={vi.fn()}
        onClearRecentSearches={vi.fn()}
      />
    );

    const input = screen.getByRole('combobox');
    await userEvent.click(input);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(within(listbox).getByText('Wireless Headphones')).toBeInTheDocument();
    expect(within(listbox).getByText('Wireless Earbuds')).toBeInTheDocument();
    expect(within(listbox).queryByText('Smart Watch')).not.toBeInTheDocument();
  });

  it('should call onSearchChange and onAddSearch when clicking a suggestion', async () => {
    const onSearchChange = vi.fn();
    const onAddSearch = vi.fn();
    render(
      <SearchAutocomplete
        search="wire"
        onSearchChange={onSearchChange}
        products={MOCK_PRODUCTS}
        recentSearches={[]}
        onAddSearch={onAddSearch}
        onClearRecentSearches={vi.fn()}
      />
    );

    const input = screen.getByRole('combobox');
    await userEvent.click(input);

    const option = screen.getByText('Wireless Headphones');
    await userEvent.click(option);

    expect(onSearchChange).toHaveBeenCalledWith('Wireless Headphones');
    expect(onAddSearch).toHaveBeenCalledWith('Wireless Headphones');
  });

  it('should show recent searches section when recent searches exist', async () => {
    renderSearch({ recentSearches: ['headphones', 'watch'] });

    const input = screen.getByRole('combobox');
    await userEvent.click(input);

    const listbox = screen.getByRole('listbox');
    expect(within(listbox).getByText('headphones')).toBeInTheDocument();
    expect(within(listbox).getByText('watch')).toBeInTheDocument();
    expect(within(listbox).getByText('Recent Searches')).toBeInTheDocument();
  });

  it('should close dropdown on Escape key', async () => {
    renderSearch({ recentSearches: ['headphones'] });

    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should call onClearRecentSearches when Clear button is clicked', async () => {
    const { props } = renderSearch({ recentSearches: ['headphones', 'watch'] });

    const input = screen.getByRole('combobox');
    await userEvent.click(input);

    const clearButton = screen.getByLabelText('Clear recent searches');
    await userEvent.click(clearButton);

    expect(props.onClearRecentSearches).toHaveBeenCalled();
  });

  it('should commit search on Enter when no item is highlighted', async () => {
    const onAddSearch = vi.fn();
    render(
      <SearchAutocomplete
        search="shoes"
        onSearchChange={vi.fn()}
        products={MOCK_PRODUCTS}
        recentSearches={[]}
        onAddSearch={onAddSearch}
        onClearRecentSearches={vi.fn()}
      />
    );

    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{Enter}');

    expect(onAddSearch).toHaveBeenCalledWith('shoes');
  });

  it('should navigate suggestions with arrow keys', async () => {
    render(
      <SearchAutocomplete
        search="wire"
        onSearchChange={vi.fn()}
        products={MOCK_PRODUCTS}
        recentSearches={[]}
        onAddSearch={vi.fn()}
        onClearRecentSearches={vi.fn()}
      />
    );

    const input = screen.getByRole('combobox');
    await userEvent.click(input);

    await userEvent.keyboard('{ArrowDown}');
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowDown}');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('should select highlighted item on Enter', async () => {
    const onSearchChange = vi.fn();
    const onAddSearch = vi.fn();
    render(
      <SearchAutocomplete
        search="wire"
        onSearchChange={onSearchChange}
        products={MOCK_PRODUCTS}
        recentSearches={[]}
        onAddSearch={onAddSearch}
        onClearRecentSearches={vi.fn()}
      />
    );

    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onSearchChange).toHaveBeenCalledWith('Wireless Headphones');
    expect(onAddSearch).toHaveBeenCalledWith('Wireless Headphones');
  });
});
