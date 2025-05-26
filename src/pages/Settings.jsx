import { useState, useContext } from 'react';
import {
  Card,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Warning as AlertIcon,
  DarkMode as DarkModeIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  ChevronRight as ChevronRightIcon,
  SettingsOutlined as SettingsIcon,
  Security as SecurityIcon,
  Tune as TuneIcon,
  FlashOn as PowerIcon,
  Animation as AnimationIcon,
  Speed as PerformanceIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContext, ThemeContext } from '../App';

// Define settings options directly in the file
const SETTINGS_OPTIONS = [
  {
    title: 'Account',
    items: [
      { id: 'profile', icon: 'person-outline', label: 'Profile Settings' },
      { id: 'notifications', icon: 'notifications-outline', label: 'Notification Preferences' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'alerts', icon: 'warning-outline', label: 'Alert Thresholds' },
      { id: 'darkMode', icon: 'moon-outline', label: 'Dark Mode', type: 'toggle' },
      { id: 'pushNotifications', icon: 'notifications-outline', label: 'Push Notifications', type: 'toggle' },
    ],
  },
  {
    title: 'About',
    items: [
      { id: 'version', icon: 'information-circle-outline', label: 'Version', value: '1.0.0' },
      { id: 'help', icon: 'help-circle-outline', label: 'Help & Support' },
    ],
  },
];

const SettingsSection = ({ title, items, onItemPress, isDark, animationsEnabled }) => {
  const getIcon = (iconName) => {
    const iconComponents = {
      'person-outline': <PersonIcon className="text-neon-blue" />,
      'notifications-outline': <NotificationsIcon className="text-neon-purple" />,
      'warning-outline': <AlertIcon className="text-neon-yellow" />,
      'moon-outline': <DarkModeIcon className="text-neon-blue" />,
      'light-outline': <LightModeIcon className="text-neon-yellow" />,
      'information-circle-outline': <InfoIcon className="text-neon-green" />,
      'help-circle-outline': <HelpIcon className="text-neon-blue" />,
      'animation-outline': <AnimationIcon className="text-neon-pink" />,
      'performance-outline': <PerformanceIcon className="text-neon-green" />,
    };
    
    return iconComponents[iconName] || <InfoIcon className="text-neon-blue" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Typography 
        variant="overline" 
        className="font-tech text-neon-blue font-medium tracking-wider px-4 text-shadow-neon-blue"
      >
        {title}
      </Typography>
      <motion.div
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="mt-2 glass-panel border border-white/10 overflow-hidden">
          <List disablePadding>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  backgroundColor: 'rgba(0, 240, 255, 0.05)', 
                  transition: { duration: 0.2 } 
                }}
              >
                <ListItem
                  button={!item.type}
                  onClick={() => onItemPress(item)}
                  className={`
                    transition-all duration-300
                    hover:bg-black/40
                    ${index !== items.length - 1 ? 'border-b border-white/5' : ''}
                  `}
                >
                  <ListItemIcon className="min-w-[44px]">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-sm"
                    >
                      {getIcon(item.icon)}
                    </motion.div>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className="text-gray-100 font-futuristic">
                        {item.label}
                      </Typography>
                    }
                  />
                  {item.type === 'toggle' ? (
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Switch
                        edge="end"
                        checked={
                          item.id === 'darkMode' ? isDark : 
                          item.id === 'animations' ? animationsEnabled : 
                          false
                        }
                        onChange={() => onItemPress(item)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#00f0ff',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'rgba(0, 240, 255, 0.5)',
                          },
                        }}
                      />
                    </motion.div>
                  ) : item.value ? (
                    <Typography 
                      variant="body2" 
                      className="text-neon-blue font-tech"
                    >
                      {item.value}
                    </Typography>
                  ) : (
                    <motion.div 
                      animate={{ x: [0, 3, 0] }} 
                      transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                    >
                      <ChevronRightIcon className="text-neon-blue" />
                    </motion.div>
                  )}
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Card>
      </motion.div>
    </motion.div>
  );
};

function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { animationsEnabled, setAnimationsEnabled } = useContext(AnimationContext);

  const handleSettingPress = (item) => {
    switch (item.id) {
      case 'darkMode':
        toggleTheme();
        break;
      case 'animations':
        setAnimationsEnabled(!animationsEnabled);
        break;
      case 'alerts':
        navigate('/settings/alert-thresholds');
        break;
      case 'profile':
        navigate('/settings/profile');
        break;
      default:
        console.log('Setting pressed:', item.id);
    }
  };

  // Enhanced settings with animation toggle
  const enhancedSettings = [
    {
      title: 'Account',
      items: [
        { id: 'profile', icon: 'person-outline', label: 'Profile Settings' },
        { id: 'notifications', icon: 'notifications-outline', label: 'Notification Preferences' },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'alerts', icon: 'warning-outline', label: 'Alert Thresholds' },
        { id: 'darkMode', icon: darkMode ? 'moon-outline' : 'light-outline', label: darkMode ? 'Dark Mode' : 'Light Mode', type: 'toggle', value: darkMode },
        { id: 'animations', icon: 'animation-outline', label: 'Enable Animations', type: 'toggle', value: animationsEnabled },
        { id: 'pushNotifications', icon: 'notifications-outline', label: 'Push Notifications', type: 'toggle' },
      ],
    },
    {
      title: 'Performance',
      items: [
        { id: 'lowAnimations', icon: 'performance-outline', label: 'Low Animation Mode', 
          value: animationsEnabled ? 'Off' : 'On',
          subtext: 'Improves performance on slower devices' },
        { id: 'dataRefresh', icon: 'refresh-outline', label: 'Data Refresh Rate', value: '30s' },
      ],
    },
    {
      title: 'About',
      items: [
        { id: 'version', icon: 'information-circle-outline', label: 'Version', value: '1.0.0' },
        { id: 'help', icon: 'help-circle-outline', label: 'Help & Support' },
      ],
    },
  ];

  const getIcon = (iconName) => {
    const iconComponents = {
      'person-outline': <PersonIcon className="text-neon-blue" />,
      'notifications-outline': <NotificationsIcon className="text-neon-purple" />,
      'warning-outline': <AlertIcon className="text-neon-yellow" />,
      'moon-outline': <DarkModeIcon className="text-neon-blue" />,
      'light-outline': <LightModeIcon className="text-neon-yellow" />,
      'information-circle-outline': <InfoIcon className="text-neon-green" />,
      'help-circle-outline': <HelpIcon className="text-neon-blue" />,
      'animation-outline': <AnimationIcon className="text-neon-pink" />,
      'performance-outline': <PerformanceIcon className="text-neon-green" />,
    };
    
    return iconComponents[iconName] || <InfoIcon className="text-neon-blue" />;
  };

  // Use motion conditionally based on animation setting
  const MotionComponent = animationsEnabled ? motion.div : 'div';

  return (
    <div className="space-y-6">
      {/* Background elements without animations */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-blueprint bg-[length:40px_40px] opacity-20"></div>
        {animationsEnabled && (
          <>
            <motion.div 
              className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-neon-blue/30"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-neon-purple/20"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </>
        )}
      </div>
      
      {/* Header */}
      <div className="relative overflow-hidden cosmic-panel p-8">
        {animationsEnabled && (
          <motion.div 
            className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        )}
        
        <div className="relative flex justify-between items-center">
          <div>
            <MotionComponent
              initial={animationsEnabled ? { opacity: 0, x: -20 } : {}}
              animate={animationsEnabled ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" className="font-futuristic font-bold text-white">
                Settings
              </Typography>
            </MotionComponent>
            <MotionComponent
              initial={animationsEnabled ? { opacity: 0, x: -10 } : {}}
              animate={animationsEnabled ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography variant="body1" className="text-white/80 mt-2">
                Customize your water quality monitoring system
              </Typography>
            </MotionComponent>
          </div>
          <MotionComponent
            initial={animationsEnabled ? { opacity: 0, scale: 0.8 } : {}}
            animate={animationsEnabled ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-black/30 backdrop-blur-glass p-3 rounded-full border border-white/10"
          >
            <SettingsIcon className="text-neon-blue text-4xl" />
          </MotionComponent>
        </div>
      </div>
      
      {/* Settings Sections */}
      {enhancedSettings.map((section) => (
        <MotionComponent
          key={section.title}
          initial={animationsEnabled ? { opacity: 0, y: 20 } : {}}
          animate={animationsEnabled ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Typography 
            variant="overline" 
            className="font-tech text-neon-blue font-medium tracking-wider px-4 text-shadow-neon-blue"
          >
            {section.title}
          </Typography>
          <MotionComponent
            initial={animationsEnabled ? { scale: 0.97 } : {}}
            animate={animationsEnabled ? { scale: 1 } : {}}
            transition={animationsEnabled ? { type: "spring", stiffness: 300, damping: 20 } : {}}
          >
            <Card className="mt-2 glass-panel border border-white/10 overflow-hidden">
              <List disablePadding>
                {section.items.map((item, index) => (
                  <MotionComponent
                    key={item.id}
                    initial={animationsEnabled ? { opacity: 0, x: -20 } : {}}
                    animate={animationsEnabled ? { opacity: 1, x: 0 } : {}}
                    transition={animationsEnabled ? { delay: index * 0.05 } : {}}
                    className={`
                      ${index !== section.items.length - 1 ? 'border-b border-white/5' : ''}
                    `}
                  >
                    <ListItem
                      button={!item.type}
                      onClick={() => handleSettingPress(item)}
                      className="hover:bg-black/40 transition-all duration-150"
                    >
                      <ListItemIcon className="min-w-[44px]">
                        <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm">
                          {getIcon(item.icon)}
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography className="text-gray-100 font-futuristic">
                            {item.label}
                          </Typography>
                        }
                        secondary={item.subtext && (
                          <Typography variant="caption" className="text-gray-400">
                            {item.subtext}
                          </Typography>
                        )}
                      />
                      {item.type === 'toggle' ? (
                        <Switch
                          edge="end"
                          checked={
                            item.id === 'darkMode' ? darkMode : 
                            item.id === 'animations' ? animationsEnabled : 
                            false
                          }
                          onChange={() => handleSettingPress(item)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#00f0ff',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: 'rgba(0, 240, 255, 0.5)',
                            },
                          }}
                        />
                      ) : item.value ? (
                        <Typography 
                          variant="body2" 
                          className="text-neon-blue font-tech"
                        >
                          {item.value}
                        </Typography>
                      ) : (
                        <ChevronRightIcon className="text-neon-blue" />
                      )}
                    </ListItem>
                  </MotionComponent>
                ))}
              </List>
            </Card>
          </MotionComponent>
        </MotionComponent>
      ))}
    </div>
  );
}

export default Settings; 