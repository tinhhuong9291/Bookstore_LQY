import Cart from "../models/Cart";
import Book from "../models/Book";
import { Request, Response } from "express";
import { Types } from "mongoose";

interface CartItem {
  bookId: string;
  quantity: number;
  price: number;
  title: string;
}

// Lấy giỏ hàng theo userId
export const getCartByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { userId, items: [], total: 0 });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm/sửa giỏ hàng
export const updateCart = async (req: Request, res: Response) => {
  const session = await Cart.startSession();
  session.startTransaction();

  try {
    const { userId, items } = req.body;
    const updatedItems: CartItem[] = [];

    // Lấy thông tin giá của từng sách
    for (const item of items) {
      const book = await Book.findById(item.bookId).session(session);
      if (!book) {
        throw new Error(`Book with id ${item.bookId} not found`);
      }

      // Kiểm tra số lượng tồn kho
      if (book.quantity < item.quantity) {
        throw new Error(
          `Không đủ số lượng sách "${book.title}" trong kho. Còn lại: ${book.quantity}`
        );
      }

      updatedItems.push({
        bookId: item.bookId,
        quantity: item.quantity,
        price: book.price,
        title: book.title,
      });
    }

    // Cập nhật hoặc tạo giỏ hàng mới
    let cart = await Cart.findOne({ userId }).session(session);
    if (!cart) {
      cart = new Cart({
        userId,
        items: updatedItems as Types.DocumentArray<CartItem>,
      });
    } else {
      cart.items = updatedItems as unknown as Types.DocumentArray<CartItem>;
    }

    await cart.save({ session });
    await session.commitTransaction();
    res.json(cart);
  } catch (error: any) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

// Xóa giỏ hàng
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndDelete({ userId });
    res.json({ message: "Cart cleared successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
