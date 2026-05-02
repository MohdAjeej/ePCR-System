import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginNew.css';

const LoginNew = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!credentials.username.trim()) {
      setError('Please enter your username');
      return;
    }
    
    if (!credentials.password) {
      setError('Please enter your password');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const result = await login(credentials.username, credentials.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-new-container">
      <header className="login-new-header">
        <div className="header-marquee">
          <span>Introducing ePCR V2 — The next generation of patient care reporting →</span>
        </div>
        <div className="header-nav">
          <Link to="/" className="logo" aria-label="ePCR Home">ePCR</Link>
          <span className="page-title">Sign in</span>
        </div>
      </header>

      <main className="login-new-main">
        <div className="login-new-content">
          <h1 className="login-new-title">Welcome back</h1>
          
          <p className="login-new-subtitle">
            Sign in to access your patient records and continue where you left off.
          </p>

          <form onSubmit={handleSubmit} className="login-new-form" noValidate>
            {error && (
              <div className="form-error" role="alert" aria-live="polite">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="username"
                aria-label="Username"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="current-password"
                aria-label="Password"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="form-submit"
              disabled={loading}
              aria-label={loading ? 'Signing in...' : 'Sign in'}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="login-new-footer-text">
            Don't have an account? <Link to="/register-new" className="footer-link">Create one</Link>.
          </p>
        </div>
      </main>

      <footer className="login-new-footer">
        <div className="footer-left">
          <span>© 2026 ePCR</span>
        </div>
        <div className="footer-right">
          <span>Privacy Policy</span>
          <span aria-hidden="true">·</span>
          <span>Terms & Conditions</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginNew;
