import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError(null);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo/Icon */}
        <div className="auth-icon-container">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>

        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your dashboard</p>
        </div>

        {/* Demo Credentials */}
        <div className="demo-box">
          <p>Demo Email: admin@medcare.com</p>
          <p>Demo Password: admin@123</p>
        </div>

        {/* Error Alert */}
        {apiError && (
          <div className="auth-error">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              name="email"
              className={`auth-input ${errors.email ? 'is-invalid' : ''}`}
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div>
            <div className="d-flex justify-content-between mb-2">
              <label className="auth-label mb-0">Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: '#7c3aed', textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              className={`auth-input ${errors.password ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <div className="auth-spinner">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sign In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-link">
          <p>
            Don't have an account?{' '}
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>

    
    </div>
  );
};

export default Login;
