import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Button, Stack, Avatar, CircularProgress, Alert, LinearProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PieChartIcon from '@mui/icons-material/PieChart';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [budgetVsSpent, setBudgetVsSpent] = useState([]);
  const [budgetLoading, setBudgetLoading] = useState(true);
  const [budgetError, setBudgetError] = useState('');
  const [categoryPieData, setCategoryPieData] = useState([]);

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

  useEffect(() => {
    const fetchBudgetVsSpent = async () => {
      setBudgetLoading(true);
      setBudgetError('');
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`/api/expenses/budget-vs-spent?userId=${userId}`);
        setBudgetVsSpent(res.data);
      } catch (err) {
        setBudgetError('Failed to load budget vs spent data.');
      } finally {
        setBudgetLoading(false);
      }
    };
    fetchBudgetVsSpent();
  }, []);

  useEffect(() => {
    const fetchCategoryPieData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`/api/expenses/budget-vs-spent?userId=${userId}`);
        // Only include categories with spent > 0
        const data = res.data.filter(row => row.spent > 0).map(row => ({ name: row.categoryName, value: row.spent }));
        setCategoryPieData(data);
      } catch {}
    };
    fetchCategoryPieData();
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

      {/* Expense Overview Pie Chart */}
      <Card elevation={2} sx={{ p: 4, mt: 2, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Expense Overview</Typography>
        {categoryPieData.length === 0 ? (
          <Alert severity="info">No expenses to display for this month.</Alert>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {categoryPieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28', '#FF8042'][idx % 7]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Budget vs Spent Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} mb={2} color="primary">Budgets vs. Expenses (This Month)</Typography>
        {budgetLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : budgetError ? (
          <Alert severity="error">{budgetError}</Alert>
        ) : budgetVsSpent.length === 0 ? (
          <Alert severity="info">No budget or expense data for this month.</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Budget</b></TableCell>
                  <TableCell><b>Spent</b></TableCell>
                  <TableCell><b>Progress</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgetVsSpent.map((row) => {
                  const percent = row.budget ? Math.min(100, (row.spent / row.budget) * 100) : 0;
                  return (
                    <TableRow key={row.categoryId} hover>
                      <TableCell>{row.categoryName}</TableCell>
                      <TableCell>{row.budget != null ? `₹${row.budget}` : <i>No budget</i>}</TableCell>
                      <TableCell>{`₹${row.spent}`}</TableCell>
                      <TableCell sx={{ minWidth: 120 }}>
                        {row.budget ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress variant="determinate" value={percent} sx={{ flex: 1, height: 8, borderRadius: 5 }} color={percent >= 100 ? 'error' : percent >= 90 ? 'warning' : 'primary'} />
                            <Typography variant="body2" sx={{ minWidth: 36 }}>{Math.round(percent)}%</Typography>
                          </Box>
                        ) : <i>-</i>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
