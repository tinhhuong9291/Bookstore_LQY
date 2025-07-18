import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/book.routes";
import orderRoutes from "./routes/order.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    // địa chỉ frontend
    origin: [
      "http://localhost:3000",
      "https://bookstore-lqy-f5tc-5rkdcruoy-thanhtiens-projects-32a8cd95.vercel.app",
      "https://bookstore-lqy-f5tc.vercel.app",
    ],
    // cho phép các phương thức HTTP
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      console.log("✅ MongoDB connected");
    })
    .catch((err) => {
      console.error("❌ MongoDB connect failed:", err);
    });
});
