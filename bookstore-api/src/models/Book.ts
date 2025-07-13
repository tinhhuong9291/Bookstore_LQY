// import mongoose from "mongoose";

// const bookSchema = new mongoose.Schema(
//   {
//     title: String,
//     author: String,
//     description: String,
//     price: Number,
//     imageUrl: String,
//     quantity: { type: Number, default: 100 },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
//     reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
//     ratings: { type: Number, default: 0 },
//     ratingCount: { type: Number, default: 0 },
//     isAvailable: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Book", bookSchema);
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: String,
    quantity: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Số lượng phải là số nguyên",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Thêm phương thức để kiểm tra và cập nhật số lượng
bookSchema.methods.updateStock = async function (quantity: number) {
  if (this.quantity < quantity) {
    throw new Error("Không đủ số lượng sách trong kho");
  }
  this.quantity -= quantity;
  this.isAvailable = this.quantity > 0;
  return this.save();
};

// Thêm middleware để tự động cập nhật trạng thái available
bookSchema.pre("save", function (next) {
  this.isAvailable = this.quantity > 0;
  next();
});

export default mongoose.model("Book", bookSchema);
