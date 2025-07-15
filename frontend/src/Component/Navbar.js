import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import profileImage from "../Images/images.jpg";

const Navbar = () => {
  const handleLogout = () => {
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <AppBar position="fixed" color="primary" elevation={2}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={profileImage} alt="Profile" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Expense Tracker
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={handleLogout} size="large">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
