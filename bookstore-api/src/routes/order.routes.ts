import express, { Request, Response } from "express";
import Order from "../models/Order";
import Book from "../models/Book";
import mongoose from "mongoose";

const router = express.Router();

// GET all orders
router.get("/", async (_, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// POST create order
router.post("/", async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, userId } = req.body;
    const orderItems = [];
    let total = 0;

    // Kiểm tra và cập nhật số lượng sách
    for (const item of items) {
      const book = await Book.findById(item.bookId).session(session);
      if (!book) {
        throw new Error(`Book with id ${item.bookId} not found`);
      }

      if (book.quantity < item.quantity) {
        throw new Error(
          `Không đủ số lượng sách "${book.title}" trong kho. Còn lại: ${book.quantity}`
        );
      }

      // Cập nhật số lượng
      book.quantity -= item.quantity;
      book.isAvailable = book.quantity > 0;
      await book.save({ session });

      // Tính tổng tiền và thêm vào items
      const itemTotal = book.price * item.quantity;
      total += itemTotal;
      orderItems.push({
        bookId: item.bookId,
        quantity: item.quantity,
        price: book.price,
      });
    }

    // Tạo đơn hàng mới
    const order = new Order({
      userId,
      items: orderItems,
      total: total, // Thêm tổng tiền
    });

    await order.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      order,
      message: "Đặt hàng thành công",
    });
  } catch (error: any) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

// PUT update status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
