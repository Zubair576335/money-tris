import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Stack } from '@mui/material';

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenseDetails();
    // eslint-disable-next-line
  }, []);

  const fetchExpenseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/expenses/${id}`);
      setExpense(response.data);
    } catch (error) {
      setError("Error fetching expense details.");
    }
  };

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/expenses/update/${id}`, expense);
      setSuccess("Expense updated successfully!");
      setTimeout(() => {
        navigate("/expense-list");
      }, 1000);
    } catch (error) {
      setError("Failed to update expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ maxWidth: 450, width: '100%', p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Edit Expense</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
              <TextField
                label="Category"
                name="category"
                value={expense.category}
                onChange={handleChange}
                fullWidth
                required
                autoFocus
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={expense.amount}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={expense.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} size="large">
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button type="button" variant="outlined" color="secondary" fullWidth onClick={() => navigate("/expense-list")}>Cancel</Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditExpense;
