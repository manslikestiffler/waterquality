import { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Grid,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  WaterDrop as WaterIcon,
  Thermostat as TempIcon,
  Opacity as TurbidityIcon,
  Science as TdsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Alert as AlertIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { appwriteService } from '../services/appwrite';

const MetricCard = ({ title, value, unit, status, trend, icon: Icon, color }) => (
  <Card className="p-6 glass-panel group hover:shadow-xl transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className={`
            p-2 rounded-xl transition-all duration-300 group-hover:scale-110
            ${color === 'primary' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' :
              color === 'warning' ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
              color === 'error' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
              'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}
          `}>
            <Icon />
          </div>
          <Typography variant="subtitle1" className="font-display font-bold text-gray-900 dark:text-white">
            {title}
          </Typography>
        </div>

        <Typography variant="h3" className="font-display font-bold text-gray-900 dark:text-white mb-1">
          {value}
          <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-1">
            {unit}
          </span>
        </Typography>

        <div className="flex items-center gap-2">
          <span className={`
            inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium
            ${status === 'Good' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              status === 'Warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}
          `}>
            {status}
          </span>

          <div className={`
            flex items-center gap-1 text-sm
            ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
          `}>
            {trend > 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  </Card>
);

function WaterQuality() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
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

  // Function to fetch and update data
  const fetchData = async () => {
    try {
      const latestReading = await appwriteService.getLatestReading();
      const readings = await appwriteService.getReadings('24h');
      const previousReading = readings[1]; // Second most recent reading

      if (!latestReading) {
        console.error('No readings found in database');
        return;
      }

      // Update metrics
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

      // Generate alerts
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

      // Update chart data
      const data = await appwriteService.getChartData('24h');
      setChartData(data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    loadData();
  }, []);

  // Set up polling for real-time updates
  useEffect(() => {
    const pollInterval = setInterval(fetchData, 30000); // Poll every 30 seconds
    return () => clearInterval(pollInterval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="relative flex justify-between items-start">
          <div>
            <Typography variant="h3" className="font-display font-bold mb-2">
              Water Quality
            </Typography>
            <Typography variant="body1" className="text-white/80">
              Real-time monitoring and analysis
            </Typography>
          </div>
          <Tooltip title="Refresh data">
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-white hover:text-white/80"
            >
              <RefreshIcon className={refreshing ? 'animate-spin' : ''} />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="pH Level"
            value={metrics.ph.value.toFixed(2)}
            unit={metrics.ph.unit}
            status={metrics.ph.status}
            trend={metrics.ph.trend}
            icon={WaterIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Temperature"
            value={metrics.temperature.value.toFixed(1)}
            unit={metrics.temperature.unit}
            status={metrics.temperature.status}
            trend={metrics.temperature.trend}
            icon={TempIcon}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Turbidity"
            value={metrics.turbidity.value.toFixed(2)}
            unit={metrics.turbidity.unit}
            status={metrics.turbidity.status}
            trend={metrics.turbidity.trend}
            icon={TurbidityIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="TDS"
            value={metrics.tds.value.toFixed(0)}
            unit={metrics.tds.unit}
            status={metrics.tds.status}
            trend={metrics.tds.trend}
            icon={TdsIcon}
            color="error"
          />
        </Grid>
      </Grid>

      <Card className="p-6 glass-panel">
        <Typography variant="h6" className="font-display font-bold text-gray-900 dark:text-white mb-6">
          24-Hour Trends
        </Typography>
        <Box sx={{ height: 400 }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </Box>
      </Card>

      <Card className="p-6 glass-panel">
        <Typography variant="h6" className="font-display font-bold text-gray-900 dark:text-white mb-6">
          Recent Alerts
        </Typography>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-xl flex items-start gap-4
                ${alert.severity === 'critical' ? 'bg-red-50 dark:bg-red-900/20' : 
                  'bg-yellow-50 dark:bg-yellow-900/20'}
              `}
            >
              <div className={`
                p-2 rounded-xl
                ${alert.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/40' : 
                  'bg-yellow-100 dark:bg-yellow-900/40'}
              `}>
                {alert.severity === 'critical' ? 
                  <AlertIcon className="text-red-600 dark:text-red-400" /> : 
                  <WarningIcon className="text-yellow-600 dark:text-yellow-400" />
                }
              </div>
              <div>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 dark:text-white">
                  {alert.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                  {alert.message}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default WaterQuality; 