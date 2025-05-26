import React from 'react'
import ReactDOM from 'react-dom/client'
// CSS imports
import './styles/performance.css'
import './index.css'
// Import App and performance utilities
import App from './App.jsx'
import { initPerformanceOptimizations, monitorLongTasks } from './utils/performance'

// Initialize performance optimizations safely
try {
  initPerformanceOptimizations();
  monitorLongTasks();
  console.log('Performance optimizations initialized');
} catch (error) {
  console.warn('Performance optimizations failed to initialize', error);
  // App will still run without optimizations
}

// Find the root element and create root
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found! Make sure there's a div with id 'root' in index.html");
}
