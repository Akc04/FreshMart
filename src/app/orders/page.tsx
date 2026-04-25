'use client';
import { useEffect, useState } from 'react';
import { Order } from '@/types';
import Link from 'next/link';
import { ClipboardList, Package, CheckCircle, Clock } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('grocery_orders');
      const parsed: Order[] = stored ? JSON.parse(stored) : [];
      setOrders(parsed.reverse()); // newest first
    } catch { setOrders([]); }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <ClipboardList size={72} />
          <h2>No orders yet</h2>
          <p>Once you place an order, it will appear here.</p>
          <Link href="/">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const statusIcon = (status: string) => {
    if (status === 'delivered') return <CheckCircle size={16} color="var(--green-600)" />;
    if (status === 'confirmed') return <Package size={16} color="#2563eb" />;
    return <Clock size={16} color="var(--slate-400)" />;
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Order History</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div>
                <span className="order-id-label">{order.id}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginTop: 2 }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {statusIcon(order.status)}
                <span className={`status-badge status-${order.status}`}>{order.status}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {order.items.map(({ product, quantity }) => (
                <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--slate-600)' }}>
                  <span>{product.name} × {quantity}</span>
                  <span style={{ fontWeight: 600 }}>₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Delivery to {order.customerInfo.city}
              </span>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>Total</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-800)' }}>₹{order.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
