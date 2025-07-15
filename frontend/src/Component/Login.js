import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Stack } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials,
        { withCredentials: true }
      );
      if (response.status === 200 && response.data === "Login successful") {
        setSuccess("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials");
      } else {
        setError("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Login</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
              <TextField
                label="Username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                fullWidth
                required
                autoFocus
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} size="large">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Stack>
          </Box>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Button variant="text" color="secondary" onClick={() => navigate('/register')}>Register</Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
