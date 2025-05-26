import React, { useState, useMemo, useCallback, useContext } from 'react';
import {
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  PlayArrow as PlayArrowIcon,
  PauseCircle as PauseCircleIcon,
} from '@mui/icons-material';
import { Doughnut } from 'react-chartjs-2';
import { ThemeContext } from '../../App';

// Optimized QualityDistributionCard with reduced animations
const QualityDistributionCard = () => {
  const { darkMode } = useContext(ThemeContext);
  const [highlightedSegment, setHighlightedSegment] = useState(null);
  const [isRotating, setIsRotating] = useState(false); // Default to false for better performance
  
  // Distribution segments data
  const segments = [
    {
      id: 'optimal',
      label: 'Optimal',
      value: 65,
      color: 'rgba(0, 255, 148, 1)',
      description: 'Parameters within safe range'
    },
    {
      id: 'warning',
      label: 'Warning',
      value: 25,
      color: 'rgba(255, 204, 0, 1)',
      description: 'Minor deviations detected'
    },
    {
      id: 'critical',
      label: 'Critical',
      value: 10,
      color: 'rgba(255, 0, 110, 1)',
      description: 'Attention required'
    }
  ];
  
  // Memoize chart data to prevent recalculation
  const chartData = useMemo(() => ({
    labels: segments.map(segment => segment.label),
    datasets: [
      {
        data: segments.map(segment => segment.value),
        backgroundColor: segments.map(segment => segment.color),
        borderColor: darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
        hoverBorderColor: darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.3)',
        hoverBorderWidth: 3,
        hoverOffset: 5,
      }
    ]
  }), [segments, darkMode]);
  
  // Memoize chart options to prevent recalculation
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    animation: {
      animateRotate: isRotating,
      animateScale: false, // Disable scale animation
      duration: 1000
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: darkMode ? 'rgba(0, 15, 30, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: darkMode ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 120, 255, 0.5)',
        borderWidth: 1,
        padding: 8,
        cornerRadius: 8,
        usePointStyle: true,
      }
    }
  }), [isRotating, darkMode]);
  
  // Toggle rotation when clicked
  const toggleRotation = useCallback(() => {
    setIsRotating(!isRotating);
  }, [isRotating]);

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'glass-panel-dark' : 'glass-panel-light'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-black/50' : 'bg-blue-50'} ${darkMode ? 'text-neon-blue' : 'text-blue-600'}`}>
            <BarChartIcon />
          </div>
          <div>
            <Typography variant="h6" className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Quality Distribution
            </Typography>
            <Typography variant="caption" className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Overall system parameters status
            </Typography>
          </div>
        </div>
        
        <Tooltip title={isRotating ? "Pause animation" : "Play animation"} arrow>
          <IconButton 
            onClick={toggleRotation}
            className={`${darkMode ? 'bg-black/40 text-white hover:text-neon-blue border border-white/10' : 'bg-gray-100 text-gray-700 hover:text-blue-600 border border-gray-200'}`}
          >
            {isRotating ? <PauseCircleIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Tooltip>
      </div>
      
      <div className="flex flex-col items-center relative mb-2">
        <div className="h-[180px] w-full relative">
          <div className="w-full h-full relative">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <Typography variant="h3" className={`font-bold ${darkMode ? 'text-white text-shadow-neon-blue' : 'text-gray-800'}`}>
              90%
            </Typography>
            <Typography variant="caption" className={`opacity-90 uppercase tracking-wider text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Avg. Quality
            </Typography>
          </div>
        </div>
        
        <div className="w-full grid gap-2 mt-4">
          {segments.map((segment) => (
            <div
              key={segment.id}
              onMouseEnter={() => setHighlightedSegment(segment.id)}
              onMouseLeave={() => setHighlightedSegment(null)}
              className={`
                flex items-start gap-2 p-3 rounded-md 
                ${darkMode ? 'bg-black/30' : 'bg-gray-50'} 
                ${highlightedSegment === segment.id ? (darkMode ? 'ring-1 ring-white/30' : 'ring-1 ring-blue-200') : ''}
                transition-all duration-300
              `}
            >
              <div className="flex items-center gap-2 flex-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography 
                      variant="body2" 
                      className="font-medium"
                      style={{ color: segment.color }}
                    >
                      {segment.label} {segment.value}%
                    </Typography>
                  </div>
                  <Typography variant="caption" className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {segment.description}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(QualityDistributionCard); 