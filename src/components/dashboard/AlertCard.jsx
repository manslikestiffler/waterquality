import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../../App';

// Optimized AlertCard with reduced animations
const AlertCard = ({ alerts }) => {
  const { darkMode } = useContext(ThemeContext);
  const [activeAlert, setActiveAlert] = useState(0);
  const alertsWithEmpty = alerts.length ? alerts : [null];
  
  useEffect(() => {
    if (alerts.length > 1) {
      const interval = setInterval(() => {
        setActiveAlert(prev => (prev + 1) % alerts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [alerts.length]);

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'glass-panel-dark' : 'glass-panel-light'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'} ${darkMode ? 'text-neon-pink' : 'text-red-600'}`}>
            {alerts.length > 0 ? <NotificationsActiveIcon /> : <NotificationsIcon />}
          </div>
          <div>
            <Typography variant="h6" className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              System Alerts
            </Typography>
            <Typography variant="caption" className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {alerts.length > 0 ? `${alerts.length} active notification${alerts.length !== 1 ? 's' : ''}` : 'No active alerts'}
            </Typography>
          </div>
        </div>
        
        {alerts.length > 0 && (
          <div className="relative">
            <Badge 
              badgeContent={alerts.length} 
              color="error"
              sx={{ 
                '& .MuiBadge-badge': { 
                  bgcolor: darkMode ? 'rgba(255, 0, 110, 1)' : 'rgba(211, 47, 47, 1)',
                  boxShadow: darkMode ? '0 0 10px rgba(255, 0, 110, 0.7)' : 'none'
                } 
              }}
            >
              <IconButton className={`${darkMode ? 'text-neon-pink bg-black/30 border border-neon-pink/20 hover:bg-black/50' : 'text-red-600 bg-red-50 border border-red-200 hover:bg-red-100'}`}>
                <WarningIcon />
              </IconButton>
            </Badge>
          </div>
        )}
      </div>
      
      <div className="relative min-h-[180px] flex items-center justify-center">
        {alerts.length > 0 ? (
          <div className="w-full">
            <div className={`
              p-5 rounded-lg border transition-all duration-300
              ${darkMode 
                ? `bg-glass-dark backdrop-blur-glass hover:shadow-neon-pink 
                   ${alerts[activeAlert].severity === 'critical' ? 'border-neon-pink/40' : 'border-neon-yellow/30'}`
                : `bg-white hover:shadow-md 
                   ${alerts[activeAlert].severity === 'critical' ? 'border-red-300' : 'border-yellow-300'}`
              }
            `}>
              <div className="flex items-start gap-4">
                <div className={`
                  p-2 rounded-full
                  ${alerts[activeAlert].severity === 'critical' 
                    ? (darkMode ? 'bg-neon-pink/20 text-neon-pink' : 'bg-red-100 text-red-600')
                    : (darkMode ? 'bg-neon-yellow/20 text-neon-yellow' : 'bg-yellow-100 text-yellow-600')
                  }
                `}>
                  <WarningIcon fontSize="medium" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Typography variant="subtitle1" className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {alerts[activeAlert].title}
                    </Typography>
                    <Typography variant="caption" className={`
                      px-2 py-0.5 rounded-full text-xs uppercase font-bold tracking-wider
                      ${alerts[activeAlert].severity === 'critical' 
                        ? (darkMode ? 'bg-neon-pink/10 text-neon-pink' : 'bg-red-100 text-red-600')
                        : (darkMode ? 'bg-neon-yellow/10 text-neon-yellow' : 'bg-yellow-100 text-yellow-600')
                      }
                    `}>
                      {alerts[activeAlert].severity}
                    </Typography>
                  </div>
                  <Typography variant="body2" className={darkMode ? 'text-gray-300 mb-3' : 'text-gray-600 mb-3'}>
                    {alerts[activeAlert].message}
                  </Typography>
                  <div className="flex justify-between items-center">
                    <Typography variant="caption" className={darkMode ? 'text-gray-400 italic' : 'text-gray-500 italic'}>
                      3 minutes ago
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                      className={darkMode 
                        ? "text-neon-blue hover:text-neon-purple hover:bg-black/30"
                        : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      }
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {alerts.length > 1 && (
              <div className="flex justify-center mt-3 gap-1">
                {alerts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === activeAlert 
                        ? (darkMode ? 'bg-neon-pink' : 'bg-red-500') 
                        : (darkMode ? 'bg-gray-500' : 'bg-gray-300')
                    }`}
                    onClick={() => setActiveAlert(index)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className={`mb-3 text-5xl ${darkMode ? 'text-neon-green' : 'text-green-500'}`}>
              <CheckIcon fontSize="inherit" />
            </div>
            <Typography className={`mb-1 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              No active alerts at this time
            </Typography>
            <Typography variant="body2" className={darkMode ? 'text-gray-400 max-w-xs' : 'text-gray-600 max-w-xs'}>
              All system parameters are functioning within normal ranges. Monitoring active.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(AlertCard); 