import express from "express";
import Book from "../models/Book";

const router = express.Router();

// GET all books
router.get("/", async (_, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET book by id
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// POST create
router.post("/", async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
});

// PUT update
router.put("/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

export default router;
