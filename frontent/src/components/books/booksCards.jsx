import React from 'react';
import { FaBook, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function BookCard({ books = [], setModalForm, setEditBook, handleDelete, handleBorrow, userRole }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <table style={{ width: '100%', fontSize: '0.875rem', textAlign: 'center', color: '#333' }}>
        <thead>
          <tr>
            <th style={{ padding: '2px', textAlign: 'left' }}>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            if (!book) return null;
            const key = book._id || book.isbn || index;
            return (
              <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px', textAlign: 'left', width: '80px' }}>
                  {book._id ?? 'N/A'}
                </td>
                <td style={{ display: 'flex', alignItems: 'center', padding: '8px', textAlign: 'left' }}>
                  <FaBook style={{ color: '#999', marginRight: '6px' }} />
                  <span>{book.title ?? 'Unknown'}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  {book.author ?? 'N/A'}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {book.isbn ?? 'N/A'}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {book.available ?? 0}
                </td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '8px' }}>
                  <FaEye style={{ cursor: 'pointer' }} onClick={() => alert('View details not implemented')} />
                  {userRole === 'librarian' && (
                    <>
                      <FaEdit
                        style={{ cursor: 'pointer', color: '#666' }}
                        onClick={() => {
                          setEditBook(book);
                          setModalForm(true);
                        }}
                      />
                      <FaTrash
                        style={{ cursor: 'pointer', color: '#666' }}
                        onClick={() => handleDelete(book._id)}
                      />
                    </>
                  )}
                  {userRole === 'borrower' && (
                    <button
                      style={{
                        padding: '4px 8px',
                        background: book.available > 0 ? '#4CAF50' : '#ccc',
                        color: '#fff',
                        borderRadius: '4px',
                        cursor: book.available > 0 ? 'pointer' : 'not-allowed'
                      }}
                      onClick={() => book.available > 0 && handleBorrow(book._id)}
                      disabled={book.available <= 0}
                    >
                      Borrow
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}