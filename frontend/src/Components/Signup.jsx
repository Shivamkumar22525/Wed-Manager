import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import url from '../../url';
import { Button, TextField, Typography, Box, Paper, Alert } from '@mui/material';
import backgroundImage from '../assets/signup4.webp'; // Add your background image

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [hovered, setHovered] = useState(false);

    const userAdd = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        try {
            const res = await fetch(`${url.url}/users/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            if (data.status === "success") {
                navigate("/login");
            } else {
                setError(data.msg);
            }
        } catch (error) {
            setError("An error occurred while signing up. Please try again.");
        }
    }

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
                    backgroundColor: hovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.9)',
                    boxShadow: hovered ? '0 12px 24px rgba(0, 0, 0, 0.4)' : '0 8px 16px rgba(0, 0, 0, 0.2)',
                    transition: '0.3s ease', // Smooth transition for hover effect
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Typography variant="h4" component="h1" className="text-center font-semibold mb-6">
                    Signup
                </Typography>

                {error && <Alert severity="error" className="mb-3">{error}</Alert>}

                <form onSubmit={userAdd}>
                    <TextField
                        label="Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Box className="flex flex-col items-center">
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className="mt-3 w-full transition-transform transform hover:scale-105"
                        >
                            Signup
                        </Button>
                        <Link to='/login'>
                            <Button 
                                type="button" 
                                variant="outlined" 
                                color="secondary" 
                                className="mt-3 w-full transition-transform transform hover:scale-105"
                            >
                                Already a user?
                            </Button>
                        </Link>
                    </Box>
                </form>
            </Paper>
        </div>
    );
}
