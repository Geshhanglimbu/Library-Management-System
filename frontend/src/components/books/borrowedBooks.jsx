import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BorrowedBooks() {
  const [borrows, setBorrows] = useState([]);
  const [error, setError] = useState(null);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);
  const navigate = useNavigate();

  const fetchBorrows = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get("https://library-management-system-67n4.onrender.com/borrow", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrows(Array.isArray(res.data.data) ? res.data.data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch borrows:", err.response?.data || err);
      setBorrows([]);
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
    console.log("User in BorrowedBooks:", user);
    if (!user || !user.id || !user.role || !localStorage.getItem("token")) {
      alert("Please log in to access borrowed books");
      navigate("/login");
    } else if (!["librarian", "borrower"].includes(user.role)) {
      alert("Unauthorized access");
      navigate("/unauthorized");
    } else if (mounted) {
      fetchBorrows();
    }
    return () => {
      mounted = false;
    };
  }, [navigate, user]);

  const handleReturnBook = async (borrowId) => {
    const confirmReturn = window.confirm("Do you want to return this book?");
    if (!confirmReturn) return;

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://library-management-system-67n4.onrender.com/borrow/return",
        { borrowId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBorrows((prev) =>
        prev.map((borrow) =>
          borrow._id === borrowId
            ? { ...borrow, returnDate: new Date(), status: "returned" }
            : borrow
        )
      );
      alert("Book returned successfully");
    } catch (error) {
      console.error("Error returning book:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to return book");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-black text-lg font-bold">Borrowed Books</h3>
          <p className="text-gray-600 text-sm">View your borrowed books and their details</p>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {borrows.length === 0 && !error ? (
        <p className="text-gray-600">No books borrowed yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-gray-600">Book Title</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Author</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Borrow Date</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Return Date</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Status</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Quantity</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td className="py-2 px-4 border-b">{borrow.bookId?.title || "Unknown"}</td>
                  <td className="py-2 px-4 border-b">{borrow.bookId?.author || "Unknown"}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-2 px-4 border-b">{borrow.status}</td>
                  <td className="py-2 px-4 border-b">1</td>
                  <td className="py-2 px-4 border-b">
                    {/* {borrow.status === "borrowed" && ( */}
                      <button
                        onClick={() => handleReturnBook(borrow._id)}
                        className="text-white px-3 py-1 rounded bg-blue-700 hover:bg-blue-700"
                      >
                        Return
                      </button>
                    {/* )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}