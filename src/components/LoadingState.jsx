import { Box, Skeleton, Paper } from '@mui/material';

export function MetricCardSkeleton() {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="text" width="40%" height={48} sx={{ my: 1 }} />
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="text" width="80%" sx={{ mt: 2 }} />
    </Paper>
  );
}

export function ChartSkeleton() {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={300} />
    </Paper>
  );
}

export function TableSkeleton() {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width="100%" height={52} />
      </Box>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} variant="text" width="100%" height={52} />
      ))}
    </Paper>
  );
} 