import React, { useState } from 'react';
import { CATEGORIES, type Category, MENU_ITEMS, type MenuItem } from '../data/menu';
import { MenuItemCard } from './MenuItemCard';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('咖啡');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = searchQuery ? true : item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-container">
      <div className="search-bar-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="搜尋餐點或描述..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="category-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <MenuItemCard item={item} onAdd={onAddToCart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .menu-container {
          padding: 0 var(--spacing-4) var(--spacing-8);
          max-width: 1200px;
          margin: 0 auto;
        }

        .search-bar-container {
          position: relative;
          margin-bottom: var(--spacing-6);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-text-primary);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .category-filter {
          display: flex;
          overflow-x: auto;
          gap: var(--spacing-3);
          padding-bottom: var(--spacing-4);
          margin-bottom: var(--spacing-6);
          /* Hide scrollbar */
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .category-filter::-webkit-scrollbar {
          display: none;
        }

        .filter-btn {
          white-space: nowrap;
          padding: var(--spacing-2) var(--spacing-4);
          border-radius: 9999px;
          background: var(--color-bg-surface);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          color: var(--color-text-primary);
          background: rgba(255, 255, 255, 0.1);
        }

        .filter-btn.active {
          background: var(--color-bg-accent);
          color: white;
          border-color: var(--color-bg-accent-hover);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--spacing-6);
        }
      `}</style>
    </div>
  );
};
