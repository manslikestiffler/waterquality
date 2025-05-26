import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Divider, 
  IconButton,
  Tooltip,
  alpha,
  Typography,
  Box,
  Switch,
  Badge
} from '@mui/material';
import { 
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  VerifiedUser as VerifiedUserIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  // Mock user data - would come from authentication context in real app
  const user = {
    name: "Alex Johnson",
    role: "Administrator",
    email: "alex@watermonitor.io",
    notifications: 3,
    verified: true
  };

  return (
    <>
      <Tooltip title="Account settings">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            onClick={handleClick}
            size="small"
            className="relative overflow-hidden"
            sx={{
              ml: 2,
              p: 0.5,
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
              boxShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
              '&:hover': {
                boxShadow: (theme) => `0 0 15px ${alpha(theme.palette.primary.main, 0.8)}`,
              },
              transition: 'all 0.3s ease',
              background: darkMode ? 
                'linear-gradient(45deg, rgba(0,30,60,0.6), rgba(0,10,20,0.8))' : 
                'linear-gradient(45deg, rgba(255,255,255,0.9), rgba(240,240,255,0.95))',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    border: '2px solid',
                    borderColor: darkMode ? 'black' : 'white'
                  }}
                />
              }
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                  color: (theme) => theme.palette.primary.main,
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  boxShadow: 'inset 0 0 10px rgba(0, 240, 255, 0.2)'
                }}
                className="relative z-10"
              >
                {user.name.charAt(0)}
              </Avatar>
            </Badge>
          </IconButton>
        </motion.div>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 20px rgba(0,0,0,0.2))',
            mt: 1.5,
            width: 320,
            bgcolor: (theme) => darkMode ? 
              alpha(theme.palette.background.paper, 0.8) : 
              'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: darkMode ? 
              '1px solid rgba(255, 255, 255, 0.1)' : 
              '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: 3,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: (theme) => darkMode ? 
                alpha(theme.palette.background.paper, 0.8) : 
                'rgba(255, 255, 255, 0.95)',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderLeft: darkMode ? 
                '1px solid rgba(255, 255, 255, 0.1)' : 
                '1px solid rgba(0, 0, 0, 0.05)',
              borderTop: darkMode ? 
                '1px solid rgba(255, 255, 255, 0.1)' : 
                '1px solid rgba(0, 0, 0, 0.05)',
            },
          },
        }}
      >
        {/* User profile header */}
        <Box className="p-4 flex items-start gap-3">
          <Avatar 
            sx={{ 
              width: 60, 
              height: 60,
              bgcolor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'bold',
              fontSize: '1.5rem',
              boxShadow: 'inset 0 0 10px rgba(0, 240, 255, 0.2)'
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Box className="flex items-center gap-1">
              <Typography variant="subtitle1" className="font-bold">
                {user.name}
              </Typography>
              {user.verified && (
                <Tooltip title="Verified account">
                  <VerifiedUserIcon fontSize="small" className="text-neon-blue" />
                </Tooltip>
              )}
            </Box>
            <Typography variant="caption" className="text-gray-500">
              {user.email}
            </Typography>
            <Box className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/30">
                {user.role}
              </span>
            </Box>
          </Box>
        </Box>
        
        <Divider className="my-1 opacity-20" />
        
        {/* Menu items with hover effects */}
        <MenuItem 
          onClick={() => handleNavigate('/profile')} 
          className="hover:bg-primary-500/20 transition-colors duration-200 py-2"
          sx={{ mx: 1, borderRadius: 2, mt: 1 }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" className="text-neon-blue" />
          </ListItemIcon>
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavigate('/settings')} 
          className="hover:bg-primary-500/20 transition-colors duration-200 py-2"
          sx={{ mx: 1, borderRadius: 2 }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" className="text-neon-blue" />
          </ListItemIcon>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavigate('/notifications')} 
          className="hover:bg-primary-500/20 transition-colors duration-200 py-2"
          sx={{ mx: 1, borderRadius: 2 }}
        >
          <ListItemIcon>
            <Badge badgeContent={user.notifications} color="error">
              <NotificationsIcon fontSize="small" className="text-neon-blue" />
            </Badge>
          </ListItemIcon>
          <Typography variant="body2">Notifications</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavigate('/security')} 
          className="hover:bg-primary-500/20 transition-colors duration-200 py-2"
          sx={{ mx: 1, borderRadius: 2 }}
        >
          <ListItemIcon>
            <SecurityIcon fontSize="small" className="text-neon-blue" />
          </ListItemIcon>
          <Typography variant="body2">Security</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavigate('/help')} 
          className="hover:bg-primary-500/20 transition-colors duration-200 py-2"
          sx={{ mx: 1, borderRadius: 2 }}
        >
          <ListItemIcon>
            <HelpIcon fontSize="small" className="text-neon-blue" />
          </ListItemIcon>
          <Typography variant="body2">Help & Support</Typography>
        </MenuItem>
        
        <Divider className="my-1 opacity-20" />
        
        {/* Theme toggle with switch */}
        <MenuItem 
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }} 
          className="hover:bg-primary-500/20 transition-colors duration-200 py-2"
          sx={{ mx: 1, borderRadius: 2, mt: 1 }}
        >
          <ListItemIcon>
            {darkMode ? (
              <DarkModeIcon fontSize="small" className="text-neon-blue" />
            ) : (
              <LightModeIcon fontSize="small" className="text-neon-blue" />
            )}
          </ListItemIcon>
          <Typography variant="body2">{darkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
          <Box sx={{ ml: 'auto' }}>
            <Switch 
              size="small" 
              checked={!darkMode} 
              onChange={toggleTheme}
              color="primary"
            />
          </Box>
        </MenuItem>
        
        <MenuItem 
          onClick={() => console.log('Logged out')} 
          className="hover:bg-red-500/20 transition-colors duration-200 py-2"
          sx={{ mx: 1, borderRadius: 2, mb: 1 }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" className="text-red-400" />
          </ListItemIcon>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu; 