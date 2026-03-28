import React from 'react';
import { Coffee, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onOpenCart }) => {
  return (
    <header className="glass-panel header-container">
      <div className="logo">
        <Coffee className="logo-icon" size={28} />
        <h1>Order Cafe</h1>
      </div>
      <button className="glass-btn cart-btn" onClick={onOpenCart}>
        <ShoppingBag size={20} />
        {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
      </button>

      <style>{`
        .header-container {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-4) var(--spacing-6);
          margin-bottom: var(--spacing-8);
          border-radius: 0;
          border-left: none;
          border-right: none;
          border-top: none;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .logo-icon {
          color: var(--color-bg-accent);
        }

        .logo h1 {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(to right, #ffffff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--color-bg-accent);
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </header>
  );
};
