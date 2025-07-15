import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Card, CardContent, Typography, Button, TextField, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth() + 1;

const BudgetManager = () => {
  // For demo, use a fixed userId. In real app, get from auth context or localStorage
  const userId = 1;
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ categoryId: "", amount: "", month: getCurrentMonth(), year: getCurrentYear() });
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchBudgets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:8080/api/budgets?userId=${userId}`);
      setBudgets(response.data);
    } catch (err) {
      setError("Failed to load budgets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
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

  const handleDialogOpen = (budget) => {
    if (budget) {
      setEditMode(true);
      setEditId(budget.id);
      setForm({ categoryId: budget.categoryId, amount: budget.amount, month: budget.month, year: budget.year });
    } else {
      setEditMode(false);
      setEditId(null);
      setForm({ categoryId: '', amount: '', month: getCurrentMonth(), year: getCurrentYear() });
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setError("");
    setSuccess("");
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.categoryId || !form.amount || !form.month || !form.year) {
      setError("All fields are required.");
      return;
    }
    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/api/budgets/${editId}`, { ...form });
        setSuccess("Budget updated successfully!");
      } else {
        await axios.post(`http://localhost:8080/api/budgets?userId=${userId}`, { ...form });
        setSuccess("Budget added successfully!");
      }
      fetchBudgets();
      setTimeout(() => { handleDialogClose(); }, 1000);
    } catch (err) {
      setError("Failed to save budget.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/budgets/${id}`);
      setSuccess("Budget deleted successfully!");
      fetchBudgets();
    } catch (err) {
      setError("Failed to delete budget.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, px: { xs: 1, md: 6 }, bgcolor: 'background.default' }}>
      <Card elevation={3} sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight={700} color="primary">Budgets</Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleDialogOpen(null)}>
              Add Budget
            </Button>
          </Stack>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Amount</b></TableCell>
                  <TableCell><b>Month</b></TableCell>
                  <TableCell><b>Year</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography color="text.secondary" fontStyle="italic" py={3}>No budgets found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  budgets.map((budget) => (
                    <TableRow key={budget.id} hover>
                      <TableCell>{budget.categoryName}</TableCell>
                      <TableCell>₹{budget.amount}</TableCell>
                      <TableCell>{budget.month}</TableCell>
                      <TableCell>{budget.year}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleDialogOpen(budget)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(budget.id)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editMode ? "Edit Budget" : "Add Budget"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="categoryId"
                value={form.categoryId}
                onChange={handleFormChange}
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
              value={form.amount}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Month</InputLabel>
              <Select
                label="Month"
                name="month"
                value={form.month}
                onChange={handleFormChange}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Year"
              name="year"
              type="number"
              value={form.year}
              onChange={handleFormChange}
              fullWidth
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained" disabled={!form.categoryId}>
            {editMode ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetManager; 