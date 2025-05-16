import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import url from '../../url';
import { Button, TextField, Typography, Box, Paper, Alert } from '@mui/material';
import backgroundImage from '../assets/signup4.webp'; // Import your background image

export default function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const userLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userEmail || !userPassword) {
      setError('Both email and password are required.');
      return;
    }

    try {
      const res = await fetch(`${url.url}/users/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      const data = await res.json();

      if (data.status === "true") {
        localStorage.setItem("authTokens", data.authToken);
        navigate("/dashboard");
      } else {
        setError(data.msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Paper 
        elevation={3} 
        className="p-8 rounded-lg w-full max-w-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          transition: '0.3s ease', // Smooth transition for hover effect
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // Highlight color
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.4)'; // Increase shadow
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; // Original color
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; // Original shadow
        }}
      >
        <Typography variant="h4" component="h1" className="text-center font-semibold mb-6">
          Login
        </Typography>

        <form onSubmit={userLogin}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />

          {error && <Alert severity="error" className="mt-3">{error}</Alert>}

          <Box className="flex flex-col items-center">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className="mt-3 w-full transition-transform transform hover:scale-105"
            >
              Login
            </Button>
            <Link to='/signup'>
              <Button 
                type="button" 
                variant="outlined" 
                color="secondary" 
                className="mt-3 w-full transition-transform transform hover:scale-105"
              >
                Not a user?
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </div>
  );
}
