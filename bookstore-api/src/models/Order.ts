import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        bookId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    address: String,
    phone: String,
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Middleware để tự động tính tổng tiền trước khi lưu
orderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.total = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  } else {
    this.total = 0;
  }
  next();
});

export default mongoose.model("Order", orderSchema);
