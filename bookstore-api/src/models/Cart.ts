import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
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
        title: {
          type: String,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Middleware để tự động tính tổng tiền
cartSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.total = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  } else {
    this.total = 0;
  }
  next();
});

export default mongoose.model("Cart", cartSchema);
