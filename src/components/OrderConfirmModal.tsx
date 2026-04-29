import React from 'react';
import { X } from 'lucide-react';
import type { CartItem } from './Cart';

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (phone: string) => void;
  items: CartItem[];
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  items
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [phone, setPhone] = React.useState('');

  // 當 modal 關閉時重置狀態
  React.useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
      setIsSuccess(false);
      setPhone('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleMockCheckout = () => {
    if (!phone.trim()) {
      alert('請輸入取餐電話號碼');
      return;
    }
    setIsProcessing(true);
    // 模擬 2 秒鐘的 API 延遲
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // 顯示成功 1.5 秒後關閉並送出
      setTimeout(() => {
        onConfirm(phone);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="confirm-backdrop animate-fade-in" onClick={!isProcessing ? onClose : undefined}>
      <div className="confirm-modal glass-panel" onClick={e => e.stopPropagation()}>
        {!isProcessing && !isSuccess && (
          <button className="confirm-close" onClick={onClose}>
            <X size={24} />
          </button>
        )}
        
        {isProcessing ? (
          <div className="mock-checkout-state">
            <div className="spinner"></div>
            <h2>正在處理付款中...</h2>
            <p>請勿關閉視窗</p>
          </div>
        ) : isSuccess ? (
          <div className="mock-checkout-state success-state">
            <div className="success-icon">✓</div>
            <h2>付款成功！</h2>
            <p>您的訂單已為您準備中</p>
          </div>
        ) : (
          <>
            <h2>確認您的訂購明細</h2>
            
            <div className="confirm-input-group">
              <label htmlFor="phone">取餐電話號碼</label>
              <input
                id="phone"
                type="tel"
                placeholder="例如: 0912345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="confirm-items">
              {items.map(item => (
                <div key={item.cartItemId} className="confirm-item">
                  <div className="confirm-item-info">
                    <span className="confirm-item-name">{item.name} × {item.quantity}</span>
                    {item.modifiers && Object.entries(item.modifiers).map(([k, v]) => (
                      <div key={k} className="confirm-item-mod">{k}: {Array.isArray(v) ? v.join(', ') : v}</div>
                    ))}
                  </div>
                  <span className="confirm-item-price">${item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="confirm-footer">
              <div className="confirm-total">
                <span>總計金額</span>
                <span>${total}</span>
              </div>
              <button className="confirm-btn" onClick={handleMockCheckout}>
                送出訂單
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .confirm-backdrop {
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

        .confirm-modal {
          background: var(--color-bg-base);
          max-width: 450px;
          width: 100%;
          border-radius: var(--radius-lg);
          padding: var(--spacing-6);
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          animation: scaleUp 0.3s ease cubic-bezier(0.16, 1, 0.3, 1);
        }

        .confirm-close {
          position: absolute;
          top: var(--spacing-4);
          right: var(--spacing-4);
          color: var(--color-text-secondary);
          transition: color 0.2s;
        }
        
        .confirm-close:hover {
          color: white;
        }

        .confirm-modal h2 {
          margin-top: 0;
          margin-bottom: var(--spacing-5);
          font-size: 1.4rem;
          text-align: center;
          color: white;
        }

        .confirm-input-group {
          margin-bottom: var(--spacing-5);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .confirm-input-group label {
          color: var(--color-text-primary);
          font-weight: 500;
          font-size: 0.95rem;
        }

        .confirm-input-group input {
          width: 100%;
          padding: var(--spacing-3);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: white;
          font-size: 1rem;
          transition: border-color 0.2s, background 0.2s;
        }

        .confirm-input-group input:focus {
          outline: none;
          border-color: var(--color-bg-accent);
          background: rgba(255, 255, 255, 0.1);
        }

        .confirm-items {
          max-height: 45vh;
          overflow-y: auto;
          padding-right: var(--spacing-2);
          margin-bottom: var(--spacing-6);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .confirm-items::-webkit-scrollbar {
          width: 6px;
        }
        .confirm-items::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }

        .confirm-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: var(--spacing-3) var(--spacing-4);
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .confirm-item-info {
          display: flex;
          flex-direction: column;
        }

        .confirm-item-name {
          font-weight: 500;
          font-size: 1.05rem;
          color: var(--color-text-primary);
          margin-bottom: 4px;
        }

        .confirm-item-mod {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .confirm-item-price {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--color-text-primary);
        }

        .confirm-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: var(--spacing-5);
        }

        .confirm-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: var(--spacing-5);
          color: white;
        }

        .confirm-total span:last-child {
          color: var(--color-bg-accent);
          font-size: 1.5rem;
        }

        .confirm-btn {
          width: 100%;
          padding: var(--spacing-3) var(--spacing-4);
          background: var(--color-bg-accent);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: background 0.2s, transform 0.1s;
        }

        .confirm-btn:hover {
          background: var(--color-bg-accent-hover);
        }

        .confirm-btn:active {
          transform: scale(0.98);
        }

        .mock-checkout-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-8) 0;
          min-height: 250px;
          text-align: center;
          animation: fade-in 0.3s ease-out forwards;
        }

        .mock-checkout-state h2 {
          margin-top: var(--spacing-5) !important;
          margin-bottom: var(--spacing-2) !important;
          font-size: 1.5rem !important;
        }

        .mock-checkout-state p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: var(--color-bg-accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .success-state {
          animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          background: #10B981;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pop-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
