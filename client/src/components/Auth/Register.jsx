import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    validatePasswordStrength(formData.password);
  }, [formData.password]);

  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 7) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 2) return { label: 'Weak', class: 'weak' };
    if (passwordStrength < 4) return { label: 'Medium', class: 'medium' };
    return { label: 'Strong', class: 'strong' };
  };

  const strengthInfo = getStrengthLabel();

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join MedCare for better health management</p>
        </div>

        {/* API Error */}
        {errors.api && (
          <div className="auth-error">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errors.api}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              name="name"
              className={`auth-input ${errors.name ? 'is-invalid' : ''}`}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

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
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              className={`auth-input ${errors.password ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="field-error">{errors.password}</div>}

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="password-strength">
                <div className="password-strength-header">
                  <span className="password-strength-label">Password Strength</span>
                  <span className={`password-strength-value ${strengthInfo.class}`}>
                    {strengthInfo.label}
                  </span>
                </div>
                <div className="password-strength-bar">
                  <div
                    className={`password-strength-fill ${strengthInfo.class}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`auth-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
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
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-link">
          <p>
            Already have an account?{' '}
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>

    
    </div>
  );
};

export default Register;
