/**
 * Safe Performance optimization utilities
 * These optimizations improve app responsiveness without causing rendering issues
 */

// Add passive event listeners for touch events to improve scrolling performance
export function initPerformanceOptimizations() {
  // Passive event listeners for scroll performance
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        // This signals browser support for passive option
        return true;
      }
    });
    
    // Test if passive is supported
    window.addEventListener('test', null, opts);
    
    // If we got here, passive is supported, so add passive listeners
    window.addEventListener('touchstart', noop, { passive: true });
    window.addEventListener('touchmove', noop, { passive: true });
    
    console.log('✓ Passive event listeners initialized');
  } catch (e) {
    console.warn('Passive event listeners not supported');
  }
  
  // Detect resize to temporarily disable animations
  addResizeHandler();
  
  // Detect user preference for reduced motion
  checkReducedMotion();
  
  // Apply hardware acceleration to critical elements
  applyHardwareAcceleration();
}

// Empty function for passive listeners
function noop() {}

// Disable animations during resize to prevent layout thrashing
function addResizeHandler() {
  let resizeTimeout;
  
  window.addEventListener('resize', () => {
    // Add a class to disable all animations during resize
    document.body.classList.add('resize-animation-stopper');
    
    // Clear any existing timeout
    clearTimeout(resizeTimeout);
    
    // Set a timeout to remove the class after resize is done
    resizeTimeout = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 200);
  });
}

// Check for user's reduced motion preference
function checkReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
    console.log('✓ Reduced motion mode activated');
  }
}

// Apply hardware acceleration to critical elements
function applyHardwareAcceleration() {
  // This helps with smoother animations on elements that need it
  const criticalElements = document.querySelectorAll(
    '.hardware-accelerated, .glass-panel, .data-card, .gradient-border-container'
  );
  
  criticalElements.forEach(element => {
    if (element) {
      element.style.transform = 'translateZ(0)';
      element.style.backfaceVisibility = 'hidden';
      element.style.willChange = 'transform';
    }
  });
}

// Track long tasks for performance monitoring
export function monitorLongTasks() {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // 50ms is considered a long task
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      console.log('✓ Long task monitoring initialized');
    } catch (e) {
      console.warn('Long task monitoring not supported');
    }
  }
}

// Exports
export default {
  initPerformanceOptimizations,
  monitorLongTasks
}; 