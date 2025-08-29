import express from "express";
import bookModel from "../models/books.model.js";
import userModel from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Ensure books exist
    const totalBooks = await bookModel.countDocuments();
    const availableBooks = await bookModel.countDocuments({ status: "available" });
    const borrowedBooks = await bookModel.countDocuments({ status: "borrowed" });

    // Ensure users exist
    const totalUsers = await userModel.countDocuments();

    // Send safe defaults if counts are NaN or undefined
    res.json({
      totalBooks: totalBooks || 0,
      availableBooks: availableBooks || 0,
      borrowedBooks: borrowedBooks || 0,
      totalUsers: totalUsers || 0,
    });
  } catch (err) {
    console.error("Stats fetch error:", err);

    // Return safe default stats instead of crashing
    res.status(500).json({
      totalBooks: 0,
      availableBooks: 0,
      borrowedBooks: 0,
      totalUsers: 0,
      error: "Failed to fetch stats",
    });
  }
});

export default router;
