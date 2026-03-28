import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Cart, type CartItem } from './components/Cart';
import { QRCodeModal } from './components/QRCodeModal';
import type { MenuItem } from './data/menu';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  
  // Base URL for QR code - in production this would be the actual deployed URL
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Optional: show a small toast notification here
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = () => {
    alert('感謝您的訂購！您的餐點已經送出。');
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="app-layout">
      <Header 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main>
        <div className="hero-section text-center">
          <h2 className="animate-fade-in text-gradient">歡迎來到 Order Cafe</h2>
          <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            體驗最高品質的咖啡與精緻手作餐點。
          </p>
          <button 
            className="glass-btn generate-qr-btn animate-fade-in" 
            style={{ animationDelay: '0.2s' }}
            onClick={() => setIsQRModalOpen(true)}
          >
            顯示點餐 QR Code
          </button>
        </div>

        <Menu onAddToCart={handleAddToCart} />
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        url={currentUrl}
      />

      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-section {
          padding: var(--spacing-8) var(--spacing-4);
          text-align: center;
          margin-bottom: var(--spacing-6);
        }

        .text-gradient {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: var(--spacing-2);
          background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-section p {
          color: var(--color-text-secondary);
          font-size: 1.125rem;
          margin-bottom: var(--spacing-6);
        }

        .generate-qr-btn {
          padding: var(--spacing-3) var(--spacing-6);
          font-size: 1rem;
          font-weight: 600;
          border-radius: 9999px;
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.4);
        }
        
        .generate-qr-btn:hover {
          background: rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}

export default App;
