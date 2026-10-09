import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { API } from '../services/api';

export const CheckoutModal = ({ isOpen, onClose, onSuccessOrder }) => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [shipName, setShipName] = useState('');
  const [shipEmail, setShipEmail] = useState('');
  const [shipAddress, setShipAddress] = useState('');
  const [shipCity, setShipCity] = useState('');
  const [shipZip, setShipZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setShipName(user.name || '');
      setShipEmail(user.email || '');
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please login to complete your order', 'error');
      return;
    }

    if (!shipName || !shipEmail || !shipAddress || !shipCity || !shipZip) {
      showToast('Please complete all shipping address fields', 'error');
      return;
    }

    const orderData = {
      items: cartItems,
      shippingAddress: {
        name: shipName,
        email: shipEmail,
        address: shipAddress,
        city: shipCity,
        zip: shipZip,
      },
      paymentMethod,
    };

    try {
      setSubmitting(true);
      const data = await API.createOrder(orderData);
      if (data.success) {
        clearCart();
        onClose();
        showToast(`🎉 Order #${data.orderId} placed successfully!`, 'success');
        onSuccessOrder();
      }
    } catch (err) {
      showToast(err.message || 'Failed to place order', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '580px' }}>
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', marginBottom: '1rem' }}>
          Complete Your Order
        </h2>

        <div className="checkout-summary-box">
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Order Summary</h4>
          {cartItems.map((i) => (
            <div key={i.productId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px dashed var(--border-color)' }}>
              <span>{i.name} (x{i.quantity})</span>
              <span style={{ fontWeight: 700 }}>${(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', fontWeight: 700 }}>
            <span>Total Amount:</span>
            <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={shipName}
                onChange={(e) => setShipName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={shipEmail}
                onChange={(e) => setShipEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Shipping Address</label>
            <input
              type="text"
              className="form-input"
              placeholder="123 Innovation Way, Suite 400"
              value={shipAddress}
              onChange={(e) => setShipAddress(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-input"
                placeholder="New York"
                value={shipCity}
                onChange={(e) => setShipCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Postal / Zip Code</label>
              <input
                type="text"
                className="form-input"
                placeholder="10001"
                value={shipZip}
                onChange={(e) => setShipZip(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select
              className="form-input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Credit Card">Credit / Debit Card (Simulated)</option>
              <option value="PayPal">PayPal Instant</option>
              <option value="UPI">UPI / Net Banking</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: '0.5rem' }}>
            {submitting ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-lock"></i>} Pay & Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};
