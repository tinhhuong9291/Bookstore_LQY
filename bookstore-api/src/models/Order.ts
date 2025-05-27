import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    items: [
      {
        bookId: String,
        quantity: Number,
      },
    ],
    address: String,
    phone: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
