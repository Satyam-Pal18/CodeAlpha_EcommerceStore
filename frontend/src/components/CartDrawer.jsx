import React from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ isOpen, onClose, onProceedCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      ></div>
      <aside className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <div className="cart-title">
            <i className="fa-solid fa-bag-shopping" style={{ color: 'var(--primary)' }}></i> Your Shopping Cart
          </div>
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-cart-shopping"></i>
              <p>Your shopping cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.productId, -1)}>-</button>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.productId, 1)}>+</button>
                  </div>
                </div>
                <button
                  className="icon-btn"
                  style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}
                  onClick={() => removeFromCart(item.productId)}
                >
                  <i className="fa-solid fa-trash" style={{ color: 'var(--danger)' }}></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Subtotal Amount:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            className="btn-primary"
            disabled={cartItems.length === 0}
            onClick={onProceedCheckout}
          >
            Proceed to Checkout <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </aside>
    </>
  );
};
