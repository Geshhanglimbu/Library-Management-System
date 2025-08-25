
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["borrower", "librarian"],
    required: true
  }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;
