import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API } from '../services/api';

export const OrdersModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && user) {
      setLoading(true);
      setError(null);
      API.getUserOrders()
        .then((data) => {
          if (data.success) {
            setOrders(data.orders);
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', marginBottom: '1.2rem' }}>
          <i className="fa-solid fa-receipt" style={{ color: 'var(--primary)' }}></i> My Order History
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
            <p style={{ marginTop: '0.8rem', color: 'var(--text-muted)' }}>Fetching your order history...</p>
          </div>
        ) : error ? (
          <div className="empty-state" style={{ color: 'var(--danger)' }}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>Failed to load orders: {error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-receipt"></i>
            <h3>No past orders</h3>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="order-card-box"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>Order #{order.id}</span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="product-badge" style={{ position: 'relative', top: 0, left: 0, background: 'var(--primary)', color: 'white' }}>
                    {order.status}
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '0.2rem', color: 'var(--accent)' }}>
                    ${order.total_amount.toFixed(2)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="order-item-pill"
                  >
                    <img src={item.image} alt={item.product_name} style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '4px' }} />
                    <span>{item.product_name} <strong>x{item.quantity}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
