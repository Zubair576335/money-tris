import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Finance Tracker
        </Typography>
        {isLoggedIn ? (
          <Box>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/add-expense">Add Expense</Button>
            <Button color="inherit" component={Link} to="/budgets">Budgets</Button>
            <Button color="inherit" component={Link} to="/expense-list">Expenses</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 