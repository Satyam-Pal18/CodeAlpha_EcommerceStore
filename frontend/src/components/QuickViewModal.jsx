import React from 'react';
import { useCart } from '../context/CartContext';

export const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="modal-backdrop active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '240px', background: '#000' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              {product.category}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0.3rem 0 0.8rem', lineHeight: 1.2 }}>
              {product.name}
            </h2>
            <div className="product-rating" style={{ marginBottom: '1rem' }}>
              <i className="fa-solid fa-star"></i> <span>{product.rating}</span>
              <span className="review-count">({product.review_count} customer reviews)</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
              {product.description}
            </p>
            {product.features && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1.2rem', background: 'rgba(255,255,255,0.04)', padding: '0.8rem', borderRadius: 'var(--radius-md)' }}>
                <strong>Features:</strong> {product.features}
              </div>
            )}
            <div className="quick-view-bottom-row">
              <div className="price-container">
                <span className="current-price" style={{ fontSize: '1.6rem' }}>${product.price.toFixed(2)}</span>
                {product.original_price && (
                  <span className="original-price">${product.original_price.toFixed(2)}</span>
                )}
              </div>
              <button
                className="btn-primary"
                style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
                onClick={() => {
                  addToCart(product, 1);
                  onClose();
                }}
              >
                <i className="fa-solid fa-shopping-bag"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
