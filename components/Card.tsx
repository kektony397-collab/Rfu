
import React from 'react';
import type { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-surface-container-low dark:bg-surface-container-low rounded-2xl p-4 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
