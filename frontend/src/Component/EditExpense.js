import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Stack, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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

  const userId = 1; // Replace with real user ID from auth context/localStorage in production
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchExpenseDetails();
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/categories?userId=${userId}`);
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
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
      await axios.put(`http://localhost:8080/api/expenses/update/${id}`, {
        amount: expense.amount,
        categoryId: expense.categoryId || expense.category || '',
        date: expense.date,
      });
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
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  value={expense.categoryId || expense.category}
                  onChange={(e) => setExpense({ ...expense, categoryId: e.target.value })}
                  disabled={categories.length === 0}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {categories.length === 0 && (
                <Alert severity="warning">No categories found. Please add a category first.</Alert>
              )}
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
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || !(expense.categoryId || expense.category)} size="large">
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
