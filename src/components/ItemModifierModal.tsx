import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { MenuItem } from '../data/menu';

export interface ModifierSelection {
  [groupName: string]: string;
}

interface ItemModifierModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (item: MenuItem, modifiers: ModifierSelection, quantity: number) => void;
}

export const ItemModifierModal: React.FC<ItemModifierModalProps> = ({ item, onClose, onConfirm }) => {
  const [selections, setSelections] = useState<ModifierSelection>({});
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults
  useEffect(() => {
    if (item && item.modifierGroups) {
      const initial: ModifierSelection = {};
      item.modifierGroups.forEach(g => {
        if (g.required && g.options.length > 0) {
          initial[g.name] = g.options[0].name;
        }
      });
      setSelections(initial);
      setQuantity(1);
    } else {
      setSelections({});
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  const handleSelect = (groupName: string, optionName: string) => {
    setSelections(prev => ({ ...prev, [groupName]: optionName }));
  };

  const calculateTotalPrice = () => {
    let total = item.price;
    if (item.modifierGroups) {
      item.modifierGroups.forEach(g => {
        const selectedOptionName = selections[g.name];
        if (selectedOptionName) {
          const opt = g.options.find(o => o.name === selectedOptionName);
          if (opt) total += opt.priceDelta;
        }
      });
    }
    return total * quantity;
  };

  const isFormValid = () => {
    if (!item.modifierGroups) return true;
    return item.modifierGroups.every(g => !g.required || selections[g.name]);
  };

  return (
    <div className="mod-backdrop animate-fade-in" onClick={onClose}>
      <div className="mod-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="mod-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="mod-header">
          <img src={item.imageUrl} alt={item.name} />
          <div>
            <h2>{item.name}</h2>
            <p className="mod-desc">{item.description}</p>
          </div>
        </div>

        <div className="mod-body">
          {item.modifierGroups?.map(group => (
            <div key={group.name} className="mod-group">
              <h3>{group.name} {group.required && <span className="req">*必選</span>}</h3>
              <div className="mod-options">
                {group.options.map(opt => (
                  <button
                    key={opt.name}
                    className={`mod-option-btn ${selections[group.name] === opt.name ? 'active' : ''}`}
                    onClick={() => handleSelect(group.name, opt.name)}
                  >
                    {opt.name}
                    {opt.priceDelta > 0 && <span> (+${opt.priceDelta})</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mod-qty-section">
            <h3>數量</h3>
            <div className="qty-controls">
              <button disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className="mod-footer">
          <button 
            className="mod-confirm-btn" 
            disabled={!isFormValid()}
            onClick={() => onConfirm(item, selections, quantity)}
          >
            <span>加入購物車</span>
            <span className="mod-total">${calculateTotalPrice()}</span>
          </button>
        </div>
      </div>

      <style>{`
        .mod-backdrop {
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

        .mod-modal {
          background: var(--color-bg-base);
          max-width: 500px;
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          animation: scaleUp 0.3s ease cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mod-close {
          position: absolute;
          top: var(--spacing-4);
          right: var(--spacing-4);
          color: white;
          background: rgba(0,0,0,0.5);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .mod-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          padding: var(--spacing-6);
          border-bottom: 1px solid var(--color-border);
          background: rgba(15, 23, 42, 0.5);
        }

        .mod-header img {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          object-fit: cover;
        }

        .mod-header h2 {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-1);
        }

        .mod-desc {
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .mod-body {
          padding: var(--spacing-6);
          overflow-y: auto;
          flex-grow: 1;
        }

        .mod-group {
          margin-bottom: var(--spacing-6);
        }

        .mod-group h3 {
          font-size: 1rem;
          margin-bottom: var(--spacing-3);
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .req {
          font-size: 0.75rem;
          color: #ef4444;
          font-weight: 500;
        }

        .mod-options {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-2);
        }

        .mod-option-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }

        .mod-option-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mod-option-btn.active {
          background: var(--color-bg-accent);
          border-color: var(--color-bg-accent-hover);
        }

        .mod-qty-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--spacing-4);
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--color-border);
        }

        .qty-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          background: rgba(0, 0, 0, 0.2);
          padding: 4px;
          border-radius: var(--radius-lg);
        }

        .qty-controls button {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-surface);
          border-radius: 50%;
          color: white;
          font-size: 1.2rem;
        }

        .qty-controls button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .mod-footer {
          padding: var(--spacing-6);
          border-top: 1px solid var(--color-border);
          background: rgba(15, 23, 42, 0.95);
        }

        .mod-confirm-btn {
          width: 100%;
          padding: var(--spacing-4);
          background: var(--color-bg-accent);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mod-confirm-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .mod-confirm-btn:not(:disabled):hover {
          background: var(--color-bg-accent-hover);
        }
      `}</style>
    </div>
  );
};
