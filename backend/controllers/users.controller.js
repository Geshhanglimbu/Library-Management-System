import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    const validRoles = ["borrower", "librarian"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'borrower' or 'librarian'" });
    }

    // Check if email already exists
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const userData = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "User created successfully", data: userData });
  } catch (error) {
    console.error("Error in createUser:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found", data: [] });
    }
    res.status(200).json({ message: "All users fetched successfully", data: allUsers });
  } catch (error) {
    console.error("Error in getAllUsers:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.error("Error in getUserById:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update user data
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const { username, email, password, role } = req.body;

    // Validate role if provided
    if (role) {
      const validRoles = ["borrower", "librarian"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role. Must be 'borrower' or 'librarian'" });
      }
    }

    // Prepare update data, only include provided fields
    const updateData = { username, email, role };
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Error in updateUser:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error("Error in deleteUser:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};