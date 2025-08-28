import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './buttons';

export default function UserForm({ setUsers, setModalForm, editUser, setEditUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('borrower');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editUser) {
      setUsername(editUser.username || '');
      setEmail(editUser.email || '');
      setPassword('');
      setRole(editUser.role || 'borrower');
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || (!editUser && !password) || !role) {
      setError('All fields are required');
      return;
    }
    const validRoles = ['borrower', 'librarian'];
    if (!validRoles.includes(role)) {
      setError('Invalid role. Must be "borrower" or "librarian"');
      return;
    }
    const userData = { username, email, role };
    if (password) userData.password = password;
    const token = localStorage.getItem('token');
    try {
      if (editUser) {
        const response = await axios.put(`https://library-management-system-67n4.onrender.com/users/${editUser._id}`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) =>
          prev.map((user) => (user._id === editUser._id ? response.data.data : user))
        );
        alert('User updated successfully');
        setEditUser(null);
      } else {
        const response = await axios.post('https://library-management-system-67n4.onrender.com/users', userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) => [...prev, response.data.data]);
        alert('User added successfully');
      }
      setModalForm(false);
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('borrower');
      setError('');
    } catch (err) {
      setError(err.response?.data.message || 'Failed to save user');
    }
  };

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '8px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333' }}>
          {editUser ? 'Edit User' : 'Add New User'}
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>Fill in the user details below</p>
      </div>
      {error && <p style={{ color: 'red', marginBottom: '8px' }}>{error}</p>}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={editUser ? 'New password (optional)' : 'Password'}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="borrower">Borrower</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>
        </div>
        <div style={{ paddingTop: '8px' }}>
          <Button type="submit">{editUser ? 'Update User' : 'Add User'}</Button>
        </div>
      </form>
    </div>
  );
}