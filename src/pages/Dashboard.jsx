import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense, useContext } from 'react';
import {
  Grid,
  Card,
  Typography,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
  LinearProgress,
  ButtonGroup,
  Button,
  Badge,
  Avatar,
  alpha,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  WaterDrop as WaterIcon,
  Thermostat as TempIcon,
  Opacity as TurbidityIcon,
  Air as OxygenIcon,
  CheckCircle as CheckIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Circle as CircleIcon,
  ArrowForward as ArrowForwardIcon,
  Timeline as TimelineIcon,
  PlayArrow as PlayArrowIcon,
  PauseCircle as PauseCircleIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { Line, Doughnut, Pie } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { ThemeContext } from '../App';
import { setGlobalChartDefaults } from '../utils/ChartConfigs';
import { appwriteService } from '../services/appwrite';

// Register ChartJS components
try {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    ChartTooltip,
    Legend,
    Filler
  );
} catch (error) {
  console.error("Error registering Chart.js components:", error);
}

// Lazy load heavy components
const ChartCard = lazy(() => import('../components/dashboard/ChartCard'));
const QualityDistributionCard = lazy(() => import('../components/dashboard/QualityDistributionCard'));
const AlertCard = lazy(() => import('../components/dashboard/AlertCard'));

// Fallback loading component
const ComponentLoader = () => (
  <div className="w-full h-full min-h-[300px] flex items-center justify-center">
    <CircularProgress size={30} className="text-neon-blue" />
  </div>
);

// Optimized HeroSection with reduced animations
const HeroSection = React.memo(({ status }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} // Reduced y offset from 20 to 10
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }} // Reduced from 0.6
    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cosmic-700 via-cosmic-600 to-cosmic-500 p-8 mb-8"
  >
    <div className="absolute inset-0 bg-black/20 backdrop-blur-glass"></div>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-blue/20 via-transparent to-transparent"></div>
    
    {/* Reduced animated background elements - just keep one */}
    <motion.div 
      className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-blue/50"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    
    <div className="relative flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -10 }} // Reduced x offset from -20 to -10
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }} // Reduced duration and delay
      >
        <Typography variant="h3" className="text-white font-futuristic font-bold mb-2">
          Water Quality <span className="text-neon-blue text-shadow-neon-blue">Monitor</span>
        </Typography>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-neon-blue border border-neon-blue/30">
            SYSTEM STATUS
          </span>
          <Typography variant="h6" className="text-white">
            {status}
          </Typography>
        </div>
        <Typography variant="body1" className="text-white/80">
          Real-time monitoring of critical water parameters for high-density suburban areas.
          <span className="text-neon-blue"> Last update: 2 minutes ago</span>
        </Typography>
      </motion.div>
      
      <motion.div 
        className="hidden md:flex items-center justify-center w-28 h-28 rounded-full bg-black/30 backdrop-blur-glass border border-white/10 shadow-neon"
        initial={{ opacity: 0, scale: 0.8 }} // Reduced animation
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }} // Reduced duration and delay
      >
        <CheckIcon className="text-neon-blue" sx={{ fontSize: 56 }} />
      </motion.div>
    </div>
    
    {/* Single glow effect instead of multiple */}
    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-neon-blue/5 rounded-full blur-2xl"></div>
  </motion.div>
));

// Optimized MetricCard with reduced animations
const MetricCard = React.memo(({ title, value, unit, status, trend, icon: Icon, loading }) => (
  <div className="glass-panel p-6 group hover:shadow-neon transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`
          p-3 rounded-xl
          ${status === 'Good' ? 'bg-green-900/20 text-neon-green' : 
            status === 'Warning' ? 'bg-yellow-900/20 text-neon-yellow' : 
            'bg-red-900/20 text-neon-pink'}
        `}>
          <Icon />
        </div>
        <Typography variant="subtitle1" className="font-futuristic font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
          {title}
        </Typography>
      </div>
      {trend && (
        <Tooltip title={`${Math.abs(trend)}% ${trend > 0 ? 'increase' : 'decrease'}`} arrow>
          <div className={`
            flex items-center gap-1 text-sm font-medium
            ${trend > 0 ? 'text-neon-green' : 'text-neon-pink'}
          `}>
            {trend > 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
            {Math.abs(trend)}%
          </div>
        </Tooltip>
      )}
    </div>
    {loading ? (
      <div className="h-12 flex items-center justify-center">
        <CircularProgress size={24} className="text-neon-blue" />
      </div>
    ) : (
      <div className="flex items-baseline gap-2">
        <Typography className="text-3xl font-bold text-white">
          {value}
        </Typography>
        <Typography className="text-sm text-gray-300">
          {unit}
        </Typography>
      </div>
    )}
    {status && (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <Typography variant="caption" className="text-gray-300">
            Status
          </Typography>
          <Typography variant="caption" className={
            status === 'Good' ? 'text-neon-green' : 
            status === 'Warning' ? 'text-neon-yellow' : 
            'text-neon-pink'
          }>
            {status}
          </Typography>
        </div>
        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
          <div 
            style={{ 
              width: `${status === 'Good' ? 100 : status === 'Warning' ? 60 : 30}%`,
              transition: 'width 0.5s ease-out'
            }}
            className={`
              h-full rounded-full
              ${status === 'Good' ? 'bg-neon-green' : 
                status === 'Warning' ? 'bg-neon-yellow' : 
                'bg-neon-pink'}
            `}
          />
        </div>
      </div>
    )}
  </div>
));

// Modify the Dashboard component to use optimization techniques
function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Optimal");
  const [timeRange, setTimeRange] = useState('24h');
  const { darkMode } = useContext(ThemeContext);
  const [chartsInitialized, setChartsInitialized] = useState(false);
  const [metrics, setMetrics] = useState({
    ph: { value: 0, unit: 'pH', status: 'Loading', trend: 0 },
    temperature: { value: 0, unit: '°C', status: 'Loading', trend: 0 },
    turbidity: { value: 0, unit: 'NTU', status: 'Loading', trend: 0 },
    tds: { value: 0, unit: 'ppm', status: 'Loading', trend: 0 },
  });
  
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Function to calculate status and trend
  const calculateMetricStatus = (current, previous, type) => {
    let status = 'Good';
    let trend = 0;

    if (previous) {
      trend = ((current - previous) / previous) * 100;
    }

    switch (type) {
      case 'ph':
        if (current < 6.5 || current > 8.5) status = 'Critical';
        else if (current < 6.8 || current > 8.2) status = 'Warning';
        break;
      case 'temperature':
        if (current < 15 || current > 35) status = 'Critical';
        else if (current < 20 || current > 30) status = 'Warning';
        break;
      case 'turbidity':
        if (current > 5) status = 'Critical';
        else if (current > 1) status = 'Warning';
        break;
      case 'tds':
        if (current < 50 || current > 1000) status = 'Critical';
        else if (current < 100 || current > 500) status = 'Warning';
        break;
    }

    return { status, trend };
  };

  // Function to fetch and update metrics
  const fetchMetrics = async () => {
    try {
      const latestReading = await appwriteService.getLatestReading();
      const readings = await appwriteService.getReadings('24h');
      const previousReading = readings[1]; // Second most recent reading

      if (!latestReading) {
        console.error('No readings found in database');
        return;
      }

      const newMetrics = {
        ph: {
          value: latestReading.ph,
          unit: 'pH',
          ...calculateMetricStatus(latestReading.ph, previousReading?.ph, 'ph')
        },
        temperature: {
          value: latestReading.temperature,
          unit: '°C',
          ...calculateMetricStatus(latestReading.temperature, previousReading?.temperature, 'temperature')
        },
        turbidity: {
          value: latestReading.turbidity,
          unit: 'NTU',
          ...calculateMetricStatus(latestReading.turbidity, previousReading?.turbidity, 'turbidity')
        },
        tds: {
          value: latestReading.tds,
          unit: 'ppm',
          ...calculateMetricStatus(latestReading.tds, previousReading?.tds, 'tds')
        }
      };

      setMetrics(newMetrics);

      // Generate alerts based on status
      const newAlerts = [];
      Object.entries(newMetrics).forEach(([key, metric]) => {
        if (metric.status === 'Critical') {
          newAlerts.push({
            severity: 'critical',
            title: `Critical: ${key.toUpperCase()}`,
            message: `${key === 'tds' ? 'TDS' : key} levels are at critical levels: ${metric.value}${metric.unit}`,
          });
        } else if (metric.status === 'Warning') {
          newAlerts.push({
            severity: 'warning',
            title: `Warning: ${key.toUpperCase()}`,
            message: `${key === 'tds' ? 'TDS' : key} levels need attention: ${metric.value}${metric.unit}`,
          });
        }
      });
      setAlerts(newAlerts);

      // Update overall status
      if (Object.values(newMetrics).some(m => m.status === 'Critical')) {
        setStatus('Critical');
      } else if (Object.values(newMetrics).some(m => m.status === 'Warning')) {
        setStatus('Warning');
      } else {
        setStatus('Optimal');
      }

    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  // Function to fetch and update chart data
  const fetchChartData = async () => {
    try {
      const data = await appwriteService.getChartData(timeRange);
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMetrics(), fetchChartData()]);
      setLoading(false);
      setChartsInitialized(true);
    };
    loadData();
  }, []);

  // Handle time range change
  const handleTimeRangeChange = useCallback(async (range) => {
    if (range === timeRange) return;
    setLoading(true);
    setTimeRange(range);
    await fetchChartData();
    setLoading(false);
  }, [timeRange]);

  // Set up polling for real-time updates
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      await fetchMetrics();
      await fetchChartData();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(pollInterval);
  }, [timeRange]);

  // Handle manual refresh
  const handleRefresh = async () => {
    setLoading(true);
    await Promise.all([fetchMetrics(), fetchChartData()]);
    setLoading(false);
  };

  // Memoize metrics components to prevent unnecessary re-renders
  const metricCards = useMemo(() => {
    return [
      {
        title: "pH Level",
        ...metrics.ph,
        icon: WaterIcon
      },
      {
        title: "Temperature",
        ...metrics.temperature,
        icon: TempIcon
      },
      {
        title: "Turbidity",
        ...metrics.turbidity, 
        icon: TurbidityIcon
      },
      {
        title: "TDS",
        ...metrics.tds,
        icon: CircleIcon
      }
    ].map((metric, index) => (
      <motion.div
        key={metric.title}
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              duration: 0.3, // Reduced from 0.5
              delay: index * 0.05 // Reduced from 0.1
            }
          }
        }}
      >
        <MetricCard 
          title={metric.title} 
          value={metric.value} 
          unit={metric.unit} 
          status={metric.status} 
          trend={metric.trend} 
          icon={metric.icon} 
          loading={loading}
        />
      </motion.div>
    ));
  }, [metrics, loading]);

  // Set global chart defaults based on theme
  useEffect(() => {
    try {
      setGlobalChartDefaults(darkMode);
      setChartsInitialized(true);
    } catch (error) {
      console.error("Error initializing charts:", error);
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Simplified background - reduced number of animated elements */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-blueprint bg-[length:40px_40px] opacity-20"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-blue/50"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }} // Reduced from 0.6
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
      >
        {/* Hero Section */}
        <HeroSection status={status} />
        
        {/* Main content - simplified staggering animation */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05 // Reduced from 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metricCards}
        </motion.div>
        
        {/* Chart with optimized animations */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} // Reduced y offset from 20 to 10
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }} // Reduced durations
          className="mb-8"
        >
          <Suspense fallback={<ComponentLoader />}>
            {chartsInitialized ? (
              <ChartCard 
                title="Water Quality Parameters" 
                data={chartData} 
                loading={loading} 
                timeRange={timeRange} 
                onTimeRangeChange={handleTimeRangeChange} 
              />
            ) : (
              <ComponentLoader />
            )}
          </Suspense>
        </motion.div>
        
        {/* Bottom section with optimized animations */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} // Reduced y offset
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }} // Reduced durations
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Suspense fallback={<ComponentLoader />}>
            {chartsInitialized ? (
              <QualityDistributionCard />
            ) : (
              <ComponentLoader />
            )}
          </Suspense>
          <Suspense fallback={<ComponentLoader />}>
            <AlertCard alerts={alerts} />
          </Suspense>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Export a memoized version of the Dashboard to prevent unnecessary re-renders
export default React.memo(Dashboard); 