
import React from 'react';

interface FABProps {
  onClick: () => void;
}

const FAB: React.FC<FABProps> = ({ onClick }) => {
  const handleClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary-container dark:bg-primary-container rounded-2xl shadow-lg flex items-center justify-center text-on-primary-container dark:text-on-primary-container hover:bg-primary-container/80 active:bg-primary-container/70 transition-all duration-200 ease-in-out transform hover:scale-105"
      aria-label="Share results"
    >
      <span className="material-symbols-outlined">share</span>
    </button>
  );
};

export default FAB;
