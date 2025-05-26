import React, { useState, useContext, useEffect } from 'react';
import {
  Card,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Tooltip,
  Paper,
  Box,
  Chip,
  LinearProgress,
  Grid,
  Divider,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  WaterDrop as WaterDropIcon,
  LocalDrink as LocalDrinkIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeContext } from '../App';
import { appwriteService } from '../services/appwrite';
import { format } from 'date-fns';
import { Line } from 'react-chartjs-2';

// Add custom CSS for the table row hover
const tableRowHoverStyle = {
  '&:hover': {
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    boxShadow: 'inset 0 0 8px rgba(0, 240, 255, 0.15)',
    border: '1px solid rgba(0, 240, 255, 0.1)',
  },
};

// Water quality status interpretation based on parameters
const getQualityStatus = (ph, turbidity, tds) => {
  // pH ideal range is 6.5-8.5
  const phStatus = ph >= 6.5 && ph <= 8.5 
    ? { status: 'Optimal', color: 'success' }
    : (ph >= 6.0 && ph <= 9.0 
      ? { status: 'Acceptable', color: 'warning' } 
      : { status: 'Critical', color: 'error' });

  // Turbidity ideal is < 1 NTU, acceptable < 5 NTU
  const turbidityStatus = turbidity < 1 
    ? { status: 'Optimal', color: 'success' }
    : (turbidity < 5 
      ? { status: 'Acceptable', color: 'warning' } 
      : { status: 'Critical', color: 'error' });

  // TDS ideal range is 100-500 ppm
  const tdsStatus = (tds >= 100 && tds <= 500)
    ? { status: 'Optimal', color: 'success' }
    : ((tds >= 50 && tds <= 1000)
      ? { status: 'Acceptable', color: 'warning' } 
      : { status: 'Critical', color: 'error' });

  // Overall quality
  if (phStatus.status === 'Critical' || turbidityStatus.status === 'Critical' || tdsStatus.status === 'Critical') {
    return {
      status: 'Action Required',
      color: 'error',
      icon: <WarningIcon />,
      message: 'Water quality parameters indicate potential health risks. Check filtration system.'
    };
  } else if (phStatus.status === 'Acceptable' || turbidityStatus.status === 'Acceptable' || tdsStatus.status === 'Acceptable') {
    return {
      status: 'Monitor',
      color: 'warning',
      icon: <InfoIcon />,
      message: 'Water quality is acceptable but should be monitored for changes.'
    };
  } else {
    return {
      status: 'Safe',
      color: 'success',
      icon: <CheckCircleIcon />,
      message: 'All water quality parameters are within optimal ranges.'
    };
  }
};

// Get a recommendation based on water quality parameters
const getRecommendation = (ph, turbidity, tds) => {
  let recommendations = [];
  
  if (ph < 6.5) recommendations.push('Consider alkalinity adjustment to raise pH levels.');
  if (ph > 8.5) recommendations.push('Adjust pH levels downward with appropriate treatment.');
  
  if (turbidity >= 1) recommendations.push('Check filtration system for proper operation.');
  if (turbidity >= 5) recommendations.push('Immediate filtration maintenance recommended.');
  
  if (tds < 100) recommendations.push('Water might be too soft, consider mineral addition.');
  if (tds > 500) recommendations.push('High mineral content detected, check water source and treatment system.');
  if (tds > 1000) recommendations.push('Critical: TDS levels indicate possible contamination or excessive mineral content.');
  
  return recommendations.length > 0 ? recommendations : ['Water quality parameters are optimal. Continue regular monitoring.'];
};

// Create a percentage representation for visual meters
const getPercentageValue = (value, type) => {
  switch(type) {
    case 'ph':
      // pH scale is 0-14, with 7 being neutral
      // Convert to 0-100% where 7 is 50%
      return Math.min(100, Math.max(0, (value / 14) * 100));
    case 'turbidity':
      // Lower is better, 0-10 NTU scale
      return Math.min(100, Math.max(0, 100 - (value / 10) * 100));
    case 'tds':
      // Optimal range is 100-500 ppm, scale 0-2000
      return Math.min(100, Math.max(0, (value / 2000) * 100));
    default:
      return 50;
  }
};

// Return color for quality meters
const getQualityColor = (value, type) => {
  switch(type) {
    case 'ph':
      return (value >= 6.5 && value <= 8.5) ? '#00ff94' : (value >= 6.0 && value <= 9.0) ? '#ffdd00' : '#ff00c8';
    case 'turbidity':
      return value < 1 ? '#00ff94' : value < 5 ? '#ffdd00' : '#ff00c8';
    case 'tds':
      return (value >= 100 && value <= 500) ? '#00ff94' : (value >= 50 && value <= 1000) ? '#ffdd00' : '#ff00c8';
    default:
      return '#00f0ff';
  }
};

function History() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [readings, setReadings] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [filteredData, setFilteredData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await appwriteService.getReadings(timeRange);
      setReadings(data);
      const chartData = await appwriteService.getChartData(timeRange);
      setChartData(chartData);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Handle search/filter
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(readings);
      return;
    }

    const filtered = readings.filter(item => 
      item.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ph.toString().includes(searchTerm) ||
      item.temperature.toString().includes(searchTerm) ||
      item.turbidity.toString().includes(searchTerm) ||
      item.tds.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  // Handle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
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
      {/* Header */}
      <div className={`rounded-2xl p-6 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400' : 'bg-gradient-to-br from-blue-400 to-blue-500'}`}>
        <div className={`absolute inset-0 ${darkMode ? 'bg-white/10' : 'bg-white/30'} backdrop-blur-sm`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="relative">
          <Typography variant="h4" className="font-display font-bold mb-1 text-white">
            Water Quality History
          </Typography>
          <Typography variant="body2" className="text-white/80 mt-2">
            Monitor water quality parameters and receive actionable insights
          </Typography>
        </div>
      </div>

      {/* Summary Metrics - Mobile View: Hide on desktop, show stacked on mobile */}
      <Box sx={{ display: { md: 'none', xs: 'block' } }}>
        <Grid container spacing={2}>
          {['pH', 'Turbidity', 'TDS'].map((param, index) => (
            <Grid item xs={4} key={index}>
              <Card className={`p-3 glass-panel ${darkMode ? '' : 'border border-gray-200'}`}>
                <Typography variant="body2" className="text-center text-neon-blue font-bold mb-1">
                  {param}
                </Typography>
                <Typography variant="h6" className="text-center">
                  {param === 'pH' ? '7.3' : param === 'Turbidity' ? '2.1 NTU' : '350 ppm'}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main Content */}
      <Card className={`p-4 glass-panel ${darkMode ? '' : 'border border-gray-200 shadow-sm'}`}>
        {/* Controls Row */}
        <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          {/* Time Range Selector */}
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Time Range"
            >
              <MenuItem value="1h">Last Hour</MenuItem>
              <MenuItem value="24h">Last 24 Hours</MenuItem>
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
            </Select>
          </FormControl>

          {/* Search and Actions */}
          <div className="flex items-center gap-2">
            <TextField
              size="small"
              placeholder="Search..."
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-gray-400" fontSize="small" />
                  </InputAdornment>
                ),
              }}
              className="w-40"
              variant="outlined"
            />
            
            <Tooltip title="Export data">
              <IconButton onClick={handleExport} size="small">
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Refresh data">
              <IconButton onClick={handleRefresh} size="small">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </Box>

        {/* Expandable Filters */}
        <Box className="mb-4">
          <Button 
            onClick={() => setExpandedFilters(!expandedFilters)}
            variant="text"
            size="small"
            endIcon={expandedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            className="mb-2 text-neon-blue"
          >
            {expandedFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
          <Collapse in={expandedFilters}>
            <Paper className={`p-3 mb-3 border rounded-lg ${darkMode ? 'bg-black/30 border-white/10' : 'bg-white/90 border-gray-200'}`}>
              <Typography variant="subtitle2" className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Date Range
              </Typography>
              <div className="flex flex-wrap gap-3 mb-2">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  slotProps={{ textField: { size: 'small' } }}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </div>
            </Paper>
          </Collapse>
        </Box>

        {/* Results Count */}
        <Typography variant="body2" className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {filteredData.length} records
        </Typography>

        {/* Data Table */}
        <TableContainer component={Paper} className={`mb-3 ${darkMode ? 'bg-transparent' : 'bg-white'}`}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Parameters</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Quality</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(0, 10).map((row) => {
                const qualityStatus = getQualityStatus(row.ph, row.turbidity, row.tds);
                const recommendations = getRecommendation(row.ph, row.turbidity, row.tds);
                const isExpanded = expandedRow === row.id;
                
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      sx={tableRowHoverStyle}
                      className="transition-all duration-200"
                      onClick={() => toggleRowExpansion(row.id)}
                    >
                      <TableCell>
                        <Typography variant="body2">{row.timestamp}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {row.temperature}°C
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Box className="flex gap-2 flex-wrap">
                          <Chip 
                            size="small" 
                            label={`pH: ${row.ph}`} 
                            color={row.ph >= 6.5 && row.ph <= 8.5 ? "success" : "warning"}
                            variant="outlined"
                          />
                          <Chip 
                            size="small" 
                            label={`${row.turbidity} NTU`} 
                            color={row.turbidity < 1 ? "success" : "warning"}
                            variant="outlined"
                          />
                          <Chip 
                            size="small" 
                            label={`${row.tds} ppm`} 
                            color={row.tds >= 100 && row.tds <= 500 ? "success" : "warning"}
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                        <Box className="flex items-center gap-1">
                          {qualityStatus.icon}
                          <Typography variant="body2" color={`${qualityStatus.color}.main`}>
                            {qualityStatus.status}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell>
                        <Box className="flex items-center">
                          <Chip 
                            icon={qualityStatus.icon} 
                            label={qualityStatus.status}
                            size="small"
                            color={qualityStatus.color}
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                          />
                          <IconButton size="small" sx={{ ml: 'auto' }}>
                            {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded Row Details */}
                    <TableRow>
                      <TableCell 
                        colSpan={4} 
                        style={{ paddingTop: 0, paddingBottom: 0, border: 0 }}
                      >
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box className={`py-3 px-4 my-2 rounded-lg border ${darkMode ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                            <Typography variant="subtitle2" className="mb-2 text-neon-blue">
                              Recommended Actions
                            </Typography>
                            <ul className="list-disc pl-4 text-sm">
                              {recommendations.map((rec, idx) => (
                                <li key={idx} className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{rec}</li>
                              ))}
                            </ul>
                            
                            <Divider className={`my-2 ${darkMode ? 'opacity-20' : 'opacity-50'}`} />
                            
                            <Typography variant="subtitle2" className="mb-2 text-neon-blue">
                              Assessment
                            </Typography>
                            <Typography variant="body2" className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {qualityStatus.message}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination Info */}
        <Box className="text-center mt-3">
          <Typography variant="caption" className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Showing 1-10 of {filteredData.length} records
          </Typography>
          {filteredData.length > 10 && (
            <Typography variant="caption" className="block mt-1 text-neon-blue cursor-pointer">
              Load more results
            </Typography>
          )}
        </Box>
      </Card>

      <Card className="p-6 glass-panel">
        <Typography variant="h6" className="font-display font-bold text-gray-900 dark:text-white mb-6">
          Sensor Readings Over Time
        </Typography>
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
          height={300}
        />
      </Card>

      <Card className="p-6 glass-panel">
        <Typography variant="h6" className="font-display font-bold text-gray-900 dark:text-white mb-6">
          Detailed Readings
        </Typography>
        <TableContainer component={Paper} className="bg-transparent">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell align="right">pH</TableCell>
                <TableCell align="right">Temperature (°C)</TableCell>
                <TableCell align="right">Turbidity (NTU)</TableCell>
                <TableCell align="right">TDS (ppm)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {readings.map((reading) => (
                <TableRow key={reading.$id}>
                  <TableCell>
                    {format(new Date(reading.$createdAt), 'MMM d, yyyy HH:mm:ss')}
                  </TableCell>
                  <TableCell align="right">{reading.ph.toFixed(2)}</TableCell>
                  <TableCell align="right">{reading.temperature.toFixed(1)}</TableCell>
                  <TableCell align="right">{reading.turbidity.toFixed(2)}</TableCell>
                  <TableCell align="right">{reading.tds.toFixed(0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}

export default History; 