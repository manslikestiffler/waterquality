import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  WaterDrop as WaterIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import ProfileMenu from './ProfileMenu';
import '../styles/performance.css'; // Import performance optimizations
import { ThemeContext } from '../App';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { text: 'History', icon: <HistoryIcon />, path: '/history' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'About', icon: <InfoIcon />, path: '/about' },
];

// Map component names to their import paths - with @vite-ignore comments
const componentImports = {
  'Dashboard': () => {
    // @vite-ignore
    return import('../pages/Dashboard');
  },
  'Notifications': () => {
    // @vite-ignore
    return import('../pages/Notifications');
  },
  'History': () => {
    // @vite-ignore
    return import('../pages/History');
  },
  'Settings': () => {
    // @vite-ignore
    return import('../pages/Settings');
  },
  'About': () => {
    // @vite-ignore
    return import('../pages/About');
  }
};

// Create a memoized NavItem component to reduce rerenders
const NavItem = React.memo(({ item, isActive, onClick, darkMode }) => (
  <ListItem disablePadding>
    <ListItemButton
      selected={isActive}
      onClick={onClick}
      className={isActive ? 'nav-item-active' : 'nav-item'}
    >
      <ListItemIcon className={isActive ? 'text-neon-blue' : darkMode ? 'text-gray-300' : 'text-gray-600'}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        className={isActive ? 'text-neon-blue' : darkMode ? 'text-gray-300' : 'text-gray-600'}
      />
    </ListItemButton>
  </ListItem>
));

// Remove animation-related properties from layout
function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedTab, setSelectedTab] = useState(
    menuItems.findIndex(item => item.path === location.pathname)
  );
  
  // Update selected tab on location change
  useEffect(() => {
    const index = menuItems.findIndex(item => item.path === location.pathname);
    setSelectedTab(index >= 0 ? index : 0);
    
    // Scroll to top on page change without animation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Memoized drawer content - only rerender when dependencies change
  const drawer = useMemo(() => (
    <div className="h-full flex flex-col">
      {/* Logo and App Title - no animations */}
      <div className="p-6 flex items-center gap-4">
        <Avatar
          className={`w-12 h-12 ${darkMode ? 'bg-black' : 'bg-white'} cursor-pointer border-2 border-neon-blue relative z-10`}
          onClick={() => {
            navigate('/');
            if (isMobile) setMobileOpen(false);
          }}
        >
          <WaterIcon className="text-neon-blue" />
        </Avatar>
        <div>
          <Typography variant="h6" className="font-futuristic font-bold">
            <span className="text-neon-blue">WATER</span> <span className={darkMode ? 'text-white' : 'text-black'}>MONITOR</span>
          </Typography>
          <Typography variant="caption" className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Safe Drinking Water System
          </Typography>
        </div>
      </div>

      <Divider className="mb-4 opacity-20" />

      {/* Navigation Menu - no animations */}
      <List className="px-3">
        {menuItems.map((item, index) => (
          <NavItem
            key={item.text}
            item={item}
            isActive={index === selectedTab}
            darkMode={darkMode}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
          />
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* System Status - no animations */}
      <Box className="p-6">
        <Typography variant="subtitle2" className={darkMode ? 'text-gray-400' : 'text-gray-600'} sx={{ mb: 2 }}>
          System Status
        </Typography>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-neon-green"></div>
          <Typography variant="body2" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            All Systems Operational
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
          <Typography variant="body2" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            Last Update: 2m ago
          </Typography>
        </div>
      </Box>
    </div>
  ), [location.pathname, isMobile, navigate, setMobileOpen, selectedTab, darkMode]);

  // Handle mobile toggle with useCallback to prevent recreation
  const handleMobileToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  // Handle bottom navigation with useCallback
  const handleBottomNavChange = useCallback((event, newValue) => {
    setSelectedTab(newValue);
    navigate(menuItems[newValue].path);
  }, [navigate]);

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'bg-black' : 'bg-white'} relative`}>
      {/* Static background instead of animated */}
      <div className="fixed inset-0 -z-10 bg-gradient-blueprint bg-[length:40px_40px] opacity-20"></div>
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
          <IconButton
            edge="start"
            onClick={handleMobileToggle}
            className="bg-glass-dark text-neon-blue"
          >
            <MenuIcon />
          </IconButton>
        </div>
      )}

      {/* Desktop App Bar - no animations */}
      {!isMobile && (
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
          }}
        >
          <Toolbar className="flex justify-end">
            <div className="flex items-center gap-4">
              <ProfileMenu />
            </div>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar - simplified transitions */}
      <Box
        component="nav"
        sx={{ width: { sm: 280 }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 280,
                borderRight: 'none',
                backgroundImage: 'none',
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(15px)',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 280,
                borderRight: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                backgroundImage: 'none',
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(15px)',
                marginTop: '64px', // Add space for the app bar
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content - remove animations */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 280px)` },
          ml: { sm: `280px` },
          mt: { sm: '64px' }, // Add margin-top for desktop to account for app bar
        }}
      >
        {isMobile && <Box sx={{ height: 64 }} />} {/* Space for mobile top bar */}
        
        {/* Render children directly without transitions */}
        {children}
      </Box>

      {/* Mobile Bottom Navigation - simplified */}
      {isMobile && (
        <Paper
          elevation={3}
          className={`fixed bottom-0 left-0 right-0 z-50 ${darkMode ? 'bg-black/80' : 'bg-white/90'} backdrop-blur-glass border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}
        >
          <BottomNavigation
            value={selectedTab}
            onChange={handleBottomNavChange}
            className="bg-transparent"
          >
            {menuItems.map((item, index) => (
              <BottomNavigationAction
                key={index}
                icon={item.icon}
                className={selectedTab === index ? 'text-neon-blue' : darkMode ? 'text-white/60' : 'text-black/60'}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </div>
  );
}

export default React.memo(Layout); 