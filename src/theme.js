import { createTheme, alpha } from '@mui/material';

export const getTheme = (darkMode = true) => { // Default to dark mode for futuristic UI
  // Futuristic color palettes
  const primaryColor = {
    main: darkMode ? '#00F0FF' : '#0284C7', // Neon Blue / Blue for light mode
    light: darkMode ? '#38BDF8' : '#38BDF8',
    dark: '#0284C7',
    contrastText: darkMode ? '#FFFFFF' : '#000000',
  };

  const secondaryColor = {
    main: darkMode ? '#8A00FF' : '#6D00CC', // Neon Purple / Purple for light mode
    light: darkMode ? '#9D3FFF' : '#9D3FFF',
    dark: '#6D00CC',
    contrastText: darkMode ? '#FFFFFF' : '#000000',
  };

  // Cosmic accent colors for UI elements
  const cosmicColors = {
    main: darkMode ? '#3C56F5' : '#3B82F6',
    light: darkMode ? '#6378F7' : '#60A5FA',
    dark: darkMode ? '#0D2EF2' : '#2563EB',
  };

  // Light theme colors - pure white
  const lightBackground = {
    default: '#FFFFFF', // Pure white background
    paper: '#FFFFFF',
    subtle: '#F8FAFC',
    glass: alpha('#FFFFFF', 0.9),
  };

  // Dark theme colors (existing)
  const darkBackground = {
    default: '#030711', // Darker background for futuristic feel
    paper: '#070D1A',
    subtle: '#0E1525',
    glass: alpha('#0E1525', 0.3),
  };

  // Light theme text - dark text for better contrast
  const lightText = {
    primary: '#000000', // Pure black for main text
    secondary: '#334155', // Medium dark for secondary text
    neon: '#0284C7', // Softer blue for light mode
  };

  // Dark theme text (existing)
  const darkText = {
    primary: '#F8FAFC', // Lighter text for better readability
    secondary: '#CBD5E1', // Lighter secondary text
    neon: '#00F0FF', // Neon text color
  };

  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: primaryColor,
      secondary: secondaryColor,
      cosmic: cosmicColors,
      background: darkMode ? darkBackground : lightBackground,
      text: darkMode ? darkText : lightText,
      status: {
        success: darkMode ? '#00FF94' : '#10B981', // Adjusted for light mode
        warning: darkMode ? '#FFDD00' : '#F59E0B', // Adjusted for light mode
        error: darkMode ? '#FF00C8' : '#EF4444',   // Adjusted for light mode
        info: darkMode ? '#00F0FF' : '#3B82F6',    // Adjusted for light mode
      },
      neon: {
        blue: darkMode ? '#00F0FF' : '#0EA5E9',
        purple: darkMode ? '#8A00FF' : '#8B5CF6',
        pink: darkMode ? '#FF00C8' : '#EC4899',
        green: darkMode ? '#00FF94' : '#10B981',
        yellow: darkMode ? '#FFDD00' : '#F59E0B',
      },
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Inter", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        color: darkMode ? '#F8FAFC' : '#000000',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        color: darkMode ? '#F8FAFC' : '#000000',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        color: darkMode ? '#F8FAFC' : '#000000',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
        color: darkMode ? '#F8FAFC' : '#000000',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
        color: darkMode ? '#F8FAFC' : '#000000',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.2,
        color: darkMode ? '#F8FAFC' : '#000000',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
        color: darkMode ? '#F8FAFC' : '#000000',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
        color: darkMode ? '#CBD5E1' : '#334155',
      },
      futuristic: {
        fontFamily: '"Space Grotesk", "Orbitron", "Inter", sans-serif',
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            backgroundImage: 'none',
            backgroundColor: darkMode 
              ? alpha('#070D1A', 0.7)
              : alpha('#FFFFFF', 0.9),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${darkMode ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`,
            boxShadow: darkMode
              ? `0 4px 20px 0 ${alpha('#000', 0.5)}, 0 0 15px 0 ${alpha(primaryColor.main, 0.1)}`
              : `0 4px 20px 0 ${alpha('#000', 0.08)}`,
            '&:hover': {
              boxShadow: darkMode
                ? `0 20px 25px -5px ${alpha('#000', 0.5)}, 0 0 15px 0 ${alpha(primaryColor.main, 0.2)}`
                : `0 20px 25px -5px ${alpha('#000', 0.1)}`,
            },
            transition: 'all 0.3s ease-in-out',
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 16px',
            boxShadow: 'none',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              boxShadow: `0 0 10px ${alpha(primaryColor.main, darkMode ? 0.5 : 0.3)}`,
            },
            '&.MuiButton-containedPrimary': {
              background: darkMode
                ? `linear-gradient(135deg, ${primaryColor.main} 0%, ${secondaryColor.main} 100%)`
                : `linear-gradient(135deg, ${primaryColor.dark} 0%, ${secondaryColor.dark} 100%)`,
              boxShadow: darkMode
                ? `0 0 15px ${alpha(primaryColor.main, 0.5)}`
                : `0 0 10px ${alpha(primaryColor.main, 0.3)}`,
              border: `1px solid ${alpha(primaryColor.light, darkMode ? 0.3 : 0.1)}`,
              '&:hover': {
                boxShadow: darkMode
                  ? `0 0 20px ${alpha(primaryColor.main, 0.7)}`
                  : `0 0 15px ${alpha(primaryColor.main, 0.4)}`,
              },
            },
            '&.MuiButton-outlinedPrimary': {
              borderColor: alpha(primaryColor.main, darkMode ? 0.5 : 0.7),
              '&:hover': {
                borderColor: primaryColor.main,
                backgroundColor: alpha(primaryColor.main, darkMode ? 0.1 : 0.05),
              },
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            borderRadius: 16,
            backgroundColor: darkMode 
              ? alpha('#070D1A', 0.7)
              : alpha('#FFFFFF', 0.9),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${darkMode ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`,
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            backdropFilter: 'blur(10px)',
            backgroundColor: darkMode 
              ? alpha('#070D1A', 0.8)
              : alpha('#FFFFFF', 0.9),
            borderBottom: `1px solid ${darkMode ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`,
            boxShadow: `0 4px 20px 0 ${alpha('#000', darkMode ? 0.1 : 0.05)}`,
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: darkMode 
              ? alpha('#030711', 0.9)
              : alpha('#FFFFFF', 0.98),
            backdropFilter: 'blur(10px)',
            borderRight: `1px solid ${darkMode ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`,
            backgroundImage: 'none',
          }),
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 12,
            margin: '4px 0',
            '&.Mui-selected': {
              backgroundColor: alpha(primaryColor.main, darkMode ? 0.15 : 0.1),
              boxShadow: `0 0 10px ${alpha(primaryColor.main, darkMode ? 0.2 : 0.1)}`,
              '&:hover': {
                backgroundColor: alpha(primaryColor.main, darkMode ? 0.2 : 0.15),
              },
            },
            '&:hover': {
              backgroundColor: alpha(primaryColor.main, darkMode ? 0.1 : 0.05),
            },
          }),
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 40,
            color: darkMode ? primaryColor.main : primaryColor.dark,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: darkMode ? '#F8FAFC' : '#000000',
          },
          secondary: {
            color: darkMode ? '#CBD5E1' : '#334155',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              backdropFilter: 'blur(8px)',
              backgroundColor: darkMode 
                ? alpha('#0E1525', 0.3)
                : alpha('#F1F5F9', 0.7),
              '& fieldset': {
                borderColor: darkMode ? alpha('#fff', 0.2) : alpha('#000', 0.2),
              },
              '&:hover fieldset': {
                borderColor: alpha(primaryColor.main, darkMode ? 0.5 : 0.7),
              },
              '&.Mui-focused fieldset': {
                borderColor: primaryColor.main,
                boxShadow: `0 0 0 3px ${alpha(primaryColor.main, darkMode ? 0.2 : 0.1)}`,
              },
            },
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            fontWeight: 500,
            backdropFilter: 'blur(8px)',
            backgroundColor: darkMode 
              ? alpha('#0E1525', 0.5)
              : alpha('#F1F5F9', 0.8),
            border: `1px solid ${darkMode ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`,
          }),
          colorPrimary: ({ theme }) => ({
            backgroundColor: alpha(primaryColor.main, darkMode ? 0.2 : 0.1),
            border: `1px solid ${alpha(primaryColor.main, darkMode ? 0.3 : 0.2)}`,
            color: darkMode ? primaryColor.main : primaryColor.dark,
          }),
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: darkMode ? alpha('#0E1525', 0.3) : alpha('#F1F5F9', 0.5),
            boxShadow: `0 0 5px ${alpha('#000', darkMode ? 0.1 : 0.05)} inset`,
          },
          barColorPrimary: {
            backgroundColor: darkMode ? primaryColor.main : primaryColor.dark,
            boxShadow: `0 0 8px ${alpha(primaryColor.main, darkMode ? 0.5 : 0.3)}`,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: darkMode ? alpha('#030711', 0.9) : alpha('#FFFFFF', 0.95),
            backdropFilter: 'blur(8px)',
            border: `1px solid ${darkMode ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`,
            boxShadow: `0 4px 20px 0 ${alpha('#000', darkMode ? 0.2 : 0.1)}`,
            borderRadius: 8,
            color: darkMode ? '#F8FAFC' : '#000000',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
          :root {
            color-scheme: ${darkMode ? 'dark' : 'light'};
          }
          
          body {
            background-color: ${darkMode ? '#030711' : '#FFFFFF'};
            color: ${darkMode ? '#F8FAFC' : '#000000'};
          }
          
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
            border-radius: 4px;
            &:hover {
              background: ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
            }
          }
          
          /* Apply light/dark mode CSS variables */
          .MuiListItemText-primary {
            color: ${darkMode ? '#F8FAFC' : '#000000'} !important;
          }
          
          .MuiListItemText-secondary {
            color: ${darkMode ? '#CBD5E1' : '#334155'} !important;
          }
          
          /* Theme-specific backgrounds */
          .cosmic-panel {
            background-color: ${darkMode ? 'rgba(7, 13, 26, 0.7)' : 'rgba(255, 255, 255, 0.95)'};
            border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          }
          
          /* Text colors for themed elements */
          .text-neon-blue {
            color: ${darkMode ? '#00F0FF' : '#0284C7'} !important;
          }
          
          .text-white {
            color: ${darkMode ? '#F8FAFC' : '#000000'} !important;
          }
          
          .text-gray-100 {
            color: ${darkMode ? '#F8FAFC' : '#000000'} !important;
          }
          
          .text-gray-400 {
            color: ${darkMode ? '#94A3B8' : '#64748B'} !important;
          }
          
          /* Border colors */
          .border-white\\\/10 {
            border-color: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} !important;
          }
          
          /* Backgrounds */
          .bg-black {
            background-color: ${darkMode ? '#000000' : '#FFFFFF'} !important;
          }
          
          .bg-black\\/30, .bg-black\\/40, .bg-black\\/50, .bg-black\\/80 {
            background-color: ${darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)'} !important;
          }
          
          /* Light theme blueprint grid */
          .bg-gradient-blueprint {
            background-image: ${darkMode 
              ? 'linear-gradient(rgba(0, 0, 30, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 30, 0.1) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)'
            } !important;
          }
        `,
      },
    },
    shadows: [
      'none',
      `0 1px 2px 0 ${alpha('#000', 0.05)}`,
      `0 1px 3px 0 ${alpha('#000', 0.1)}, 0 1px 2px -1px ${alpha('#000', 0.1)}`,
      `0 4px 6px -1px ${alpha('#000', 0.1)}, 0 2px 4px -2px ${alpha('#000', 0.1)}`,
      `0 10px 15px -3px ${alpha('#000', 0.1)}, 0 4px 6px -4px ${alpha('#000', 0.1)}`,
      `0 20px 25px -5px ${alpha('#000', 0.1)}, 0 8px 10px -6px ${alpha('#000', 0.1)}`,
      `0 0 15px ${alpha(primaryColor.main, 0.5)}`, // Neon glow shadow
    ],
    // Custom styles for glassmorphism
    glass: {
      light: {
        background: alpha('#FFFFFF', 0.1),
        border: `1px solid ${alpha('#FFFFFF', 0.2)}`,
        backdropFilter: 'blur(10px)',
      },
      medium: {
        background: alpha('#FFFFFF', 0.15),
        border: `1px solid ${alpha('#FFFFFF', 0.25)}`,
        backdropFilter: 'blur(15px)',
      },
      heavy: {
        background: alpha('#FFFFFF', 0.25),
        border: `1px solid ${alpha('#FFFFFF', 0.3)}`,
        backdropFilter: 'blur(20px)',
      },
      dark: {
        background: alpha('#000000', 0.15),
        border: `1px solid ${alpha('#FFFFFF', 0.05)}`,
        backdropFilter: 'blur(15px)',
      },
    },
  });
}; 