
import React from 'react';
import type { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-surface dark:bg-surface rounded-2xl p-6 transition-colors duration-300 border border-transparent ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
