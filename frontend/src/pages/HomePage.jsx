import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ControlsBar } from '../components/ControlsBar';
import { ProductGrid } from '../components/ProductGrid';
import { CartDrawer } from '../components/CartDrawer';
import { AuthModal } from '../components/AuthModal';
import { QuickViewModal } from '../components/QuickViewModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { OrdersModal } from '../components/OrdersModal';
import { WishlistModal } from '../components/WishlistModal';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { API } from '../services/api';

export const HomePage = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { showToast } = useToast();

  // Products state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load Categories
  useEffect(() => {
    API.getCategories()
      .then((data) => {
        if (data.success) setCategories(data.categories);
      })
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  // Load Products
  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = {};
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (searchQuery.trim() !== '') params.search = searchQuery.trim();
    if (sortBy) params.sort = sortBy;

    API.getProducts(params)
      .then((data) => {
        if (data.success) setProducts(data.products);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery, sortBy]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(`Switched to ${next} theme`, 'info');
  };

  const handleProceedCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }
    if (!user) {
      showToast('Please login or register to complete your order.', 'info');
      setIsCartOpen(false);
      setIsAuthOpen(true);
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOpenOrders = () => {
    if (!user) {
      showToast('Please login to view your order history.', 'info');
      setIsAuthOpen(true);
      return;
    }
    setIsOrdersOpen(true);
  };

  return (
    <div>
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrders={handleOpenOrders}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="container">
        <Hero />

        <ControlsBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          onQuickView={(p) => setQuickViewProduct(p)}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedCheckout={handleProceedCheckout}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccessOrder={() => setIsOrdersOpen(true)}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </div>
  );
};
