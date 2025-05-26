import React, { useState, useContext, useEffect } from 'react';
import {
  Card,
  Typography,
  Box,
  Slider,
  Button,
  IconButton,
  Divider,
  Switch,
  Grid,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Thermostat as TempIcon,
  Opacity as TurbidityIcon,
  Air as OxygenIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Refresh as ResetIcon,
  Warning as WarningIcon,
  NotificationsActive as AlertIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext, AnimationContext } from '../App';
import { motion } from 'framer-motion';

// Default threshold values
const DEFAULT_THRESHOLDS = {
  ph: {
    min: 6.5,
    max: 8.0,
    warning: { low: 6.8, high: 7.6 },
    critical: { low: 6.5, high: 8.0 },
    unit: 'pH',
    name: 'pH Level',
    icon: WaterIcon,
  },
  temperature: {
    min: 15,
    max: 35,
    warning: { low: 20, high: 28 },
    critical: { low: 18, high: 32 },
    unit: '°C',
    name: 'Temperature',
    icon: TempIcon,
  },
  turbidity: {
    min: 0,
    max: 10,
    warning: { low: 0, high: 4 },
    critical: { low: 0, high: 6 },
    unit: 'NTU',
    name: 'Turbidity',
    icon: TurbidityIcon,
  },
  dissolved_oxygen: {
    min: 0,
    max: 14,
    warning: { low: 5, high: 12 },
    critical: { low: 3, high: 13 },
    unit: 'mg/L',
    name: 'Dissolved Oxygen',
    icon: OxygenIcon,
  },
};

// Component for an individual threshold parameter
const ThresholdSlider = ({ parameter, thresholds, onChange, darkMode, animationsEnabled }) => {
  const { min, max, warning, critical, unit, name, icon: Icon } = thresholds;
  
  // Create the JSX element conditionally based on animations being enabled
  const MotionComponent = animationsEnabled ? motion.div : 'div';
  const motionProps = animationsEnabled ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};
  
  return (
    <MotionComponent {...motionProps}>
      <Card className={`mb-6 p-6 ${darkMode ? 'glass-panel-dark' : 'glass-panel-light'}`}>
        <Box className="flex items-center mb-4">
          <Box className={`
            mr-3 p-2 rounded-xl
            ${darkMode 
              ? 'bg-black/30 text-neon-blue' 
              : 'bg-blue-50 text-blue-600'}
          `}>
            <Icon />
          </Box>
          <Typography variant="h6" className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {name}
          </Typography>
        </Box>
        
        <Box className="mb-5">
          <Typography variant="subtitle2" className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Warning Thresholds
          </Typography>
          <Box className="px-2">
            <Slider
              value={[warning.low, warning.high]}
              min={min}
              max={max}
              step={parameter === 'ph' ? 0.1 : 1}
              onChange={(_, newValue) => onChange(parameter, 'warning', newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}${unit}`}
              sx={{
                color: darkMode ? 'rgba(255, 193, 7, 0.8)' : 'rgba(237, 137, 7, 0.8)',
                '& .MuiSlider-thumb': {
                  backgroundColor: darkMode ? '#FFC107' : '#ED8907',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                }
              }}
            />
          </Box>
          <Box className="flex justify-between">
            <Typography variant="caption" className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Low: {warning.low}{unit}
            </Typography>
            <Typography variant="caption" className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              High: {warning.high}{unit}
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Critical Thresholds
          </Typography>
          <Box className="px-2">
            <Slider
              value={[critical.low, critical.high]}
              min={min}
              max={max}
              step={parameter === 'ph' ? 0.1 : 1}
              onChange={(_, newValue) => onChange(parameter, 'critical', newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}${unit}`}
              sx={{
                color: darkMode ? 'rgba(244, 67, 54, 0.8)' : 'rgba(211, 47, 47, 0.8)',
                '& .MuiSlider-thumb': {
                  backgroundColor: darkMode ? '#F44336' : '#D32F2F',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                }
              }}
            />
          </Box>
          <Box className="flex justify-between">
            <Typography variant="caption" className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Low: {critical.low}{unit}
            </Typography>
            <Typography variant="caption" className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              High: {critical.high}{unit}
            </Typography>
          </Box>
        </Box>
      </Card>
    </MotionComponent>
  );
};

function AlertThresholds() {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { animationsEnabled } = useContext(AnimationContext);
  const [thresholds, setThresholds] = useState(() => {
    // Try to load saved thresholds from localStorage
    const savedThresholds = localStorage.getItem('alertThresholds');
    return savedThresholds ? JSON.parse(savedThresholds) : DEFAULT_THRESHOLDS;
  });
  
  const [alertsEnabled, setAlertsEnabled] = useState(() => {
    const savedState = localStorage.getItem('alertsEnabled');
    return savedState ? JSON.parse(savedState) === true : true;
  });
  
  // Handler for threshold changes
  const handleThresholdChange = (parameter, type, newValue) => {
    setThresholds(prev => ({
      ...prev,
      [parameter]: {
        ...prev[parameter],
        [type]: { low: newValue[0], high: newValue[1] }
      }
    }));
  };
  
  // Save thresholds to localStorage
  const saveThresholds = () => {
    localStorage.setItem('alertThresholds', JSON.stringify(thresholds));
    localStorage.setItem('alertsEnabled', JSON.stringify(alertsEnabled));
    
    // Show a success message or notification here
    alert('Alert thresholds saved successfully');
  };
  
  // Reset to default thresholds
  const resetToDefault = () => {
    setThresholds(DEFAULT_THRESHOLDS);
    setAlertsEnabled(true);
  };
  
  // Toggle alerts on/off
  const toggleAlerts = () => {
    setAlertsEnabled(prev => !prev);
  };
  
  // Create motion variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const MotionComponent = animationsEnabled ? motion.div : 'div';
  
  return (
    <div className={`p-6 ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <MotionComponent
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex justify-between items-center"
      >
        <Box className="flex items-center">
          <IconButton 
            onClick={() => navigate('/settings')}
            className={darkMode ? "text-white mr-2" : "text-gray-800 mr-2"}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Alert Thresholds
          </Typography>
        </Box>
        <Box className="flex items-center">
          <Typography variant="body2" className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Enable Alerts
          </Typography>
          <Switch 
            checked={alertsEnabled}
            onChange={toggleAlerts}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: darkMode ? '#00f0ff' : '#0288d1',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: darkMode ? 'rgba(0, 240, 255, 0.5)' : 'rgba(2, 136, 209, 0.5)',
              },
            }}
          />
        </Box>
      </MotionComponent>
      
      <MotionComponent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`p-4 mb-6 rounded-lg flex items-center ${
          darkMode 
            ? 'bg-blue-900/20 border border-blue-500/30' 
            : 'bg-blue-50 border border-blue-200'
        }`}
      >
        <AlertIcon className={darkMode ? "text-neon-blue mr-3" : "text-blue-600 mr-3"} />
        <Typography variant="body2" className={darkMode ? "text-gray-200" : "text-gray-700"}>
          Configure threshold values for water quality parameters. When measurements exceed these thresholds, 
          alerts will be triggered based on severity. Warning thresholds trigger yellow alerts, while
          critical thresholds trigger red alerts.
        </Typography>
      </MotionComponent>
      
      <MotionComponent
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.keys(thresholds).map((parameter) => (
          <ThresholdSlider
            key={parameter}
            parameter={parameter}
            thresholds={thresholds[parameter]}
            onChange={handleThresholdChange}
            darkMode={darkMode}
            animationsEnabled={animationsEnabled}
          />
        ))}
      </MotionComponent>
      
      <MotionComponent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex gap-4 mt-6"
      >
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveThresholds}
          className={`py-3 ${
            darkMode 
              ? 'bg-neon-blue hover:bg-neon-blue/80 text-black' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          fullWidth
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          startIcon={<ResetIcon />}
          onClick={resetToDefault}
          className={`py-3 ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
              : 'border-gray-400 text-gray-700 hover:bg-gray-100'
          }`}
          fullWidth
        >
          Reset to Default
        </Button>
      </MotionComponent>
    </div>
  );
}

export default AlertThresholds; 