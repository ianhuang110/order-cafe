import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart, type CartItem } from './components/Cart';
import { ItemModifierModal, type ModifierSelection } from './components/ItemModifierModal';
import { OrderConfirmModal } from './components/OrderConfirmModal';
import { PromoBanner } from './components/PromoBanner';
import type { MenuItem } from './data/menu';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [selectedItemForMod, setSelectedItemForMod] = useState<MenuItem | null>(null);
  const [editingCartItem, setEditingCartItem] = useState<CartItem | null>(null);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    // Hide hero and promo after 5 seconds
    const timer = setTimeout(() => {
      setShowHero(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Read initial table parameter
    const params = new URLSearchParams(window.location.search);
    const tbl = params.get('table');
    if (tbl) {
      setTableNumber(tbl);
    }
  }, []);

  const handleAddToCartClick = (item: MenuItem) => {
    setSelectedItemForMod(item);
  };

  const handleConfirmAdd = (item: MenuItem, modifiers: ModifierSelection, quantity: number) => {
    setCartItems(prev => {
      let unitPrice = item.price;
      if (item.modifierGroups) {
        item.modifierGroups.forEach(g => {
          const selection = modifiers[g.name];
          if (Array.isArray(selection)) {
            selection.forEach(selName => {
              const opt = g.options.find(o => o.name === selName);
              if (opt) unitPrice += opt.priceDelta;
            });
          } else if (selection) {
            const opt = g.options.find(o => o.name === selection);
            if (opt) unitPrice += opt.priceDelta;
          }
        });
      }

      const cartItemId = `${item.id}-${JSON.stringify(modifiers)}`;
      
      const newItems = [...prev];
      if (editingCartItem) {
        const editIdx = newItems.findIndex(i => i.cartItemId === editingCartItem.cartItemId);
        if (editIdx > -1) {
          const existingIdx = newItems.findIndex(i => i.cartItemId === cartItemId && i.cartItemId !== editingCartItem.cartItemId);
          if (existingIdx > -1) {
            newItems[existingIdx] = { ...newItems[existingIdx], quantity: newItems[existingIdx].quantity + quantity };
            newItems.splice(editIdx, 1);
          } else {
            newItems[editIdx] = { ...item, cartItemId, quantity, modifiers, unitPrice };
          }
          return newItems;
        }
      }

      const existingParams = prev.findIndex(i => i.cartItemId === cartItemId);
      if (existingParams > -1) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, cartItemId, quantity, modifiers, unitPrice }];
    });
    setSelectedItemForMod(null);
    setEditingCartItem(null);
  };

  const handleEditCartItem = (cartItem: CartItem) => {
    setEditingCartItem(cartItem);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckoutClick = () => {
    setIsOrderConfirmOpen(true);
  };

  const handleConfirmTransaction = () => {
    setCartItems([]);
    setIsCartOpen(false);
    setIsOrderConfirmOpen(false);
  };

  return (
    <div className="app-layout">
      <Header 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        tableNumber={tableNumber}
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <AnimatePresence>
        {showHero && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <PromoBanner />
            
            <figure className="hero-section text-center" style={{ margin: '2rem 2rem var(--spacing-8)' }}>
              <div className="hero-bg"></div>
              <div className="hero-content">
                <h2 className="animate-fade-in text-gradient">歡迎來到 Order Cafe</h2>
                <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  體驗最高品質的職人咖啡與精緻手作餐點。
                </p>
              </div>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main>
        <Menu onAddToCart={handleAddToCartClick} />
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onEditItem={handleEditCartItem}
        onCheckout={handleCheckoutClick}
      />

      <OrderConfirmModal
        isOpen={isOrderConfirmOpen}
        onClose={() => setIsOrderConfirmOpen(false)}
        onConfirm={handleConfirmTransaction}
        items={cartItems}
      />

      <ItemModifierModal
        item={selectedItemForMod || editingCartItem}
        initialSelections={editingCartItem?.modifiers}
        initialQuantity={editingCartItem?.quantity}
        isEditing={!!editingCartItem}
        onClose={() => {
          setSelectedItemForMod(null);
          setEditingCartItem(null);
        }}
        onConfirm={handleConfirmAdd}
      />

      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-section {
          position: relative;
          padding: 8rem var(--spacing-4) 7rem;
          text-align: center;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1920');
          background-size: cover;
          background-position: center;
          z-index: 0;
          filter: brightness(0.4) contrast(1.1);
        }
        
        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(12, 10, 9, 0) 0%, rgba(12, 10, 9, 0.8) 100%);
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .text-gradient {
          font-family: 'Playfair Display', 'Noto Serif TC', serif;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-3);
          background: linear-gradient(135deg, #ffffff 0%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.05em;
        }

        .hero-section p {
          color: rgba(255, 255, 255, 0.85);
          font-size: 1.25rem;
          font-weight: 300;
          letter-spacing: 0.08em;
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 5rem var(--spacing-4) 4rem;
            margin: 1rem 1rem var(--spacing-6) !important;
          }
          .text-gradient {
            font-size: 2.2rem;
          }
          .hero-section p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
