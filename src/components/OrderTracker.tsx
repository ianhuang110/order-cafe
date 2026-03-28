import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

type OrderStatus = 'received' | 'preparing' | 'ready';

interface OrderTrackerProps {
  tableNumber: string | null;
  onNewOrder: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ tableNumber, onNewOrder }) => {
  const [status, setStatus] = useState<OrderStatus>('received');
  const [progressValue, setProgressValue] = useState(10);

  useEffect(() => {
    // Simulate order progress
    const receivedTimer = setTimeout(() => {
      setStatus('preparing');
      setProgressValue(50);
    }, 4000);

    const readyTimer = setTimeout(() => {
      setStatus('ready');
      setProgressValue(100);
    }, 12000);

    return () => {
      clearTimeout(receivedTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  const steps = [
    { key: 'received', label: '已接單', icon: Clock },
    { key: 'preparing', label: '製作中', icon: ChefHat },
    { key: 'ready', label: '請取餐', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="tracker-container animate-fade-in">
      <div className="glass-panel tracker-card">
        <h2 className="tracker-title">
          {status === 'ready' ? '餐點已完成！' : '您的餐點正在準備中'}
        </h2>
        {tableNumber && (
          <div className="tracker-table">
            為您送至：<strong>桌號 {tableNumber}</strong>
          </div>
        )}
        
        <div className="progress-bar-bg">
          <motion.div 
            className="progress-bar-fill" 
            initial={{ width: '0%' }}
            animate={{ width: `${progressValue}%` }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        <div className="steps-container">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div key={step.key} className={`step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                <div className="step-icon">
                  <Icon size={24} />
                </div>
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>

        {status === 'ready' && (
          <button className="glass-btn new-order-btn animate-fade-in" onClick={onNewOrder}>
            建立新訂單
          </button>
        )}
      </div>

      <style>{`
        .tracker-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-8) var(--spacing-4);
          min-height: 60vh;
        }

        .tracker-card {
          width: 100%;
          max-width: 600px;
          padding: var(--spacing-8);
          text-align: center;
        }

        .tracker-title {
          font-size: 1.75rem;
          margin-bottom: var(--spacing-2);
          background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tracker-table {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
          margin-bottom: var(--spacing-8);
        }

        .tracker-table strong {
          color: var(--color-bg-accent);
        }

        .progress-bar-bg {
          width: 100%;
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: var(--spacing-8);
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--color-bg-accent);
          border-radius: 9999px;
          box-shadow: 0 0 10px var(--color-bg-accent);
        }

        .steps-container {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-3);
          color: rgba(255,255,255,0.3);
          transition: all var(--transition-base);
          flex: 1;
        }

        .step-item.completed {
          color: var(--color-text-primary);
        }

        .step-item.active {
          color: var(--color-bg-accent);
          transform: scale(1.05);
        }

        .step-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all var(--transition-base);
        }

        .step-item.completed .step-icon {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .step-item.active .step-icon {
          background: var(--color-bg-accent);
          border-color: var(--color-bg-accent);
          color: white;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }

        .new-order-btn {
          margin-top: var(--spacing-8);
          padding: var(--spacing-3) var(--spacing-8);
          font-size: 1.1rem;
          background: rgba(59, 130, 246, 0.15);
          color: var(--color-bg-accent);
        }

        .new-order-btn:hover {
          background: var(--color-bg-accent);
          color: white;
        }
      `}</style>
    </div>
  );
};
