"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../models/Book"));
const router = express_1.default.Router();
// GET all books
router.get("/", async (_, res) => {
    const books = await Book_1.default.find();
    res.json(books);
});
// GET book by id
router.get("/:id", async (req, res) => {
    const book = await Book_1.default.findById(req.params.id);
    res.json(book);
});
// POST create
router.post("/", async (req, res) => {
    const newBook = new Book_1.default(req.body);
    await newBook.save();
    res.status(201).json(newBook);
});
// PUT update
router.put("/:id", async (req, res) => {
    const updated = await Book_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updated);
});
// DELETE
router.delete("/:id", async (req, res) => {
    await Book_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
});
exports.default = router;
