import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterNew.css';

const RegisterNew = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'PARAMEDIC'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.username.trim()) {
      setError('Please enter your full name');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!formData.password) {
      setError('Please enter a password');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      // Registration logic would go here
      console.log('Registration data:', formData);
      // For now, just navigate to login
      setTimeout(() => {
        navigate('/login-new');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-new-container">
      <header className="register-new-header">
        <div className="header-marquee">
          <span>Introducing ePCR V2 — The next generation of patient care reporting →</span>
        </div>
        <div className="header-nav">
          <Link to="/" className="logo" aria-label="ePCR Home">ePCR</Link>
          <span className="page-title">Create account</span>
        </div>
      </header>

      <main className="register-new-main">
        <div className="register-new-content">
          <h1 className="register-new-title">Get started</h1>
          
          <p className="register-new-subtitle">
            Create your account and start managing patient records in minutes.
          </p>

          <form onSubmit={handleSubmit} className="register-new-form" noValidate>
            {error && (
              <div className="form-error" role="alert" aria-live="polite">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Full name"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="name"
                aria-label="Full name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="email"
                aria-label="Email address"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="new-password"
                aria-label="Password"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="form-input form-select"
                aria-label="Select your role"
                disabled={loading}
              >
                <option value="PARAMEDIC">Paramedic</option>
                <option value="EMT">EMT</option>
                <option value="SUPERVISOR">Supervisor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="form-submit"
              disabled={loading}
              aria-label={loading ? 'Creating account...' : 'Create account'}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="register-new-footer-text">
            Already have an account? <Link to="/login-new" className="footer-link">Sign in</Link>.
          </p>
        </div>
      </main>

      <footer className="register-new-footer">
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

export default RegisterNew;
