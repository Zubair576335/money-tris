
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const AddExpense = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const userId = localStorage.getItem('userId');
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/categories?userId=${userId}`);
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
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/expenses/add`, {
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
    const API_URL = process.env.REACT_APP_API_URL;
    if (!newCategory) return;
    try {
      const res = await fetch(`${API_URL}/api/categories?userId=${userId}`, {
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

  const handleEditCategory = (cat) => {
    setEditCategoryId(cat.id);
    setEditCategoryName(cat.name);
    setOpenEditCategory(true);
  };
  const handleDeleteCategory = (cat) => {
    setDeleteCategoryId(cat.id);
    setOpenDeleteCategory(true);
  };
  const handleEditCategorySubmit = async () => {
    const userId = localStorage.getItem('userId');
    const API_URL = process.env.REACT_APP_API_URL;
    if (!editCategoryName) return;
    try {
      const res = await fetch(`${API_URL}/api/categories/${editCategoryId}?userId=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editCategoryName })
      });
      if (res.ok) {
        setSnackbar({ open: true, message: 'Category updated!', severity: 'success' });
        setOpenEditCategory(false);
        fetchCategories();
      } else {
        setSnackbar({ open: true, message: 'Failed to update category.', severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Network error.', severity: 'error' });
    }
  };
  const handleDeleteCategoryConfirm = async () => {
    const userId = localStorage.getItem('userId');
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/categories/${deleteCategoryId}?userId=${userId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSnackbar({ open: true, message: 'Category deleted!', severity: 'success' });
        setOpenDeleteCategory(false);
        fetchCategories();
        if (category === deleteCategoryId) setCategory('');
      } else {
        setSnackbar({ open: true, message: 'Failed to delete category.', severity: 'error' });
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
              <MenuItem key={cat.id} value={cat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{cat.name}</span>
                <span>
                  <IconButton size="small" onClick={e => { e.stopPropagation(); handleEditCategory(cat); }}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={e => { e.stopPropagation(); handleDeleteCategory(cat); }}><DeleteIcon fontSize="small" /></IconButton>
                </span>
              </MenuItem>
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

      {/* Edit Category Dialog */}
      <Dialog open={openEditCategory} onClose={() => setOpenEditCategory(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={editCategoryName}
            onChange={e => setEditCategoryName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditCategory(false)}>Cancel</Button>
          <Button onClick={handleEditCategorySubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Category Dialog */}
      <Dialog open={openDeleteCategory} onClose={() => setOpenDeleteCategory(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteCategory(false)}>Cancel</Button>
          <Button onClick={handleDeleteCategoryConfirm} variant="contained" color="error">Delete</Button>
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