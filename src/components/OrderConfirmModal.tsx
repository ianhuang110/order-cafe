import React from 'react';
import { X } from 'lucide-react';
import type { CartItem } from './Cart';

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  items: CartItem[];
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  items
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <div className="confirm-backdrop animate-fade-in" onClick={onClose}>
      <div className="confirm-modal glass-panel" onClick={e => e.stopPropagation()}>
        <button className="confirm-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2>確認您的訂購明細</h2>
        
        <div className="confirm-items">
          {items.map(item => (
            <div key={item.cartItemId} className="confirm-item">
              <div className="confirm-item-info">
                <span className="confirm-item-name">{item.name} × {item.quantity}</span>
                {item.modifiers && Object.entries(item.modifiers).map(([k, v]) => (
                  <div key={k} className="confirm-item-mod">{k}: {v}</div>
                ))}
              </div>
              <span className="confirm-item-price">${item.unitPrice * item.quantity}</span>
            </div>
          ))}
        </div>
        
        <div className="confirm-footer">
          <div className="confirm-total">
            <span>總計金額</span>
            <span>${total}</span>
          </div>
          <button className="confirm-btn" onClick={onConfirm}>
            確認結帳並送出訂單
          </button>
        </div>
      </div>

      <style>{`
        .confirm-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-4);
        }

        .confirm-modal {
          background: var(--color-bg-base);
          max-width: 450px;
          width: 100%;
          border-radius: var(--radius-lg);
          padding: var(--spacing-6);
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          animation: scaleUp 0.3s ease cubic-bezier(0.16, 1, 0.3, 1);
        }

        .confirm-close {
          position: absolute;
          top: var(--spacing-4);
          right: var(--spacing-4);
          color: var(--color-text-secondary);
          transition: color 0.2s;
        }
        
        .confirm-close:hover {
          color: white;
        }

        .confirm-modal h2 {
          margin-top: 0;
          margin-bottom: var(--spacing-5);
          font-size: 1.4rem;
          text-align: center;
          color: white;
        }

        .confirm-items {
          max-height: 45vh;
          overflow-y: auto;
          padding-right: var(--spacing-2);
          margin-bottom: var(--spacing-6);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .confirm-items::-webkit-scrollbar {
          width: 6px;
        }
        .confirm-items::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }

        .confirm-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: var(--spacing-3) var(--spacing-4);
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .confirm-item-info {
          display: flex;
          flex-direction: column;
        }

        .confirm-item-name {
          font-weight: 500;
          font-size: 1.05rem;
          color: var(--color-text-primary);
          margin-bottom: 4px;
        }

        .confirm-item-mod {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .confirm-item-price {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--color-text-primary);
        }

        .confirm-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: var(--spacing-5);
        }

        .confirm-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: var(--spacing-5);
          color: white;
        }

        .confirm-total span:last-child {
          color: var(--color-bg-accent);
          font-size: 1.5rem;
        }

        .confirm-btn {
          width: 100%;
          padding: var(--spacing-3) var(--spacing-4);
          background: var(--color-bg-accent);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: background 0.2s, transform 0.1s;
        }

        .confirm-btn:hover {
          background: var(--color-bg-accent-hover);
        }

        .confirm-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};
