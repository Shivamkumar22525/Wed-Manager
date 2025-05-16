import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import url from '../../url';

export default function Dashboard() {
  const [dashDetails, setDashDetails] = useState({
    Guests: 0,
    Date: null,
    Budget: 0,
    Guests_invited: 0,
  });

  async function fetchData() {
    const id = localStorage.getItem('authTokens');
    
    if (!id) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const res = await fetch(`${url.url}/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch user data');
      
      const user = await res.json();

      if (user?.user?.Date) {
        const today = new Date();
        const weddingDate = new Date(user.user.Date);
        const daysToGo = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));
        user.user.Date = daysToGo;
      }
      user.user.Guests_invited = user.user.guestList.length;

      setDashDetails(user.user);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <Typography variant="h4" component="h1" className="text-center font-semibold text-gray-800 mb-8">
          Dashboard
        </Typography>

        <Box className="bg-gray-100 shadow-lg rounded-lg p-8">
          <Box className="flex justify-between items-center mb-6">
            <Typography variant="h5" component="h3" className="font-semibold text-gray-700">
              Wedding Details
            </Typography>
            <Link to="/wedding-details">
              <Button variant="contained" color="primary">
                Edit Wedding Details
              </Button>
            </Link>
          </Box>

          <Grid container spacing={3} className="mt-4">
            <Grid item xs={12} sm={6} md={3}>
              <Card className="shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Guests
                  </Typography>
                  <Typography variant="h4" className="font-semibold text-blue-600">
                    {dashDetails.Guests}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Days to Go
                  </Typography>
                  <Typography variant="h4" className="font-semibold text-green-600">
                    {dashDetails.Date !== null ? dashDetails.Date : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Budget
                  </Typography>
                  <Typography variant="h4" className="font-semibold text-purple-600">
                    {dashDetails.Budget}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Guests Invited
                  </Typography>
                  <Typography variant="h4" className="font-semibold text-red-600">
                    {dashDetails.Guests_invited}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
