import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import type { MenuItem } from '../data/menu';

export interface CartItem extends MenuItem {
  cartItemId: string;
  quantity: number;
  modifiers?: Record<string, string | string[]>;
  unitPrice: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onCheckout,
}) => {
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-backdrop animate-fade-in" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-header">
          <h2><ShoppingBag size={24} style={{ display: 'inline', marginRight: '8px' }}/> 您的購物車</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={48} className="empty-icon" />
              <p>購物車是空的</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  {item.modifiers && Object.entries(item.modifiers).map(([k, v]) => (
                    <div key={k} className="item-mod">{k}: {Array.isArray(v) ? v.join(', ') : v}</div>
                  ))}
                  <span className="item-price">${item.unitPrice}</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => onUpdateQuantity(item.cartItemId, -1)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.cartItemId, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total-row">
            <span>總計</span>
            <span className="total-price">${total}</span>
          </div>
          <button
            className="checkout-btn"
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            確認訂單
          </button>
        </div>

        <style>{`
          .cart-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 100;
          }

          .cart-panel {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 100%;
            max-width: 400px;
            background: var(--color-bg-base);
            border-left: var(--glass-border);
            z-index: 101;
            display: flex;
            flex-direction: column;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            animation: slideIn right 0.3s ease forwards;
          }

          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-6);
            border-bottom: var(--glass-border);
          }

          .cart-header h2 {
            display: flex;
            align-items: center;
            margin: 0;
            font-size: 1.5rem;
          }

          .close-btn {
            color: var(--color-text-secondary);
            transition: color var(--transition-fast);
          }

          .close-btn:hover {
            color: var(--color-text-primary);
          }

          .cart-items {
            flex-grow: 1;
            overflow-y: auto;
            padding: var(--spacing-6);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-4);
          }

          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--color-text-secondary);
            gap: var(--spacing-4);
          }

          .empty-icon {
            opacity: 0.2;
          }

          .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-3);
            background: var(--color-bg-surface);
            border-radius: var(--radius-md);
            border: var(--glass-border);
          }

          .item-info {
            flex-grow: 1;
          }

          .item-info h4 {
            margin: 0 0 var(--spacing-1) 0;
            font-size: 1rem;
          }

          .item-mod {
            font-size: 0.8rem;
            color: var(--color-text-secondary);
            margin-bottom: 2px;
          }

          .item-price {
            color: var(--color-bg-accent);
            font-weight: 600;
          }

          .quantity-controls {
            display: flex;
            align-items: center;
            gap: var(--spacing-3);
            background: rgba(0, 0, 0, 0.2);
            padding: var(--spacing-1);
            border-radius: var(--radius-lg);
          }

          .quantity-controls button {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: var(--color-bg-surface);
            color: var(--color-text-primary);
            transition: all var(--transition-fast);
          }

          .quantity-controls button:hover {
            background: var(--color-bg-accent);
          }

          .cart-footer {
            padding: var(--spacing-6);
            border-top: var(--glass-border);
            background: rgba(15, 23, 42, 0.95);
          }

          .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-4);
            font-size: 1.25rem;
            font-weight: 700;
          }

          .total-price {
            color: var(--color-bg-accent);
          }

          .checkout-btn {
            width: 100%;
            padding: var(--spacing-4);
            background: var(--color-bg-accent);
            color: white;
            font-size: 1.125rem;
            font-weight: 600;
            border-radius: var(--radius-md);
            transition: all var(--transition-fast);
          }

          .checkout-btn:hover:not(:disabled) {
            background: var(--color-bg-accent-hover);
            transform: translateY(-2px);
          }

          .checkout-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </>
  );
};
