import borrowModel from "../models/borrow.model.js";
import bookModel from "../models/books.model.js";
import userModel from "../models/user.model.js";

export const createBorrow = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).json({ message: "User ID and Book ID are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.available <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    const existingBorrow = await borrowModel.findOne({ userId, bookId, returnDate: null });
    if (existingBorrow) {
      return res.status(400).json({ message: "Book already borrowed and not returned yet" });
    }

    const borrow = await borrowModel.create({ userId, bookId, borrowDate: new Date(), status: "borrowed" });

    await bookModel.findByIdAndUpdate(bookId, { $inc: { available: -1 } });

    res.status(201).json({ message: "Book borrowed successfully", data: borrow });
  } catch (error) {
    console.error("Error in createBorrow:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const returnBorrow = async (req, res) => {
  try {
    const { borrowId } = req.body;
    if (!borrowId) {
      return res.status(400).json({ message: "Borrow ID is required" });
    }

    const borrow = await borrowModel.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }
    if (borrow.returnDate) {
      return res.status(400).json({ message: "Book already returned" });
    }

    await borrowModel.findByIdAndUpdate(borrowId, { 
      returnDate: new Date(),
      status: "returned"
    });

    await bookModel.findByIdAndUpdate(borrow.bookId, { $inc: { available: 1 } });

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error in returnBorrow:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getUserBorrows = async (req, res) => {
  try {
    const userId = req.user.id; // From auth.middleware.js
    const borrows = await borrowModel.find({ userId }).populate('bookId', 'title author');
    res.status(200).json({ message: "Borrow records retrieved successfully", data: borrows });
  } catch (error) {
    console.error("Error in getUserBorrows:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};