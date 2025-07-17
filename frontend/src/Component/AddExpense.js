import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddExpense = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`/api/categories?userId=${userId}`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setCategories([]);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !category || !date) {
      setSnackbar({ open: true, message: 'All fields are required.', severity: 'error' });
      return;
    }
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch('/api/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          categoryId: category,
          date,
          userId
        })
      });
      if (res.ok) {
        setSnackbar({ open: true, message: 'Expense added!', severity: 'success' });
        setAmount('');
        setCategory('');
        setDate('');
        if (onExpenseAdded) onExpenseAdded();
      } else {
        setSnackbar({ open: true, message: 'Failed to add expense.', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Network error.', severity: 'error' });
    }
  };

  const handleAddCategory = async () => {
    const userId = localStorage.getItem('userId');
    if (!newCategory) return;
    try {
      const res = await fetch(`/api/categories?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory })
      });
      if (res.ok) {
        setSnackbar({ open: true, message: 'Category added!', severity: 'success' });
        setNewCategory('');
        setOpenAddCategory(false);
        fetchCategories();
      } else {
        setSnackbar({ open: true, message: 'Failed to add category.', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Network error.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h5" gutterBottom>Add Expense</Typography>
      <form onSubmit={handleAddExpense}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={e => setCategory(e.target.value)}
            endAdornment={
              <Button size="small" onClick={() => setOpenAddCategory(true)}><AddIcon fontSize="small" /></Button>
            }
          >
            {Array.isArray(categories) && categories.length === 0 && (
              <MenuItem value="" disabled>No categories. Add one!</MenuItem>
            )}
            {Array.isArray(categories) && categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
            <MenuItem value="add_new" onClick={() => setOpenAddCategory(true)}>
              <AddIcon fontSize="small" /> Add Category
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add Expense</Button>
      </form>

      {/* Add Category Dialog */}
      <Dialog open={openAddCategory} onClose={() => setOpenAddCategory(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCategory(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddExpense;