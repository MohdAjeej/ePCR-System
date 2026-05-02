import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    organizationName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      organizationName: formData.organizationName,
      roles: ['USER'],
    };

    const result = await register(userData);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
            <h1>Start today.</h1>
            <p>
              Two minutes from sign-up to your first patient record. Join your 
              healthcare team in delivering quality care.
            </p>
          </div>

          {success && (
            <div className="success-message-box">
              Account created successfully! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="John"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
                minLength="3"
                placeholder="johndoe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="john.doe@hospital.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={loading}
                placeholder="555-0100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizationName">Organization</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                disabled={loading}
                placeholder="Metro Medical Transport"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength="8"
                placeholder="Minimum 8 characters"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                minLength="8"
                placeholder="Re-enter password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading || success}>
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
