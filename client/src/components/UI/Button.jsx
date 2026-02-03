import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  // Map variants to Bootstrap + custom classes
  const variantClasses = {
    primary: 'btn btn-gradient-primary',
    secondary: 'btn btn-glass',
    outline: 'btn btn-outline-sky',
    ghost: 'btn btn-ghost',
    accent: 'btn btn-gradient-accent'
  };

  // Map sizes to custom size classes
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl'
  };

  const baseClasses = 'd-inline-flex align-items-center justify-content-center gap-2 fw-semibold btn-rounded-xl transition-all';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="spinner-custom"
          style={{ width: '1.25rem', height: '1.25rem' }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            style={{ opacity: 0.75 }}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
