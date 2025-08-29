import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from './buttons';
import { set } from 'mongoose';

export default function BookForm({ setBooks, setModalForm, editBook, setEditBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [quantity, setQuantity] = useState('');
  const [available, setAvailable] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    if (editBook) {
      setTitle(editBook.title);
      setAuthor(editBook.author);
      setIsbn(editBook.isbn);
      setQuantity(editBook.quantity.toString());
      setAvailable(editBook.available.toString());
    }
  }, [editBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !isbn || !quantity|| !available) {
      setError('All fields are required');
      return;
    }
    if (quantity < 1) {
      setError('Quantity must be positive');
      return;
    }
    const bookData = { title, author, isbn, quantity: parseInt(quantity), available: parseInt(available)};
    const token = localStorage.getItem('token');
    try {
      if (editBook) {
        const response = await axios.put(`https://library-management-system-67n4.onrender.com/books/${editBook._id}`, bookData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks((prev) =>
          prev.map((book) => (book._id === editBook._id ? response.data.book : book))
        );
        alert('Book updated successfully');
        setEditBook(null);
      } else {
        const response = await axios.post('https://library-management-system-67n4.onrender.com/books', bookData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks((prev) => [...prev, response.data.book]);
        alert('Book added successfully');
      }
      setModalForm(false);
      setTitle('');
      setAuthor('');
      setIsbn('');
      setQuantity('');
      setAvailable('');
      setError('');
    } catch (err) {
       console.error("Book save error:", err.response || err);
  setError(err.response?.data?.message || 'Failed to save book');
    }
  };

  return (
    <div style={{ padding: '28px' }}>
      <div style={{ marginBottom: '8px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333' }}>
          {editBook ? 'Edit Book' : 'Add New Book'}
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>Fill in the book details below</p>
      </div>
      {error && <p style={{ color: 'red', marginBottom: '8px' }}>{error}</p>}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author Name"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="ISBN"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              min="1"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
           <div style={{ flex: 1 }}>
  <label style={{ display: 'block', marginBottom: '4px', color: '#333', fontSize: '0.875rem' }}>
    Available
  </label>
  <input
    type="number"
    value={available}
    onChange={(e) => setAvailable(e.target.value)}
    placeholder="Available"
    min="0"
    style={{ 
      width: '100%', 
      padding: '8px', 
      border: '1px solid #ccc', 
      borderRadius: '4px' 
    }}
  />
</div>

        </div>
        
        <div style={{ paddingTop: '8px' }}>
          <Button type="submit">{editBook ? 'Update Book' : 'Add Book'}</Button>
        </div>
      </form>
    </div>
  );
}