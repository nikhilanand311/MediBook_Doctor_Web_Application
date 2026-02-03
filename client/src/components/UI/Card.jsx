import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'glass',
  hover = true,
  padding = 'md',
  ...props
}) => {
  // Map variants to custom classes defined in components.css
  const variants = {
    glass: 'card-glass',
    solid: 'bg-dark bg-opacity-75 border border-secondary border-opacity-50',
    gradient: 'card-glass',
    glow: 'card-glass shadow-lg'
  };

  // Map paddings to Bootstrap classes
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
    xl: 'p-5'
  };

  const hoverClasses = hover ? 'card-hover-lift' : '';

  return (
    <div
      className={`rounded-3 ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
