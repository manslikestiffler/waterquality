import React, { useState, useMemo, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import { getTheme } from './theme';
import Layout from './components/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SplashScreen from './components/SplashScreen';

// Import pages directly for reliability
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import History from './pages/History';
import Settings from './pages/Settings';
import About from './pages/About';
import AlertThresholds from './pages/AlertThresholds';

// Create contexts for application settings
export const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: () => {}
});

// Theme context for light/dark mode
export const ThemeContext = createContext({
  darkMode: true,
  toggleTheme: () => {}
});

// Simple loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-[70vh]">
    <CircularProgress size={40} className="text-neon-blue" />
  </div>
);

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-500/30 text-white">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4 text-red-300">{this.state.error?.message || 'Unknown error'}</p>
          <button 
            className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // State for splash screen - set to true to show splash screen
  const [showSplash, setShowSplash] = useState(true);
  const [isDebugMode, setIsDebugMode] = useState(false);
  
  // State for animations toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(false); // Default to false for better performance
  
  // State for theme mode (dark/light)
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  
  // Toggle theme function
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    // Update document with appropriate theme class
    if (newMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  };
  
  // Generate theme based on current mode
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  
  // Apply animation settings to body
  useEffect(() => {
    if (animationsEnabled) {
      document.body.classList.remove('reduced-motion');
    } else {
      document.body.classList.add('reduced-motion');
    }
  }, [animationsEnabled]);
  
  // Check localStorage for saved preferences
  useEffect(() => {
    // Debug mode skip splash screen
    if (isDebugMode) {
      setShowSplash(false);
      return;
    }
    
    // Check session storage to see if the user has already seen the splash screen
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      // Set a flag so the user only sees the splash once per session
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
    
    // Check local storage for animation preference
    const storedAnimationPref = localStorage.getItem('animationsEnabled');
    if (storedAnimationPref !== null) {
      setAnimationsEnabled(storedAnimationPref === 'true');
    }
    
    // Check local storage for theme preference
    const storedThemePref = localStorage.getItem('darkMode');
    if (storedThemePref !== null) {
      const isDarkMode = storedThemePref === 'true';
      setDarkMode(isDarkMode);
      // Apply appropriate theme class to document
      if (isDarkMode) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      }
    } else {
      // Set default theme class
      document.documentElement.classList.add('dark-theme');
    }
  }, [isDebugMode]);
  
  // Save animation preference when it changes
  useEffect(() => {
    localStorage.setItem('animationsEnabled', animationsEnabled.toString());
  }, [animationsEnabled]);

  // Handler for when splash screen finishes
  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  // Animation context value
  const animationContextValue = useMemo(() => ({
    animationsEnabled,
    setAnimationsEnabled
  }), [animationsEnabled, setAnimationsEnabled]);
  
  // Theme context value
  const themeContextValue = useMemo(() => ({
    darkMode,
    toggleTheme
  }), [darkMode]);

  if (showSplash) {
    return <SplashScreen onFinished={handleSplashFinished} />;
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <AnimationContext.Provider value={animationContextValue}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  } />
                  <Route path="/notifications" element={
                    <ErrorBoundary>
                      <Notifications />
                    </ErrorBoundary>
                  } />
                  <Route path="/history" element={
                    <ErrorBoundary>
                      <History />
                    </ErrorBoundary>
                  } />
                  <Route path="/settings" element={
                    <ErrorBoundary>
                      <Settings />
                    </ErrorBoundary>
                  } />
                  <Route path="/settings/alert-thresholds" element={
                    <ErrorBoundary>
                      <AlertThresholds />
                    </ErrorBoundary>
                  } />
                  <Route path="/about" element={
                    <ErrorBoundary>
                      <About />
                    </ErrorBoundary>
                  } />
                </Routes>
              </Layout>
            </Router>
          </ThemeProvider>
        </LocalizationProvider>
      </AnimationContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
