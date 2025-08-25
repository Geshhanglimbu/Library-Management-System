import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookCard from './booksCards';
import BookForm from './booksForms';


export default function BooksPage({ userRole }) {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  

  // Fetch all books on mount
useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get('http://localhost:10000/books', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      console.log("Fetched books array:", res.data.data);
      console.log("Is array?", Array.isArray(res.data.data));
      setBooks(res.data.data || []); // <-- use data array from backend
    })
    .catch(err => console.error(err));
}, []);

  // Delete book
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:10000/books/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Borrow book
  const handleBorrow = (id) => {
    alert(`Borrow book with ID: ${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Show form above the table */}
      {showForm && (
        <BookForm
          setBooks={setBooks}
          setModalForm={setShowForm} // rename modalForm to showForm
          editBook={editBook}
          setEditBook={setEditBook}
        />
      )}

      {/* Button to open form */}
      {userRole === 'librarian' && !showForm && (
        <button onClick={() => setShowForm(true)} style={{ marginBottom: '16px' }}>
          Add New Book
        </button>
      )}

      {/* Book table */}
      <BookCard
        books={books}
        setModalForm={setShowForm}
        setEditBook={setEditBook}
        handleDelete={handleDelete}
        handleBorrow={handleBorrow}
        userRole={userRole}
      />
    </div>
  );
}
