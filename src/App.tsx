import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart, type CartItem } from './components/Cart';
import { ItemModifierModal, type ModifierSelection } from './components/ItemModifierModal';
import { OrderTracker } from './components/OrderTracker';
import { OrderConfirmModal } from './components/OrderConfirmModal';
import { PromoBanner } from './components/PromoBanner';
import type { MenuItem } from './data/menu';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [selectedItemForMod, setSelectedItemForMod] = useState<MenuItem | null>(null);
  const [isTrackingOrder, setIsTrackingOrder] = useState(false);
  
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
          if (modifiers[g.name]) {
            const opt = g.options.find(o => o.name === modifiers[g.name]);
            if (opt) unitPrice += opt.priceDelta;
          }
        });
      }

      const cartItemId = `${item.id}-${JSON.stringify(modifiers)}`;
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, cartItemId, quantity, modifiers, unitPrice }];
    });
    setSelectedItemForMod(null);
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
    setIsTrackingOrder(true);
  };

  return (
    <div className="app-layout">
      <Header 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        tableNumber={tableNumber}
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <PromoBanner />
      
      <main>
        {isTrackingOrder ? (
          <OrderTracker 
            tableNumber={tableNumber} 
            onNewOrder={() => setIsTrackingOrder(false)} 
          />
        ) : (
          <>
            <div className="hero-section text-center">
              <div className="hero-bg"></div>
              <div className="hero-content">
                <h2 className="animate-fade-in text-gradient">歡迎來到 Order Cafe</h2>
                <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  體驗最高品質的職人咖啡與精緻手作餐點。
                </p>
              </div>
            </div>

            <Menu onAddToCart={handleAddToCartClick} />
          </>
        )}
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckoutClick}
      />

      <OrderConfirmModal
        isOpen={isOrderConfirmOpen}
        onClose={() => setIsOrderConfirmOpen(false)}
        onConfirm={handleConfirmTransaction}
        items={cartItems}
      />

      <ItemModifierModal
        item={selectedItemForMod}
        onClose={() => setSelectedItemForMod(null)}
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
          margin-bottom: var(--spacing-8);
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin-top: 2rem;
          margin-left: 2rem;
          margin-right: 2rem;
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
            margin-top: 1rem;
            margin-left: 1rem;
            margin-right: 1rem;
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
