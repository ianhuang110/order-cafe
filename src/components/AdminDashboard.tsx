import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Coffee, Clock, CheckCircle, Package } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  modifiers: Record<string, string | string[]>;
}

interface Order {
  id: string;
  tableNumber: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 建立查詢，依照建立時間排序 (最新的在最上面)
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

    // 即時監聽資料庫變更
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error('取得訂單失敗:', error);
      setLoading(false);
    });

    // 卸載元件時取消監聽
    return () => unsubscribe();
  }, []);

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('zh-TW', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const formatModifiers = (modifiers: Record<string, string | string[]>) => {
    if (!modifiers || Object.keys(modifiers).length === 0) return '';
    return Object.entries(modifiers)
      .map(([key, value]) => {
        if (Array.isArray(value)) return value.join(', ');
        return value;
      })
      .filter(Boolean)
      .join(' / ');
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="logo">
            <Coffee className="text-gold" size={28} />
            <h1>Order Cafe 後台管理系統</h1>
          </div>
          <div className="stats">
            <div className="stat-card">
              <span className="stat-label">今日總訂單</span>
              <span className="stat-value">{orders.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">待處理</span>
              <span className="stat-value highlight">
                {orders.filter(o => o.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {loading ? (
          <div className="loading-state">載入訂單中...</div>
        ) : orders.length === 0 ? (
          <div className="empty-state">目前沒有任何訂單</div>
        ) : (
          <div className="table-responsive">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>時間</th>
                  <th>桌號/外帶</th>
                  <th>聯絡電話</th>
                  <th>訂單內容</th>
                  <th>總計</th>
                  <th>狀態</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={order.status === 'pending' ? 'row-pending' : ''}>
                    <td className="time-col">{formatTime(order.createdAt)}</td>
                    <td className="table-col">
                      <span className={`table-badge ${order.tableNumber === '外帶' ? 'takeout' : 'dine-in'}`}>
                        {order.tableNumber}
                      </span>
                    </td>
                    <td className="phone-col">{order.phone || '無'}</td>
                    <td className="items-col">
                      <ul className="item-list">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            <div className="item-main">
                              <span className="item-name">{item.name}</span>
                              <span className="item-qty">x{item.quantity}</span>
                            </div>
                            {formatModifiers(item.modifiers) && (
                              <div className="item-mods">{formatModifiers(item.modifiers)}</div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="amount-col">${order.totalAmount}</td>
                    <td className="status-col">
                      <span className={`status-badge status-${order.status || 'pending'}`}>
                        {order.status === 'pending' ? (
                          <><Clock size={14} /> 待處理</>
                        ) : order.status === 'completed' ? (
                          <><CheckCircle size={14} /> 已完成</>
                        ) : (
                          <><Package size={14} /> 取消</>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <style>{`
        .admin-container {
          min-height: 100vh;
          background-color: #0c0a09;
          color: #f5f5f5;
          font-family: 'Inter', 'Noto Sans TC', sans-serif;
        }

        .admin-header {
          background-color: #1a1a1a;
          border-bottom: 1px solid #333;
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .admin-header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .text-gold {
          color: #d4af37;
        }

        .logo h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .stats {
          display: flex;
          gap: 1.5rem;
        }

        .stat-card {
          background: #2a2a2a;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 100px;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #aaa;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .stat-value.highlight {
          color: #d4af37;
        }

        .admin-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 4rem;
          font-size: 1.25rem;
          color: #888;
          background: #1a1a1a;
          border-radius: 12px;
          border: 1px dashed #333;
        }

        .table-responsive {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border: 1px solid #333;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .orders-table th {
          background: #222;
          padding: 1.25rem 1rem;
          font-size: 0.875rem;
          color: #aaa;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #333;
        }

        .orders-table td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #2a2a2a;
          vertical-align: top;
        }

        .orders-table tr:hover td {
          background: #222;
        }

        .row-pending td {
          background: rgba(212, 175, 55, 0.03);
        }

        .time-col {
          color: #aaa;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .table-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .table-badge.takeout {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .table-badge.dine-in {
          background: rgba(212, 175, 55, 0.15);
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .phone-col {
          font-family: monospace;
          font-size: 1rem;
          color: #eee;
        }

        .item-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .item-main {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .item-name {
          font-weight: 500;
          color: #eee;
        }

        .item-qty {
          color: #d4af37;
          font-weight: 600;
        }

        .item-mods {
          font-size: 0.8rem;
          color: #888;
          background: #2a2a2a;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          display: inline-block;
        }

        .amount-col {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.875rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-pending {
          background: rgba(212, 175, 55, 0.15);
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .status-completed {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        @media (max-width: 1024px) {
          .orders-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}
