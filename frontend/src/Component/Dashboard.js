import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Button, Stack, Avatar, CircularProgress, Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PieChartIcon from '@mui/icons-material/PieChart';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError("");
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/expenses/summary?userId=${userId}`);
        setSummary(response.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, px: { xs: 2, md: 6 }, bgcolor: 'background.default' }}>
      <Typography variant="h4" fontWeight={700} mb={2} color="primary">
        Welcome to your Dashboard!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Manage your expenses effectively and gain insights into your spending habits.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
      ) : summary && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={4}>
            <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <MonetizationOnIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Expenses</Typography>
                <Typography variant="h6" fontWeight={700}>₹{summary.totalExpenses}</Typography>
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
                <Typography variant="h6" fontWeight={700}>{summary.categories}</Typography>
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
                <Typography variant="h6" fontWeight={700}>{summary.recentActivity} expenses</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

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
