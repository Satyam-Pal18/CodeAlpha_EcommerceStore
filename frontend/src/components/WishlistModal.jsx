import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistModal = ({ isOpen, onClose, onQuickView }) => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close Wishlist Modal">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 className="modal-heading">
          <i className="fa-solid fa-heart" style={{ color: 'var(--danger)' }}></i> My Wishlist ({wishlistItems.length})
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="empty-state">
            <i className="fa-regular fa-heart"></i>
            <h3>Your wishlist is empty</h3>
            <p>Save items you love by clicking the heart icon on any product card.</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <div key={product.id} className="wishlist-item-card">
                <div className="wishlist-item-header">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="wishlist-item-img"
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                  />
                  <div className="wishlist-item-info">
                    <span className="wishlist-item-category">{product.category}</span>
                    <h4
                      className="wishlist-item-title"
                      onClick={() => {
                        onQuickView(product);
                        onClose();
                      }}
                    >
                      {product.name}
                    </h4>
                    <span className="wishlist-item-price">${product.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="wishlist-item-actions">
                  <button
                    className="btn-primary"
                    style={{ padding: '0.5rem', fontSize: '0.85rem', flex: 1 }}
                    onClick={() => {
                      addToCart(product, 1);
                      removeFromWishlist(product.id);
                    }}
                  >
                    <i className="fa-solid fa-cart-plus"></i> Move to Cart
                  </button>
                  <button
                    className="icon-btn wishlist-trash-btn"
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from Wishlist"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

