import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Stack, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = 1; // Replace with real user ID from auth context/localStorage in production
  const [categories, setCategories] = useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/categories?userId=${userId}`);
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const expenseData = { amount, categoryId: category, date };
    try {
      const response = await axios.post("http://localhost:8080/api/expenses/add", expenseData);
      if (response.status === 201) {
        setSuccess("Expense added successfully!");
        setTimeout(() => {
          navigate("/expense-list");
        }, 1000);
      } else {
        setError("Failed to add expense. Please try again.");
      }
    } catch (error) {
      setError("Error adding expense. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ maxWidth: 450, width: '100%', p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Add Expense</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                required
                autoFocus
              />
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || !category} size="large">
                {loading ? 'Adding...' : 'Add Expense'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddExpense;
