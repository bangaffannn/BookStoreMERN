import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new Book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Books from database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update the books from database
router.put("/:id", async (request, response) => {
  try {
    // Check if all required fields are provided in the request body
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    // Assuming `Book` is a mongoose model for handling MongoDB interactions
    // You need to import `Book` and mongoose at the top of your file

    // Update the book information in the database
    const result = await Book.findByIdAndUpdate(id, request.body);

    // Check if the book with the given ID exists
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Return success message
    return response.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for delete a book

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Assuming `Book` is a mongoose model for handling MongoDB interactions
    // You need to import `Book` and mongoose at the top of your file

    // Attempt to delete the book from the database
    const result = await Book.findByIdAndDelete(id);

    // Check if the book with the given ID exists
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Return success message
    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;