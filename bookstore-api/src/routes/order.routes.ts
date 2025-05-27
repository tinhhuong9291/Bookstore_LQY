import express from "express";
import Order from "../models/Order";

const router = express.Router();

// GET all orders
router.get("/", async (_, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// POST create order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// PUT update status
router.put("/:id", async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

export default router;
