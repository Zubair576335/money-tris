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
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const BudgetManager = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [year, setYear] = useState(new Date().getFullYear());
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  const fetchBudgets = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`/api/budgets?userId=${userId}`);
      const data = await res.json();
      setBudgets(Array.isArray(data) ? data : []);
    } catch {
      setBudgets([]);
    }
  };

  const fetchCategories = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`/api/categories?userId=${userId}`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    if (!amount || !category || !month || !year || isNaN(amount) || isNaN(month) || isNaN(year)) {
      setSnackbar({ open: true, message: 'All fields are required and must be valid.', severity: 'error' });
      return;
    }
    const userId = localStorage.getItem('userId');
    try {
      // Debug: log what is being sent
      // console.log({ amount: parseFloat(amount), categoryId: category, month, year });
      const res = await fetch(`/api/budgets?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          categoryId: Number(category),
          month: Number(month),
          year: Number(year)
        })
      });
      if (res.ok) {
        setSnackbar({ open: true, message: 'Budget added!', severity: 'success' });
        setAmount('');
        setCategory('');
        fetchBudgets();
      } else {
        const msg = await res.text();
        setSnackbar({ open: true, message: msg || 'Failed to add budget.', severity: 'error' });
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
    if (!editCategoryName) return;
    try {
      const res = await fetch(`/api/categories/${editCategoryId}?userId=${userId}`, {
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
    try {
      const res = await fetch(`/api/categories/${deleteCategoryId}?userId=${userId}`, {
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
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h5" gutterBottom>Manage Budgets</Typography>
      <form onSubmit={handleAddBudget}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl fullWidth required>
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
            label="Budget Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Month"
            type="number"
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
            fullWidth
            required
            inputProps={{ min: 1, max: 12 }}
          />
          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            fullWidth
            required
            inputProps={{ min: 2000, max: 2100 }}
          />
          <Button type="submit" variant="contained" color="primary">Add</Button>
        </Box>
      </form>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(budgets) && budgets.map(budget => (
              <TableRow key={budget.id}>
                <TableCell>{budget.categoryName || budget.category?.name}</TableCell>
                <TableCell>{budget.amount}</TableCell>
              </TableRow>
            ))}
            {budgets.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">No budgets set.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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

export default BudgetManager; 