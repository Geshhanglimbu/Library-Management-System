import bookModel from "../models/books.model.js";


// Create a new book
export const createBook = async (req, res) => {
    try {
        const { title, author, isbn, quantity, available } = req.body;

        // Validate required fields
        if (!title || !author || !isbn || quantity == null || available == null) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if ISBN already exists
        const isBookExists = await bookModel.findOne({ isbn });
        if (isBookExists) {
            return res.status(400).json({ message: "ISBN already exists" });
        }

        // Create and save the book
        const bookData = await bookModel.create({
            title,
            author,
            isbn,
            quantity,
            available
        });

        res.status(201).json({ message: "Book created successfully", data: bookData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all books


export const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({ message: "Books retrieved successfully", data: books });
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Other exports (createBook, deleteBook, etc.) remain unchanged
// Get book by ID
export const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await bookModel.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book fetched successfully", data: book });
    } catch (error) {
        console.log("Error while fetching book by id", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update book data
export const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, isbn, quantity, available } = req.body;

        // Optionally, validate data here before update

        const updatedBook = await bookModel.findByIdAndUpdate(
            id,
            { title, author, isbn, quantity, available },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (error) {
        // Handle duplicate isbn error
        if (error.code === 11000 && error.keyPattern?.isbn) {
            return res.status(400).json({ message: "ISBN already exists" });
        }
        console.log("Error while updating book", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete book
export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully", data: deletedBook });
    } catch (error) {
        console.log("Error while deleting book", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
