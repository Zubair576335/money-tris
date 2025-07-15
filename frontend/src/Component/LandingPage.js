import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />, 
    title: 'Track Expenses',
    desc: 'Easily add, edit, and delete your daily expenses in a few clicks.'
  },
  {
    icon: <PieChartIcon sx={{ fontSize: 40, color: 'primary.main' }} />, 
    title: 'Visualize Spending',
    desc: 'Get insights with charts and summaries to manage your finances better.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />, 
    title: 'Secure & Private',
    desc: 'Your data is protected with industry-standard security and privacy.'
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 6 }}>
      {/* Hero Section */}
      <Box sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" color="primary" fontWeight={700} gutterBottom>
          Welcome to Our Expense Tracker
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={4}>
          Take control of your finances with powerful tools and beautiful insights.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mb={4}>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/register')}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" size="large" onClick={() => navigate('/about-us')}>
            Learn More
          </Button>
        </Stack>
      </Box>
      {/* Features Section */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              {feature.icon}
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LandingPage;
