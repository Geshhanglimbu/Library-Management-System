import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './controllers/books.controller.js';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './controllers/users.controller.js';
import { createBorrow, returnBorrow, getUserBorrows } from './controllers/borrow.controller.js';
import { login } from './controllers/auth.controller.js';
import { register } from './controllers/register.controller.js';
import { authorizeToken } from './middleware/auth.middleware.js';
import statsRoutes from "./routes/stats.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/stats', statsRoutes);

// Book routes
app.post("/books", authorizeToken, createBook);
app.get("/books", authorizeToken, getAllBooks);
app.get("/books/:id", authorizeToken, getBookById);
app.put("/books/:id", authorizeToken, updateBook);
app.delete("/books/:id", authorizeToken, deleteBook);

// User routes
app.post("/users", authorizeToken, createUser);
app.get("/users", authorizeToken, getAllUsers);
app.get("/users/:id", authorizeToken, getUserById);
app.put("/users/:id", authorizeToken, updateUser);
app.delete("/users/:id", authorizeToken, deleteUser);

// Borrow routes
app.get("/borrow", authorizeToken, getUserBorrows);
app.post("/borrow", authorizeToken, createBorrow);
app.post("/borrow/return", authorizeToken, returnBorrow);

// Auth routes
app.post("/login", login);
app.post("/register", register);

// Token verification route
app.get("/verify-token", authorizeToken, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err.message, err.stack);
});