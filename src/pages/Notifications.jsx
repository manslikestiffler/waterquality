import { useState } from 'react';
import {
  Card,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
  Tooltip,
  Switch,
  FormControlLabel,
  Box,
  Badge,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  NotificationsActive as AlertIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  MarkEmailRead as MarkReadIcon,
  CircleNotifications as NotificationCircleIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'alert',
    title: 'Critical: Dissolved Oxygen',
    message: 'Dissolved oxygen levels have dropped below critical threshold',
    timestamp: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Warning: Temperature Rising',
    message: 'Water temperature is approaching upper threshold',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'System Update Complete',
    message: 'The system has been successfully updated to version 1.0.1',
    timestamp: '1 hour ago',
    read: true,
  },
  {
    id: 4,
    type: 'info',
    title: 'Scheduled Maintenance',
    message: 'System maintenance scheduled for tomorrow at 2 AM',
    timestamp: '3 hours ago',
    read: true,
  },
];

const NotificationItem = ({ notification, onDelete, onMarkRead }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return (
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <AlertIcon className="text-neon-pink" />
          </motion.div>
        );
      case 'warning':
        return (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity 
            }}
          >
            <WarningIcon className="text-neon-yellow" />
          </motion.div>
        );
      case 'success':
        return (
          <motion.div
            animate={{ 
              rotate: 360 
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <SuccessIcon className="text-neon-green" />
          </motion.div>
        );
      case 'info':
        return (
          <motion.div
            animate={{ 
              y: [0, -3, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity 
            }}
          >
            <InfoIcon className="text-neon-blue" />
          </motion.div>
        );
      default:
        return <InfoIcon className="text-neon-blue" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="animate-fade-in"
    >
      <Card className={`
        glass-panel border
        ${!notification.read 
          ? 'border-neon-blue/30 shadow-neon-blue' 
          : 'border-white/10'}
        hover:shadow-neon
      `}>
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className={`
              p-2 rounded-full
              ${notification.type === 'alert' ? 'bg-red-900/30 text-neon-pink' :
                notification.type === 'warning' ? 'bg-yellow-900/30 text-neon-yellow' :
                notification.type === 'success' ? 'bg-green-900/30 text-neon-green' :
                'bg-blue-900/30 text-neon-blue'}
            `}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <Typography 
                    variant="subtitle1" 
                    className={`
                      font-futuristic font-medium mb-1
                      ${notification.type === 'alert' ? 'text-neon-pink text-shadow-neon-pink' :
                        notification.type === 'warning' ? 'text-neon-yellow text-shadow-neon-purple' :
                        notification.type === 'success' ? 'text-neon-green' :
                        'text-neon-blue'}
                    `}
                  >
                    {notification.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    className={`
                      text-gray-300
                      ${!notification.read ? 'font-medium' : ''}
                    `}
                  >
                    {notification.message}
                  </Typography>
                </div>
                <IconButton 
                  size="small" 
                  onClick={handleClick}
                  className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                >
                  <MoreIcon />
                </IconButton>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Typography 
                  variant="caption" 
                  className="text-gray-500 italic"
                >
                  {notification.timestamp}
                </Typography>
                
                {!notification.read && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity 
                    }}
                  >
                    <Chip 
                      label="NEW" 
                      size="small" 
                      className="bg-neon-blue/20 text-neon-blue text-xs px-1"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            className: "bg-glass-dark backdrop-blur-glass border border-white/10"
          }}
        >
          <MenuItem 
            onClick={() => {
              onMarkRead(notification.id);
              handleClose();
            }}
            className="text-gray-200 hover:bg-neon-blue/10"
          >
            <MarkReadIcon className="mr-2 text-neon-blue" />
            Mark as {notification.read ? 'unread' : 'read'}
          </MenuItem>
          <MenuItem 
            onClick={() => {
              onDelete(notification.id);
              handleClose();
            }}
            className="text-gray-200 hover:bg-neon-pink/10"
          >
            <DeleteIcon className="mr-2 text-neon-pink" />
            Delete
          </MenuItem>
        </Menu>
      </Card>
    </motion.div>
  );
};

const FilterButton = ({ active, label, icon: Icon, onClick }) => (
  <Button
    variant={active ? 'contained' : 'outlined'}
    onClick={onClick}
    startIcon={<Icon className={active ? 'text-white' : 'text-gray-400'} />}
    className={`
      transition-all duration-300 font-medium text-sm
      ${active 
        ? 'bg-neon-blue text-white shadow-neon-blue border-neon-blue hover:bg-neon-blue/90' 
        : 'bg-glass-medium hover:bg-glass-heavy border-white/20 text-gray-300'}
    `}
  >
    {label}
  </Button>
);

function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (showUnreadOnly && notification.read) return false;
    if (typeFilter === 'all') return true;
    return notification.type === typeFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-blueprint bg-[length:40px_40px] opacity-20"></div>
        <motion.div 
          className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-neon-blue/30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-2/3 left-2/3 w-2 h-2 rounded-full bg-neon-pink/20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      {/* Header */}
      <div className="relative overflow-hidden cosmic-panel p-8">
        <motion.div 
          className="absolute -bottom-8 -right-8 w-40 h-40 bg-neon-blue/10 rounded-full blur-3xl"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="relative flex justify-between items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" className="font-tech font-bold mb-2 text-white text-shadow-neon-blue">
                <span className="text-animated-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue bg-[length:200%_auto]">
                  Notifications
                </span>
              </Typography>
              <Typography variant="body1" className="text-gray-300">
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-neon-blue"
                >
                  System Status:
                </motion.span>{' '}
                Stay updated with water quality alerts and notifications
              </Typography>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            <Badge 
              badgeContent={unreadCount} 
              color="error"
              overlap="circular"
              sx={{ 
                '& .MuiBadge-badge': { 
                  bgcolor: 'rgba(255, 0, 110, 1)',
                  boxShadow: '0 0 10px rgba(255, 0, 110, 0.7)'
                } 
              }}
            >
              <Box className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity
                  }}
                >
                  <NotificationCircleIcon className="text-neon-blue" sx={{ fontSize: 36 }} />
                </motion.div>
              </Box>
            </Badge>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <Card className="p-6 glass-panel">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <ButtonGroup variant="outlined" className="glass-panel">
            <FilterButton
              active={typeFilter === 'all'}
              label="All"
              icon={FilterIcon}
              onClick={() => setTypeFilter('all')}
            />
            <FilterButton
              active={typeFilter === 'alert'}
              label="Alerts"
              icon={AlertIcon}
              onClick={() => setTypeFilter('alert')}
            />
            <FilterButton
              active={typeFilter === 'warning'}
              label="Warnings"
              icon={WarningIcon}
              onClick={() => setTypeFilter('warning')}
            />
            <FilterButton
              active={typeFilter === 'info'}
              label="Info"
              icon={InfoIcon}
              onClick={() => setTypeFilter('info')}
            />
          </ButtonGroup>
          
          <FormControlLabel
            control={
              <Switch
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="text-neon-blue"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#00f0ff',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'rgba(0, 240, 255, 0.5)',
                  },
                }}
              />
            }
            label="Show unread only"
            className="text-gray-300 text-shadow-sm"
          />
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <NotificationItem
                    notification={notification}
                    onDelete={handleDelete}
                    onMarkRead={handleMarkRead}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 cosmic-panel"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity
                  }}
                  className="text-neon-green text-6xl mb-4"
                >
                  <SuccessIcon fontSize="inherit" />
                </motion.div>
                <Typography variant="h6" className="text-white font-futuristic mb-2 text-shadow-neon-green">
                  No notifications found
                </Typography>
                <Typography variant="body2" className="text-gray-400 max-w-md mx-auto">
                  All systems are operating normally. You will be notified when there are new alerts or important information.
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

export default Notifications; 