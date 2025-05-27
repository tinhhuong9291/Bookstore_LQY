import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    description: String,
    price: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
