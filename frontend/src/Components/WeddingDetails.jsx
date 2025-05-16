// WeddingDetail.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, Button, Typography, Container, Paper, FormControl, InputLabel } from '@mui/material';
import url from '../../url';

export default function WeddingDetail() {
    const navigate = useNavigate();

    const [weddingDetails, setWeddingDetails] = useState({
        name: "", 
        gender: "Groom", 
        Your_Partners_First_Name: "", 
        Budget: 0, 
        Date: "", 
        Location: "", 
        Guests: 0,
        Invited_Guests: 0 
    });

    const chngValues = (e) => {
        const { name, value } = e.target;
        setWeddingDetails({ ...weddingDetails, [name]: value });
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function updateValues(e) {
        e.preventDefault();
        const id = localStorage.getItem("authTokens");
        if (!id) {
            alert("User not authenticated");
            return;
        }

        try {
            const res = await fetch(`${url.url}/users/update`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userData: weddingDetails,
                    id: id
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            if (data.status === 'success') {
                navigate("/dashboard");
            } else {
                alert("Error updating wedding details");
            }
        } catch (error) {
            alert("An error occurred while updating details.");
        }
    }

    async function fetchData() {
        const id = localStorage.getItem("authTokens");
        if (!id) {
            alert("User not authenticated");
            return;
        }

        try {
            const res = await fetch(`${url.url}/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const user = await res.json();
            const formattedDate = new Date(user.user.Date).toISOString().split('T')[0];
            setWeddingDetails({ ...user.user, Date: formattedDate });
        } catch (error) {
            alert("An error occurred while fetching details.");
        }
    }

    return (
        <>
            <Navbar />
            <Container
                className="flex items-center justify-center min-h-screen bg-gray-50"
                maxWidth="xl"
            >
                <Paper
                    elevation={4}
                    style={{
                        padding: '32px',
                        width: '100%',
                        maxWidth: '600px',
                        margin: '20px',
                        borderRadius: '12px'
                    }}
                    className="bg-white shadow-lg"
                >
                    <Typography variant="h4" className="font-semibold text-center mb-6 text-gray-800">
                        Wedding Details
                    </Typography>
                    <form id="details" onSubmit={updateValues} className="flex flex-col space-y-4">
                        <TextField
                            label="Your Name"
                            name="name"
                            value={weddingDetails.name}
                            onChange={chngValues}
                            fullWidth
                            required
                            onMouseOver={(e) => e.target.style.borderColor = '#1976d2'}
                            onMouseOut={(e) => e.target.style.borderColor = ''}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                name="gender"
                                value={weddingDetails.gender}
                                onChange={chngValues}
                                required
                                onMouseOver={(e) => e.target.style.borderColor = '#1976d2'}
                                onMouseOut={(e) => e.target.style.borderColor = ''}
                            >
                                <MenuItem value="Groom">Groom</MenuItem>
                                <MenuItem value="Bride">Bride</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Your Partner's Name"
                            name="Your_Partners_First_Name"
                            value={weddingDetails.Your_Partners_First_Name}
                            onChange={chngValues}
                            fullWidth
                            required
                            onMouseOver={(e) => e.target.style.borderColor = '#1976d2'}
                            onMouseOut={(e) => e.target.style.borderColor = ''}
                        />

                        <TextField
                            label="Estimated Budget"
                            type="number"
                            name="Budget"
                            value={weddingDetails.Budget}
                            onChange={chngValues}
                            fullWidth
                            required
                            onMouseOver={(e) => e.target.style.borderColor = '#1976d2'}
                            onMouseOut={(e) => e.target.style.borderColor = ''}
                        />

                        <TextField
                            label="Date of Wedding"
                            type="date"
                            name="Date"
                            value={weddingDetails.Date}
                            onChange={chngValues}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                            onMouseOver={(e) => e.target.style.borderColor = '#1976d2'}
                            onMouseOut={(e) => e.target.style.borderColor = ''}
                        />

                        <TextField
                            label="Location"
                            name="Location"
                            value={weddingDetails.Location}
                            onChange={chngValues}
                            fullWidth
                            required
                            onMouseOver={(e) => e.target.style.borderColor = '#1976d2'}
                            onMouseOut={(e) => e.target.style.borderColor = ''}
                        />

                        <TextField
                            label="Guests"
                            type="number"
                            name="Guests"
                            value={weddingDetails.Guests}
                            onChange={chngValues}
                            fullWidth
                            required
                            onMouseOver={(e) => e.target.style.borderColor = '#1976d2'}
                            onMouseOut={(e) => e.target.style.borderColor = ''}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{
                                marginTop: '24px',
                                padding: '10px 0',
                                fontWeight: 'bold'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#115293'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
                        >
                            Update
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}
