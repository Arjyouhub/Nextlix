import React, { useState } from 'react';
import { adminLogin } from '../api';

const AdminLogin = ({ onLoginSuccess, onBackToHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminLogin(username, password);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Invalid username or password credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 100,
      padding: '24px'
    }}>
      <div class="glass-card login-card" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '40px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div class="success-icon-badge" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)' }}>
          <i class="fa-solid fa-user-shield"></i>
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Console Login
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '30px' }}>
          Enter administrative credentials to access console control tools.
        </p>

        <form onSubmit={handleSubmit}>
          <div class="form-group" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label class="form-label">Username</label>
            <input 
              type="text" 
              placeholder="e.g. admin" 
              class="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <div class="form-group" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <label class="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              class="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{ 
              color: '#ef4444', 
              fontSize: '0.85rem', 
              background: 'rgba(239, 68, 68, 0.08)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              padding: '10px 14px', 
              borderRadius: 'var(--border-radius-sm)', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}>
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            class="btn btn-primary btn-full-width" 
            disabled={loading}
            style={{ marginBottom: '15px' }}
          >
            {loading ? 'Authenticating...' : 'Login to Console'}
          </button>
          
          <button 
            type="button" 
            class="btn btn-secondary btn-full-width" 
            onClick={onBackToHome}
            disabled={loading}
          >
            <i class="fa-solid fa-arrow-left"></i> Back to Website
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
