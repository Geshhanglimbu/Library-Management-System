import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('borrower');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !role) {
      setError('All fields are required');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError('Name must not contain numbers');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await axios.post('https://library-management-system-67n4.onrender.com/register', { email, password, name, role });
     const res = await axios.post('https://library-management-system-67n4.onrender.com/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Registration successful');
      navigate('/home');

    } catch (err) {
      setError(err.response?.data.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <form style={{ padding: '32px', background: '#fff', borderRadius: '8px', maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', fontSize: '2rem', color: '#333' }}>
          <span></span>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#333' }}>
          Register Here
        </h2>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
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
        <label style={{ display: 'block', color: '#666', fontSize: '0.875rem', marginBottom: '4px' }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' }}
        />
        <label style={{ display: 'block', color: '#666', fontSize: '0.875rem', marginBottom: '4px' }}>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' }}
        >
          <option value="borrower">Borrower</option>
          <option value="librarian">Librarian</option>
        </select>
        <button
          type="submit"
          style={{ width: '100%', padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Register
        </button>
      </form>
    </div>
  );
}