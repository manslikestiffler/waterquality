import React, { useMemo, useContext } from 'react';
import {
  Typography,
  IconButton,
  ButtonGroup,
  Button,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { ThemeContext } from '../../App';

// Optimized ChartCard with improved performance
const ChartCard = ({ title, data, loading, timeRange, onTimeRangeChange }) => {
  const { darkMode } = useContext(ThemeContext);
  
  // Memoize options to prevent recreating on each render
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: darkMode ? 'transparent' : '#FFFFFF',
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 20,
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 500
          }
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? 'rgba(0, 15, 30, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: darkMode ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 120, 255, 0.5)',
        borderWidth: 1,
        padding: 15,
        cornerRadius: 10,
        boxPadding: 8,
        usePointStyle: true,
        titleFont: {
          family: "'Space Grotesk', sans-serif",
          size: 14,
          weight: 600
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 13
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11
          },
          padding: 10,
        },
        border: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
          lineWidth: 0.5,
        },
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11
          },
          padding: 10,
          callback: function(value) {
            return value.toFixed(1);
          }
        },
        border: {
          display: false,
        }
      },
    },
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 2,
        fill: true,
      },
      point: {
        radius: 2,
        hoverRadius: 5,
        borderWidth: 1,
        hoverBorderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        hoverBackgroundColor: 'rgba(255, 255, 255, 1)',
      },
    },
    animation: false, // Disable animations for better performance
  }), [darkMode]);

  // Memoize the processed chart data to prevent recalculation
  const processedChartData = useMemo(() => {
    if (!data || !data.datasets) {
      return {
        labels: [],
        datasets: []
      };
    }
    
    // Define gradient colors for each dataset - different for light/dark mode
    const colors = darkMode ? [
      'rgba(0, 240, 255, 1)',
      'rgba(138, 0, 255, 1)',
      'rgba(255, 0, 200, 1)',
      'rgba(0, 255, 148, 1)',
    ] : [
      'rgba(0, 150, 255, 1)',
      'rgba(100, 0, 200, 1)',
      'rgba(200, 0, 150, 1)',
      'rgba(0, 180, 100, 1)',
    ];
    
    return {
      ...data,
      datasets: data.datasets.map((dataset, i) => {
        const colorIndex = i % colors.length;
        return {
          ...dataset,
          borderColor: colors[colorIndex],
          backgroundColor: colors[colorIndex].replace('1)', darkMode ? '0.1)' : '0.05)'),
          pointBackgroundColor: colors[colorIndex],
          pointBorderColor: darkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)',
          tension: 0.3,
          fill: true,
          borderWidth: 2,
        };
      })
    };
  }, [data, darkMode]);

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'glass-panel-dark' : 'glass-panel-light'}`}>
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h6" className={`font-display font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </Typography>
        
        <div className="flex items-center gap-2">
          <ButtonGroup size="small" variant="outlined" className={`${darkMode ? 'bg-black/30' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
            <Button 
              onClick={() => onTimeRangeChange('24h')}
              variant={timeRange === '24h' ? 'contained' : 'outlined'}
              className={timeRange === '24h' ? `${darkMode ? 'bg-black/50 text-neon-blue' : 'bg-white text-blue-600'}` : ''}
              size="small"
            >
              24h
            </Button>
            <Button
              onClick={() => onTimeRangeChange('7d')}
              variant={timeRange === '7d' ? 'contained' : 'outlined'}
              className={timeRange === '7d' ? `${darkMode ? 'bg-black/50 text-neon-blue' : 'bg-white text-blue-600'}` : ''}
              size="small"
            >
              7d
            </Button>
            <Button
              onClick={() => onTimeRangeChange('30d')}
              variant={timeRange === '30d' ? 'contained' : 'outlined'}
              className={timeRange === '30d' ? `${darkMode ? 'bg-black/50 text-neon-blue' : 'bg-white text-blue-600'}` : ''}
              size="small"
            >
              30d
            </Button>
          </ButtonGroup>
          
          <Tooltip title="Refresh data">
            <IconButton size="small" className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      
      <div className="relative h-[300px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularProgress size={30} className="text-neon-blue" />
          </div>
        ) : (
          <Line data={processedChartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default React.memo(ChartCard); 