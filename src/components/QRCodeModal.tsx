import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, url }) => {
  const [tablePrefix, setTablePrefix] = useState('');

  if (!isOpen) return null;

  const finalUrl = tablePrefix.trim() ? `${url}?table=${encodeURIComponent(tablePrefix.trim())}` : url;

  return (
    <div className="qr-backdrop animate-fade-in" onClick={onClose}>
      <div className="qr-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>手機掃碼點餐</h2>
        <p className="qr-desc">輸入桌號生成專屬點餐連結，或直接掃描開啟完整菜單。</p>
        
        <div className="table-input-container">
          <label>指定桌號 (選填)：</label>
          <input 
            type="text" 
            placeholder="例如: A1, 5號桌" 
            value={tablePrefix}
            onChange={(e) => setTablePrefix(e.target.value)}
          />
        </div>

        <div className="qr-container">
          <QRCodeSVG 
            value={finalUrl}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#0f172a"}
            level={"Q"}
            includeMargin={true}
          />
        </div>
      </div>

      <style>{`
        .qr-backdrop {
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

        .qr-modal {
          background: rgba(15, 23, 42, 0.8) !important;
          max-width: 400px;
          width: 100%;
          padding: var(--spacing-8);
          position: relative;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          animation: scaleUp 0.3s ease cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .qr-close {
          position: absolute;
          top: var(--spacing-4);
          right: var(--spacing-4);
          color: var(--color-text-secondary);
        }

        .qr-close:hover {
          color: var(--color-text-primary);
        }

        .qr-modal h2 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-2);
        }

        .qr-desc {
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-4);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .table-input-container {
          margin-bottom: var(--spacing-6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-3);
        }

        .table-input-container label {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .table-input-container input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          outline: none;
          max-width: 150px;
          transition: border-color var(--transition-fast);
        }

        .table-input-container input:focus {
          border-color: var(--color-bg-accent);
        }

        .qr-container {
          background: white;
          padding: var(--spacing-4);
          border-radius: var(--radius-md);
          display: inline-block;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};
