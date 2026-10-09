import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPass);
    if (success) onClose();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const success = await register(regName, regEmail, regPass);
    if (success) {
      setLoginEmail(regEmail);
      setRegPass('');
      setActiveTab('login');
    }
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'active' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <button
            className={`pill-btn ${activeTab === 'login' ? 'active' : ''}`}
            style={{ flex: 1, borderRadius: 0, border: 'none', borderBottom: activeTab === 'login' ? '2px solid var(--primary)' : 'none' }}
            onClick={() => setActiveTab('login')}
          >
            Login Account
          </button>
          <button
            className={`pill-btn ${activeTab === 'register' ? 'active' : ''}`}
            style={{ flex: 1, borderRadius: 0, border: 'none', borderBottom: activeTab === 'register' ? '2px solid var(--primary)' : 'none' }}
            onClick={() => setActiveTab('register')}
          >
            Register New
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="user@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Sign In <i className="fa-solid fa-right-to-bracket"></i>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="john@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password (Min 6 characters)</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Create Account <i className="fa-solid fa-user-plus"></i>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
