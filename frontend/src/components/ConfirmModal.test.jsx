import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ConfirmModal from './ConfirmModal';

const defaultProps = {
  title: 'Clear cart?',
  body: 'This will remove all items from your cart.',
  confirmLabel: 'Clear',
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

function renderModal(overrides = {}) {
  const props = { ...defaultProps, ...overrides };
  return render(<ConfirmModal {...props} />);
}

describe('ConfirmModal', () => {
  it('should render title, body, and buttons', () => {
    renderModal();
    expect(screen.getByText('Clear cart?')).toBeInTheDocument();
    expect(screen.getByText('This will remove all items from your cart.')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('should call onCancel when Cancel button is clicked', async () => {
    const onCancel = vi.fn();
    renderModal({ onCancel });
    await userEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when confirm button is clicked', async () => {
    const onConfirm = vi.fn();
    renderModal({ onConfirm });
    await userEvent.click(screen.getByText('Clear'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when Escape key is pressed', async () => {
    const onCancel = vi.fn();
    renderModal({ onCancel });
    await userEvent.keyboard('{Escape}');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when clicking the backdrop overlay', async () => {
    const onCancel = vi.fn();
    renderModal({ onCancel });
    const overlay = screen.getByRole('dialog');
    await userEvent.click(overlay);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should not call onCancel when clicking inside the modal content', async () => {
    const onCancel = vi.fn();
    renderModal({ onCancel });
    await userEvent.click(screen.getByText('Clear cart?'));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should have accessible dialog role and aria attributes', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Clear cart?');
  });
});
