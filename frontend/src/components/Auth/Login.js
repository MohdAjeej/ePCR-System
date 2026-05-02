import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <div className="login-brand">
          WELCOME TO <span>EPCR</span> — ELECTRONIC PATIENT CARE RECORD SYSTEM
        </div>
        
        <div className="login-footer">
          <div className="login-footer-left">
            <span>EPCR</span>
            <span>·</span>
            <span>V1.0.0</span>
          </div>
          <div className="login-footer-right">
            <span>HEALTHCARE</span>
            <span>·</span>
            <span>DOCUMENTATION</span>
            <span>·</span>
            <span>QUALITY</span>
          </div>
        </div>
      </div>

      <div className="login-content">
        <div className="login-box">
          <div className="login-header">
            <h1>Welcome back.</h1>
            <p>
              Pick up where you left off. Your patients, your records — continue 
              documenting quality care.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                placeholder="Enter your username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Enter your password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Create one</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
