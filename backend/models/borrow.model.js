import mongoose from "mongoose";

    const borrowSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
      borrowDate: {
        type: Date,
        required: true,
        default: Date.now
      },
      returnDate: {
        type: Date,
        default: null
      }
    }, { timestamps: true });

    const borrowModel = mongoose.model("Borrow", borrowSchema);
    export default borrowModel;