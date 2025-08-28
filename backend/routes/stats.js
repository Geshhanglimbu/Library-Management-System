import express from "express";
import bookModel from "../models/books.model.js";
import userModel from "../models/user.model.js";

const router = express.Router();

// get actual models by calling the functions
const Book = bookModel();
const User = userModel();

router.get("/stats", async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const availableBooks = await Book.countDocuments({ status: "available" });
    const borrowedBooks = await Book.countDocuments({ status: "borrowed" });
    const totalUsers = await User.countDocuments();

    res.json({
      totalBooks,
      availableBooks,
      borrowedBooks,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
