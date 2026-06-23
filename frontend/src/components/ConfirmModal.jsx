import React, { useEffect, useRef } from 'react';

export default function ConfirmModal({ title, body, confirmLabel, onConfirm, onCancel }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onCancel();
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div className="bg-card rounded-field shadow-xl w-full max-w-sm mx-4 p-6">
        <h3 className="text-lg font-medium text-sn-primary mb-2">{title}</h3>
        <p className="text-sm text-sn-secondary mb-6">{body}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-sn-primary bg-tertiary hover:bg-neutral-200 rounded-field transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-error hover:bg-error/90 rounded-field transition-colors cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
