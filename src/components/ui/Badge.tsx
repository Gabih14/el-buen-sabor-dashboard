import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  icon,
  className = '',
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-red-100 text-red-800',
    secondary: 'bg-amber-100 text-amber-800',
    success: 'bg-emerald-100 text-emerald-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const classes = `
    inline-flex items-center font-medium
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${rounded ? 'rounded-full' : 'rounded'}
    ${className}
  `;

  return (
    <span className={classes}>
      {icon && <span className="mr-1 -ml-0.5">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;