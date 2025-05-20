import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  className?: string;
  footer?: ReactNode;
  isHoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  icon,
  className = '',
  footer,
  isHoverable = false,
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        ${isHoverable ? 'transition-all duration-200 hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {(title || icon) && (
        <div className="px-4 py-3 border-b border-gray-200 flex items-center">
          {icon && <span className="mr-2 text-gray-600">{icon}</span>}
          {title && <h3 className="font-serif text-lg font-medium text-gray-800">{title}</h3>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;