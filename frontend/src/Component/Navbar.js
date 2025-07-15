import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, IconButton, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import profileImage from "../Images/images.jpg";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <AppBar position="fixed" color="primary" elevation={2}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <Avatar src={profileImage} alt="Profile" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Expense Tracker
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/expense-list')}>Expense List</Button>
          <Button color="inherit" onClick={() => navigate('/add-expense')}>Add Expense</Button>
          <Button color="inherit" onClick={() => navigate('/budgets')}>Budgets</Button>
          <Button color="inherit" onClick={() => navigate('/about-us')}>About Us</Button>
          <IconButton color="inherit" onClick={handleLogout} size="large">
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
