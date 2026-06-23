import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CartSidebar from './CartSidebar';

const MOCK_CART = [
  { id: 1, name: 'Widget A', price: 19.99, qty: 2, image: '/a.png' },
  { id: 2, name: 'Widget B', price: 9.99, qty: 1, image: '/b.png' },
];

const defaultProps = {
  cart: MOCK_CART,
  onClose: vi.fn(),
  onUpdateQty: vi.fn(),
  onRemove: vi.fn(),
  onClearCart: vi.fn(),
};

function renderSidebar(overrides = {}) {
  const props = { ...defaultProps, ...overrides };
  return render(<CartSidebar {...props} />);
}

describe('CartSidebar — Clear Cart feature', () => {
  it('should show Clear Cart button when cart has items', () => {
    renderSidebar();
    expect(screen.getByText('Clear Cart')).toBeInTheDocument();
  });

  it('should not show Clear Cart button when cart is empty', () => {
    renderSidebar({ cart: [] });
    expect(screen.queryByText('Clear Cart')).not.toBeInTheDocument();
  });

  it('should open confirmation modal when Clear Cart is clicked', async () => {
    renderSidebar();
    await userEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByText('Clear cart?')).toBeInTheDocument();
    expect(screen.getByText('This will remove all items from your cart.')).toBeInTheDocument();
  });

  it('should close modal without clearing when Cancel is clicked', async () => {
    const onClearCart = vi.fn();
    renderSidebar({ onClearCart });
    await userEvent.click(screen.getByText('Clear Cart'));
    await userEvent.click(screen.getByText('Cancel'));
    expect(onClearCart).not.toHaveBeenCalled();
    expect(screen.queryByText('Clear cart?')).not.toBeInTheDocument();
  });

  it('should clear cart and close modal when Clear is confirmed', async () => {
    const onClearCart = vi.fn();
    renderSidebar({ onClearCart });
    await userEvent.click(screen.getByText('Clear Cart'));
    // The confirm button text is "Clear" inside the modal
    const clearButtons = screen.getAllByText('Clear');
    // The modal "Clear" button is the last one rendered
    await userEvent.click(clearButtons[clearButtons.length - 1]);
    expect(onClearCart).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Clear cart?')).not.toBeInTheDocument();
  });

  it('should close modal when Escape key is pressed', async () => {
    const onClearCart = vi.fn();
    renderSidebar({ onClearCart });
    await userEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByText('Clear cart?')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('Clear cart?')).not.toBeInTheDocument();
    expect(onClearCart).not.toHaveBeenCalled();
  });
});
