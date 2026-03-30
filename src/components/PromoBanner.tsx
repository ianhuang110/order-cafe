import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <div className="promo-banner">
      <div className="banner-content">
        <span className="badge">春季限定</span>
        <p>新品上市！宇治抹茶拿鐵、瑪格麗特帕尼尼 每日限量供應 🎉</p>
      </div>

      <style>{`
        .promo-banner {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: var(--spacing-3) var(--spacing-4);
          display: flex;
          justify-content: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: relative;
          z-index: 10;
        }

        .banner-content {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          animation: fade-in 0.5s ease-out;
        }

        .badge {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .promo-banner p {
          color: var(--color-text-primary);
          font-size: 0.95rem;
          margin: 0;
          font-weight: 500;
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .banner-content {
            flex-direction: column;
            gap: var(--spacing-1);
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
