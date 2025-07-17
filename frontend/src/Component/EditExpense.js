import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Stack, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

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
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const userId = localStorage.getItem('userId') || 1;
      const response = await axios.get(`/api/categories?userId=${userId}`);
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories.');
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
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
        setSuccess('Category updated!');
        setOpenEditCategory(false);
        fetchCategories();
      } else {
        setError('Failed to update category.');
      }
    } catch {
      setError('Network error.');
    }
  };
  const handleDeleteCategoryConfirm = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`/api/categories/${deleteCategoryId}?userId=${userId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSuccess('Category deleted!');
        setOpenDeleteCategory(false);
        fetchCategories();
        if (expense.categoryId === deleteCategoryId) setExpense({ ...expense, categoryId: '' });
      } else {
        setError('Failed to delete category.');
      }
    } catch {
      setError('Network error.');
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
                    <MenuItem key={cat.id} value={cat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{cat.name}</span>
                      <span>
                        <IconButton size="small" onClick={e => { e.stopPropagation(); handleEditCategory(cat); }}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" onClick={e => { e.stopPropagation(); handleDeleteCategory(cat); }}><DeleteIcon fontSize="small" /></IconButton>
                      </span>
                    </MenuItem>
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
    </Box>
  );
};

export default EditExpense;
