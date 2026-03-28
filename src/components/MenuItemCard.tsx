import React from 'react';
import { Plus } from 'lucide-react';
import type { MenuItem } from '../data/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAdd }) => {
  return (
    <div className="glass-panel menu-card animate-fade-in">
      <div className="image-container">
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
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .image-container {
          width: 100%;
          height: 200px;
          overflow: hidden;
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
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-text-primary);
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
          background: rgba(59, 130, 246, 0.1);
          color: var(--color-bg-accent);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .add-btn:hover {
          background: var(--color-bg-accent);
          color: white;
        }
      `}</style>
    </div>
  );
};
