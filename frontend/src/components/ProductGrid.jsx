import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products, loading, error, onQuickView }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', width: '100%' }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}></i>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading products catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state" style={{ color: 'var(--danger)', width: '100%' }}>
        <i className="fa-solid fa-triangle-exclamation"></i>
        <p>Failed to load products: {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state" style={{ width: '100%' }}>
        <i className="fa-solid fa-box-open"></i>
        <h3>No products found</h3>
        <p>Try adjusting your search query or filter settings.</p>
      </div>
    );
  }

  return (
    <section className="products-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </section>
  );
};
