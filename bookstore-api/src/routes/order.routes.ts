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

// POST create add to cart with userId
router.post("/", async (req, res) => {
  const { userId, items } = req.body;

  let cart = await Order.findOne({ userId });

  if (!cart) {
    cart = new Order({ userId, items });
  } else {
    cart.items = items;
  }

  await cart.save();
  res.json(cart);
});

// PUT update status
router.put("/:id", async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

export default router;
