import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/books/buttons";
import { FaPlus } from "react-icons/fa";
import BookCard from "../components/books/booksCards";
import SearchBooks from "../components/books/selectSearch";
import axios from "axios";
import BookForm from "../components/books/booksForms";

export default function Books() {
  const [modalForm, setModalForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get("http://localhost:10000/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(Array.isArray(res.data.data) ? res.data.data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch books:", err.response?.data || err);
      setBooks([]);
      setError(err.response?.data?.message || "Failed to connect to the server. Please try again later.");
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log("User in Books:", user);
    if (!user || !user.id || !user.role || !localStorage.getItem("token")) {
      alert("Please log in to access books");
      navigate("/login");
    } else if (!["librarian", "borrower"].includes(user.role)) {
      alert("Unauthorized access");
      navigate("/unauthorized");
    } else if (mounted) {
      fetchBooks();
    }
    return () => {
      mounted = false;
    };
  }, [navigate, user]);

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this book?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:10000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prev) => prev.filter((book) => book._id !== id));
      alert("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong while deleting");
    }
  };

  const handleBorrowBook = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to borrow a book");
      navigate("/login");
      return;
    }
    if (!user || !user.id) {
      alert("User not logged in or invalid user data");
      navigate("/login");
      return;
    }
    if (!bookId) {
      alert("Invalid book ID");
      return;
    }
    console.log("Borrow request payload:", { userId: user.id, bookId });
    try {
      const response = await axios.post(
        "http://localhost:10000/borrow",
        { userId: user.id, bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prev) =>
        prev.map((book) =>
          book._id === bookId ? { ...book, available: book.available - 1 } : book
        )
      );
      alert("Book borrowed successfully");
    } catch (error) {
      console.error("Error borrowing book:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to borrow book");
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
      book?.author?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center pl-2 pr-2 text-gray-500">
        <div className="flex flex-col gap-1">
          <h3 className="text-black text-md">Library Book Management</h3>
          <p className="text-black text-xs">Browse or manage library books</p>
        </div>
        {user?.role === "librarian" && (
          <Button
            onClick={() => {
              setModalForm(true);
              setEditBook(null);
            }}
            icon={<FaPlus />}
            type="button"
          >
            Add Book
          </Button>
        )}
      </div>
      <SearchBooks search={search} setSearch={setSearch} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <p>Books fetched: {filteredBooks.length}</p>
      <BookCard
        books={filteredBooks}
        setEditBook={setEditBook}
        setModalForm={setModalForm}
        handleDelete={handleDeleteBook}
        handleBorrow={handleBorrowBook}
        userRole={user?.role}
      />
      {modalForm && (
        <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-brightness-30 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-xl w-full max-w-md relative">
            <Button
              onClick={() => setModalForm(false)}
              className="absolute top-2 right-2 text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer"
            >
              ✕
            </Button>
            <BookForm
              setBooks={setBooks}
              setModalForm={setModalForm}
              editBook={editBook}
              setEditBook={setEditBook}
            />
          </div>
        </div>
      )}
    </>
  );
}