// Chart.js advanced configurations for modern UI
import { Chart as ChartJS } from 'chart.js';

// Global Chart.js defaults for a futuristic look
export const setGlobalChartDefaults = (darkMode = true) => {
  try {
    // Text colors based on theme
    ChartJS.defaults.color = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
    ChartJS.defaults.font.family = "'Inter', sans-serif";
    
    // Modern tooltip style
    if (!ChartJS.defaults.plugins) ChartJS.defaults.plugins = {};
    if (!ChartJS.defaults.plugins.tooltip) ChartJS.defaults.plugins.tooltip = {};
    
    ChartJS.defaults.plugins.tooltip.backgroundColor = darkMode ? 'rgba(0, 15, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)';
    ChartJS.defaults.plugins.tooltip.titleColor = darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
    ChartJS.defaults.plugins.tooltip.bodyColor = darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
    ChartJS.defaults.plugins.tooltip.borderColor = darkMode ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 120, 255, 0.3)';
    ChartJS.defaults.plugins.tooltip.borderWidth = 1;
    ChartJS.defaults.plugins.tooltip.padding = 10;
    ChartJS.defaults.plugins.tooltip.cornerRadius = 8;
    ChartJS.defaults.plugins.tooltip.displayColors = true;
    ChartJS.defaults.plugins.tooltip.boxPadding = 6;
    
    // Legend styling
    if (!ChartJS.defaults.plugins.legend) ChartJS.defaults.plugins.legend = {};
    if (!ChartJS.defaults.plugins.legend.labels) ChartJS.defaults.plugins.legend.labels = {};
    
    ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
    ChartJS.defaults.plugins.legend.labels.pointStyle = 'circle';
    ChartJS.defaults.plugins.legend.labels.padding = 15;
    ChartJS.defaults.plugins.legend.labels.color = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
    
    // Animation defaults
    if (!ChartJS.defaults.animation) ChartJS.defaults.animation = {};
    ChartJS.defaults.animation.duration = 1000;
    ChartJS.defaults.animation.easing = 'easeOutQuart';
    
    // Scale defaults
    if (!ChartJS.defaults.scales) ChartJS.defaults.scales = {};
    if (!ChartJS.defaults.scales.linear) ChartJS.defaults.scales.linear = {};
    if (!ChartJS.defaults.scales.linear.grid) ChartJS.defaults.scales.linear.grid = {};
    if (!ChartJS.defaults.scales.linear.border) ChartJS.defaults.scales.linear.border = {};
    if (!ChartJS.defaults.scales.linear.ticks) ChartJS.defaults.scales.linear.ticks = {};
    
    ChartJS.defaults.scales.linear.grid.color = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    ChartJS.defaults.scales.linear.border.color = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    ChartJS.defaults.scales.linear.ticks.color = darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
    
    if (!ChartJS.defaults.scales.category) ChartJS.defaults.scales.category = {};
    if (!ChartJS.defaults.scales.category.grid) ChartJS.defaults.scales.category.grid = {};
    if (!ChartJS.defaults.scales.category.ticks) ChartJS.defaults.scales.category.ticks = {};
    
    ChartJS.defaults.scales.category.grid.display = false;
    ChartJS.defaults.scales.category.ticks.color = darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
  } catch (error) {
    console.error("Error setting chart defaults:", error);
  }
};

// Line chart configuration for water quality data
export const getWaterQualityLineConfig = (darkMode = true) => {
  const textColor = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const backgroundColor = darkMode ? 'transparent' : '#FFFFFF';
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: backgroundColor,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 20,
          color: textColor,
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
          color: textColor,
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 11
          },
          padding: 10,
        },
        border: {
          color: gridColor,
        }
      },
      y: {
        grid: {
          color: gridColor,
          drawBorder: false,
          lineWidth: 0.5,
        },
        ticks: {
          color: textColor,
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
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
        hoverBackgroundColor: darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
      },
    },
  };
};

// Area chart configuration for trend visualization
export const getAreaChartConfig = (darkMode = true) => {
  const textColor = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const backgroundColor = darkMode ? 'transparent' : '#FFFFFF';
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: backgroundColor,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? 'rgba(0, 15, 30, 0.85)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: darkMode ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 120, 255, 0.5)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        fill: true,
      },
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
  };
};

// Bar chart configuration for comparison views
export const getComparisonBarConfig = (darkMode = true) => {
  const textColor = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const backgroundColor = darkMode ? 'transparent' : '#FFFFFF';
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: backgroundColor,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          color: textColor,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 15, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: darkMode ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 120, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
        },
        border: {
          color: gridColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          padding: 10,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderWidth: 0,
      },
    },
    animation: {
      delay: (context) => context.dataIndex * 100,
    },
  };
};

// Donut/Pie chart for status distribution
export const getPieChartConfig = (darkMode = true) => {
  const textColor = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const backgroundColor = darkMode ? 'transparent' : '#FFFFFF';
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: backgroundColor,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          color: textColor,
          padding: 20,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 15, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', 
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        borderColor: darkMode ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 120, 255, 0.3)',
        borderWidth: 1,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
      },
    },
    cutout: '70%',
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };
};

// Radar chart for quality score visualization
export const getRadarChartConfig = (darkMode = true) => {
  const textColor = darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const backgroundColor = darkMode ? 'transparent' : '#FFFFFF';
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: backgroundColor,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 15, 30, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        borderColor: darkMode ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 120, 255, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      r: {
        backgroundColor: backgroundColor,
        angleLines: {
          color: gridColor,
        },
        grid: {
          color: gridColor,
        },
        pointLabels: {
          color: textColor,
          font: {
            size: 11,
          },
        },
        ticks: {
          color: textColor,
          backdropColor: 'transparent',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 3,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: 'white',
      },
    },
    animation: {
      delay: (context) => context.dataIndex * 100,
    },
  };
};

// Helper function to create gradient backgrounds for charts
export const createGradient = (ctx, colors, darkMode = true) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  
  if (darkMode) {
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
  } else {
    // For light mode, use more subtle gradients
    gradient.addColorStop(0, colors[2] || 'rgba(0, 120, 255, 0.7)');
    gradient.addColorStop(1, colors[3] || 'rgba(0, 120, 255, 0.1)');
  }
  
  return gradient;
};

// Gauge chart data preparation
export const prepareGaugeData = (value, maxValue, thresholds, darkMode = true) => {
  // thresholds example: [{ value: 30, color: 'red' }, { value: 70, color: 'yellow' }, { value: 100, color: 'green' }]
  const percentage = (value / maxValue) * 100;
  
  // Find the current threshold color
  let color = thresholds[0].color;
  for (const threshold of thresholds) {
    if (percentage <= threshold.value) {
      color = threshold.color;
      break;
    }
  }
  
  // Create data for remaining segments
  const remainingValue = 100 - percentage;
  
  return {
    datasets: [
      {
        data: [percentage, remainingValue],
        backgroundColor: [color, darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };
};

// Futuristic neon color sets
export const chartColors = {
  neon: [
    'rgba(0, 240, 255, 1)', // Cyan
    'rgba(138, 0, 255, 1)',  // Purple
    'rgba(255, 0, 200, 1)',  // Pink
    'rgba(0, 255, 148, 1)',  // Green
    'rgba(255, 221, 0, 1)',  // Yellow
  ],
  neonTransparent: [
    'rgba(0, 240, 255, 0.7)',
    'rgba(138, 0, 255, 0.7)',
    'rgba(255, 0, 200, 0.7)',
    'rgba(0, 255, 148, 0.7)',
    'rgba(255, 221, 0, 0.7)',
  ],
  fills: [
    'rgba(0, 240, 255, 0.2)',
    'rgba(138, 0, 255, 0.2)',
    'rgba(255, 0, 200, 0.2)',
    'rgba(0, 255, 148, 0.2)',
    'rgba(255, 221, 0, 0.2)',
  ],
  cosmic: [
    'rgba(60, 86, 245, 1)',
    'rgba(99, 120, 247, 1)',
    'rgba(138, 153, 249, 1)',
    'rgba(177, 187, 251, 1)',
    'rgba(216, 221, 253, 1)',
  ],
  status: {
    good: 'rgba(0, 255, 148, 1)',
    warning: 'rgba(255, 221, 0, 1)',
    critical: 'rgba(255, 0, 110, 1)',
  },
  // Light mode colors - more subtle but still vibrant
  light: {
    neon: [
      'rgba(0, 150, 255, 1)', // Blue
      'rgba(100, 0, 200, 1)',  // Purple
      'rgba(200, 0, 150, 1)',  // Pink
      'rgba(0, 180, 100, 1)',  // Green
      'rgba(200, 150, 0, 1)',  // Yellow
    ],
    fills: [
      'rgba(0, 150, 255, 0.2)',
      'rgba(100, 0, 200, 0.2)',
      'rgba(200, 0, 150, 0.2)',
      'rgba(0, 180, 100, 0.2)',
      'rgba(200, 150, 0, 0.2)',
    ],
  }
};

export default {
  setGlobalChartDefaults,
  getWaterQualityLineConfig,
  getAreaChartConfig,
  getComparisonBarConfig,
  getPieChartConfig,
  getRadarChartConfig,
  prepareGaugeData,
  createGradient,
  chartColors,
}; 