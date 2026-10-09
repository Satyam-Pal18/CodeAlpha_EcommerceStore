import React from 'react';

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-backdrop"></div>
      <div className="hero-content">
        <div className="hero-tag">
          <i className="fa-solid fa-sparkles"></i> CodeAlpha Task 1 React Edition
        </div>
        <h1 className="hero-title">
          Discover Premium Tech & <span>Lifestyle Essentials</span>
        </h1>
        <p className="hero-subtitle">
          Built with React & Express. Experience seamless shopping with instant dynamic filters, real-time cart state, secure JWT auth, and order tracking.
        </p>
      </div>
    </section>
  );
};
