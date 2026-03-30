import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES, type Category, MENU_ITEMS, type MenuItem } from '../data/menu';
import { MenuItemCard } from './MenuItemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Observer options to trigger when section is in the upper part of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // If multiple are visible, usually the first one intersecting from the top is best
          // The intersection ratio can be used, but simple first one is fine.
          setActiveCategory(visibleEntries[0].target.id as Category);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px', // Adjust to trigger active state near top
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [searchQuery]); // re-run if search changes layout

  const scrollToCategory = (cat: Category) => {
    setActiveCategory(cat);
    const element = sectionRefs.current[cat];
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const isSearching = searchQuery.trim().length > 0;
  const searchLower = searchQuery.toLowerCase();

  return (
    <div className="menu-container">
      <div className="search-bar-wrapper">
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
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="清除搜尋">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="menu-layout">
        <div className="category-sidebar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`sidebar-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => scrollToCategory(cat)}
            >
              <div className="btn-indicator" />
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-content">
          {isSearching ? (
             <div className="menu-grid">
                <AnimatePresence mode="popLayout">
                  {MENU_ITEMS.filter(item => 
                      item.name.toLowerCase().includes(searchLower) || 
                      item.description.toLowerCase().includes(searchLower) ||
                      item.category.toLowerCase().includes(searchLower)
                  ).map((item) => (
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
          ) : (
            <div className="menu-sections">
              {CATEGORIES.map((cat) => {
                const items = MENU_ITEMS.filter(item => item.category === cat);
                if (items.length === 0) return null;
                return (
                  <div 
                    key={cat} 
                    id={cat} 
                    className="category-section"
                    ref={(el) => { sectionRefs.current[cat] = el; }}
                  >
                    <h3 className="category-title">{cat}</h3>
                    <div className="menu-grid">
                        {items.map((item) => (
                          <MenuItemCard key={item.id} item={item} onAdd={onAddToCart} />
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .menu-container {
          padding: 0 var(--spacing-4) var(--spacing-8);
          max-width: 1200px;
          margin: 0 auto;
        }

        .search-bar-wrapper {
          position: sticky;
          top: 70px;
          z-index: 40;
          padding: 10px var(--spacing-4);
          background: rgba(12, 10, 9, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          margin-bottom: var(--spacing-8);
          margin-left: calc(var(--spacing-4) * -1);
          margin-right: calc(var(--spacing-4) * -1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .search-bar-container {
          position: relative;
          max-width: 800px;
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
          padding: 0.875rem 3rem 0.875rem 3rem;
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

        .search-clear-btn {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .search-clear-btn:hover {
          color: var(--color-text-primary);
          background: rgba(255, 255, 255, 0.1);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .menu-layout {
          display: flex;
          gap: var(--spacing-8);
          align-items: flex-start;
          position: relative;
        }

        .category-sidebar {
          position: sticky;
          top: 155px; /* Offset for header + search */
          width: 180px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-right: var(--spacing-4);
        }

        .sidebar-btn {
          display: flex;
          align-items: center;
          text-align: left;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid transparent;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          font-size: 1.05rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .sidebar-btn:hover {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.05);
        }

        .sidebar-btn.active {
          color: white;
          font-weight: 700;
          background: rgba(193, 154, 107, 0.15);
          border-color: rgba(193, 154, 107, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-indicator {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--color-bg-accent);
          transform: scaleY(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
          border-radius: 4px;
        }

        .sidebar-btn.active .btn-indicator {
          transform: scaleY(1);
        }

        .menu-content {
          flex: 1;
          min-width: 0;
        }

        .category-section {
          margin-bottom: var(--spacing-12);
          scroll-margin-top: 100px;
        }

        .category-title {
          font-family: 'Playfair Display', 'Noto Serif TC', serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: var(--spacing-6);
          color: white;
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .category-title::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 60px;
          height: 2px;
          background: var(--color-bg-accent);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--spacing-6);
        }

        @media (max-width: 768px) {
          .menu-container {
             padding-left: var(--spacing-3);
             padding-right: var(--spacing-3);
          }
          .menu-layout {
            gap: var(--spacing-3);
          }
          .category-sidebar {
            width: 85px;
            top: 135px;
            padding-right: 0;
            max-height: calc(100vh - 100px);
            overflow-y: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .category-sidebar::-webkit-scrollbar {
            display: none;
          }
          .sidebar-btn {
            padding: 0.75rem 0.25rem;
            font-size: 0.9rem;
            text-align: center;
            justify-content: center;
            border-radius: var(--radius-md) 0 0 var(--radius-md);
            white-space: normal;
            line-height: 1.2;
            min-height: 60px;
            flex-shrink: 0;
          }
          .btn-indicator {
            width: 3px;
          }
          .sidebar-btn.active {
            border-radius: var(--radius-md) 0 0 var(--radius-md);
          }
          .category-title {
            font-size: 1.4rem;
          }
          .category-section {
            margin-bottom: var(--spacing-8);
          }
          .menu-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-4);
          }
        }
      `}</style>
    </div>
  );
};
