import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
); // Moved timestamps option inside the Schema constructor

export const Book = mongoose.model("Book", bookSchema); // Changed the model name from "Cat" to "Book"
