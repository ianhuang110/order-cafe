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
          padding: var(--spacing-3) 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: relative;
          z-index: 10;
        }

        .banner-content {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          gap: var(--spacing-3);
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }
        
        .promo-banner:hover .banner-content {
          animation-play-state: paused;
        }

        .badge {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .promo-banner p {
          color: var(--color-text-primary);
          font-size: 0.95rem;
          margin: 0;
          font-weight: 500;
          flex-shrink: 0;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
