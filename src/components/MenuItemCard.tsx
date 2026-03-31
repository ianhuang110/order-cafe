import React from 'react';
import { Plus } from 'lucide-react';
import type { MenuItem } from '../data/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  quantityInCart?: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAdd, quantityInCart = 0 }) => {
  return (
    <div className={`glass-panel menu-card animate-fade-in ${quantityInCart > 0 ? 'has-ordered' : ''}`}>
      <div className="image-container">
        {quantityInCart > 0 && (
          <div className="ordered-badge">
            已加入 {quantityInCart}
          </div>
        )}
        <img src={item.imageUrl} alt={item.name} loading="lazy" />
      </div>
      <div className="content">
        <div className="header">
          <h3>{item.name}</h3>
          <span className="price">${item.price}</span>
        </div>
        <p>{item.description}</p>
        <button className="add-btn" onClick={() => onAdd(item)}>
          <Plus size={16} />
          <span>加入購物車</span>
        </button>
      </div>

      <style>{`
        .menu-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform var(--transition-base), box-shadow var(--transition-base);
        }

        .menu-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(193, 154, 107, 0.3);
        }

        .menu-card.has-ordered {
          border-color: rgba(193, 154, 107, 0.9);
          box-shadow: 
            0 0 0 1px rgba(193, 154, 107, 0.9),
            0 12px 25px rgba(193, 154, 107, 0.35), 
            inset 0 0 15px rgba(193, 154, 107, 0.15);
          transform: translateY(-4px);
        }

        .menu-card.has-ordered:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 0 0 1px rgba(223, 189, 142, 1),
            0 15px 35px rgba(193, 154, 107, 0.45), 
            inset 0 0 20px rgba(193, 154, 107, 0.2);
          border-color: rgba(223, 189, 142, 1);
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .ordered-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: linear-gradient(135deg, #dfbd8e, #c19a6b);
          color: #0c0a09;
          padding: 6px 16px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 0.95rem;
          z-index: 10;
          box-shadow: 0 6px 20px rgba(193, 154, 107, 0.6);
          letter-spacing: 0.05em;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-base);
        }

        .menu-card:hover .image-container img {
          transform: scale(1.05);
        }

        .content {
          padding: var(--spacing-4);
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-2);
        }

        .header h3 {
          font-family: 'Playfair Display', 'Noto Serif TC', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: 0.03em;
        }

        .price {
          font-weight: 700;
          color: var(--color-bg-accent);
          font-size: 1.125rem;
        }

        .content p {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          line-height: 1.4;
          margin-bottom: var(--spacing-4);
          flex-grow: 1;
        }

        .add-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2);
          width: 100%;
          padding: var(--spacing-3) 0;
          background: rgba(193, 154, 107, 0.1);
          color: var(--color-bg-accent);
          border: 1px solid rgba(193, 154, 107, 0.3);
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .add-btn:hover {
          background: var(--color-bg-accent);
          color: #0c0a09;
        }
      `}</style>
    </div>
  );
};
