import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar = ({
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenOrders,
  theme,
  onToggleTheme,
}) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="navbar">
      <div className="container nav-container">
        <a href="#" className="brand-logo">
          <div className="brand-icon">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <span>AuraStore</span>
        </a>

        <div className="nav-actions">
          {/* Theme Toggle */}
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            title="Toggle Light/Dark Theme"
          >
            <i className="fa-solid fa-circle-half-stroke"></i>
          </button>

          {/* Wishlist */}
          <button
            className="icon-btn"
            onClick={onOpenWishlist}
            title="My Wishlist"
          >
            <i className="fa-solid fa-heart" style={{ color: wishlistCount > 0 ? 'var(--danger)' : 'inherit' }}></i>
            {wishlistCount > 0 && (
              <span className="badge-count" style={{ background: 'var(--danger)' }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Orders History */}
          <button
            className="icon-btn"
            onClick={onOpenOrders}
            title="My Orders"
          >
            <i className="fa-solid fa-box"></i>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            className="icon-btn"
            onClick={onOpenCart}
            title="Shopping Cart"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>

          {/* User Profile / Auth Action */}
          {user ? (
            <div className="user-pill">
              <i
                className="fa-solid fa-user-circle"
                style={{ color: 'var(--primary)', fontSize: '1.1rem' }}
              ></i>
              <span>{user.name}</span>
              <button
                onClick={logout}
                style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <button className="pill-btn active" onClick={onOpenAuth}>
              <i className="fa-solid fa-user"></i> Login / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
