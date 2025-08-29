
import React from 'react';

interface SnackbarProps {
  message: string;
  isVisible: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible }) => {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 bg-inverse-surface text-inverse-on-surface rounded-md shadow-lg transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Snackbar;
