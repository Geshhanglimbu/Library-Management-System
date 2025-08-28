import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../App";
import Button from "components/books/buttons";

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Name and email are required');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError('Name must not contain numbers');
      return;
    }
    try {
      const res = await axios.put(`http://localhost:10000/users/${user.id}`, { name, email }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      login(res.data.user, localStorage.getItem('token'));
      alert('Profile updated successfully');
      navigate('/home');
    } catch (err) {
      setError(err.response?.data.message || 'Failed to update profile');
    }
  };

  return (
    <div className="container">
      <div style={{ padding: '32px', background: '#fff', borderRadius: '8px', maxWidth: '400px', margin: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#333' }}>
          Update Profile
        </h2>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onSubmit={handleSubmit}>
          <label style={{ display: 'block', color: '#666', fontSize: '0.875rem', marginBottom: '4px' }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' }}
          />
          <label style={{ display: 'block', color: '#666', fontSize: '0.875rem', marginBottom: '4px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' }}
          />
          <Button type="submit">Update Profile</Button>
        </form>
      </div>
    </div>
  );
}