import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Button, Stack, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PieChartIcon from '@mui/icons-material/PieChart';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Dashboard = () => {
  const navigate = useNavigate();

  // Placeholder data for summary cards
  const totalExpenses = 12345;
  const categories = 5;
  const recentActivity = 8;

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, px: { xs: 2, md: 6 }, bgcolor: 'background.default' }}>
      {/* Welcome Section */}
      <Typography variant="h4" fontWeight={700} mb={2} color="primary">
        Welcome to your Dashboard!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Manage your expenses effectively and gain insights into your spending habits.
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <MonetizationOnIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Total Expenses</Typography>
              <Typography variant="h6" fontWeight={700}>₹{totalExpenses}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
              <CategoryIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Categories</Typography>
              <Typography variant="h6" fontWeight={700}>{categories}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
              <ListAltIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Recent Activity</Typography>
              <Typography variant="h6" fontWeight={700}>{recentActivity} expenses</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate("/add-expense")}
        >
          Add Expense
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<ListAltIcon />}
          onClick={() => navigate("/expense-list")}
        >
          Expense List
        </Button>
      </Stack>

      {/* Chart Placeholder */}
      <Card elevation={2} sx={{ p: 4, mt: 2, textAlign: 'center' }}>
        <PieChartIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
        <Typography variant="h6" fontWeight={600} mb={1}>Expense Overview (Coming Soon)</Typography>
        <Typography color="text.secondary">Visualize your spending with interactive charts and graphs.</Typography>
      </Card>
    </Box>
  );
};

export default Dashboard;
