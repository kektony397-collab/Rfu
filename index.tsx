
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Tailwind CSS theme configuration (simulating tailwind.config.js for MD3)
const tailwindScript = document.createElement('script');
tailwindScript.innerHTML = `
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'primary': '#6750A4',
          'on-primary': '#FFFFFF',
          'primary-container': '#EADDFF',
          'on-primary-container': '#21005D',
          'secondary': '#625B71',
          'on-secondary': '#FFFFFF',
          'secondary-container': '#E8DEF8',
          'on-secondary-container': '#1D192B',
          'tertiary': '#7D5260',
          'on-tertiary': '#FFFFFF',
          'tertiary-container': '#FFD8E4',
          'on-tertiary-container': '#31111D',
          'error': '#B3261E',
          'on-error': '#FFFFFF',
          'error-container': '#F9DEDC',
          'on-error-container': '#410E0B',
          'background': '#F3F3F7',
          'on-background': '#1C1B1F',
          'surface': '#FFFBFE',
          'on-surface': '#1C1B1F',
          'surface-variant': '#E7E0EC',
          'on-surface-variant': '#49454F',
          'outline': '#79747E',
          'inverse-surface': '#313033',
          'inverse-on-surface': '#F4EFF4',
        }
      }
    }
  }
`;
document.head.appendChild(tailwindScript);


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}