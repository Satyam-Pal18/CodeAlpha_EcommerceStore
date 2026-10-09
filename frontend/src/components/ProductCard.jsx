import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-img-wrapper" onClick={() => onQuickView(product)}>
        {product.is_featured === 1 && (
          <span className="product-badge badge-featured">Featured</span>
        )}
        {discount > 0 && (
          <span className="product-badge badge-discount" style={{ left: 'auto', right: '48px' }}>
            -{discount}%
          </span>
        )}
        <button
          className={`wishlist-card-btn ${isFavorited ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <i className={`fa-${isFavorited ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
      </div>
      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>
        <div className="product-rating">
          <i className="fa-solid fa-star"></i>
          <span>{product.rating}</span>
          <span className="review-count">({product.review_count} reviews)</span>
        </div>
        <div className="product-price-row">
          <div className="price-container">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.original_price && (
              <span className="original-price">${product.original_price.toFixed(2)}</span>
            )}
          </div>
          <button className="btn-add-cart" onClick={() => addToCart(product, 1)}>
            <i className="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  );
};
