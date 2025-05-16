import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import url from '../../url';

export default function GuestList() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState([]);

  // Add guest function
  const addGuest = (event) => {
    event.preventDefault();

    if (name === '' || email === '') {
      alert('Both fields are necessary.');
      return;
    }

    const id = Math.floor(Math.random() * 10000) + 1;
    const newGuest = { name, email, id };

    setGuests((prevGuests) => {
      const updatedGuests = [...prevGuests, newGuest];
      updateValues(updatedGuests);
      return updatedGuests;
    });

    setName('');
    setEmail('');
  };

  // Delete guest function
  const deleteGuest = (id) => {
    setGuests((prevGuests) => {
      const updatedGuests = prevGuests.filter((guest) => guest.id !== id);
      updateValues(updatedGuests);
      return updatedGuests;
    });
  };

  // Fetch existing guest data
  async function fetchData() {
    const id = localStorage.getItem('authTokens');

    if (!id) {
      console.error('User is not authenticated.');
      return;
    }

    try {
      const res = await fetch(`${url.url}/users/${id}`);
      if (!res.ok) throw new Error('Failed to fetch data.');
      const user = await res.json();
      setGuests(user.user.guestList);
    } catch (error) {
      console.error('Error fetching guest list:', error);
    }
  }

  // Update guest list data in the backend
  async function updateValues(updatedGuests) {
    const id = localStorage.getItem('authTokens');

    if (!id) return;

    try {
      const res = await fetch(`${url.url}/users/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: { guestList: updatedGuests },
          id: id,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update guest list.');
      }
    } catch (error) {
      console.error('Error updating guest list:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{
          backgroundColor: '#f9f9f9',
          maxWidth: '50%', // Reduced form width
          borderRadius: '10px',
          marginTop: '30px',
          padding: '30px', // Reduced padding
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <form onSubmit={addGuest} style={{ marginBottom: '20px' }}>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '2rem' }}>
            Guest List
          </h1>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="guestName" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Name</label>
            <input
              type="text"
              className="form-control"
              id="guestName"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                transition: 'border-color 0.2s',
                fontSize: '1rem',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="guestEmail" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Email</label>
            <input
              type="email"
              className="form-control"
              id="guestEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                transition: 'border-color 0.2s',
                fontSize: '1rem',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Add Guest
          </button>
        </form>

        <div style={{ marginTop: '20px' }}>
          {guests.length > 0 ? (
            guests.map((guest) => (
              <div
                key={guest.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <div>
                  <p style={{ fontSize: '1rem', margin: 0 }}>
                    <strong>Name:</strong> {guest.name}
                  </p>
                  <p style={{ fontSize: '1rem', margin: '5px 0', color: '#555' }}>
                    <strong>Email:</strong> {guest.email}
                  </p>
                </div>
                <button
                  onClick={() => deleteGuest(guest.id)}
                  style={{
                    borderRadius: '8px',
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    padding: '6px 10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    fontSize: '0.9rem',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#cc0000')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#ff4d4f')}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1rem' }}>No guests added yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
