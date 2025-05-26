import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Rating,
  Typography,
} from '@mui/material';
import { Feedback as FeedbackIcon } from '@mui/icons-material';

export default function FeedbackForm({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus({ type: 'success', message: 'Thank you for your feedback!' });
    setLoading(false);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setStatus(null);
      setFormData({ name: '', email: '', message: '', rating: 0 });
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FeedbackIcon color="primary" />
        Provide Feedback
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {status && (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.message}
            </Alert>
          )}
          <Box sx={{ mb: 3 }}>
            <Typography component="legend">Rate your experience</Typography>
            <Rating
              value={formData.rating}
              onChange={(event, newValue) => {
                setFormData(prev => ({ ...prev, rating: newValue }));
              }}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            margin="dense"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 