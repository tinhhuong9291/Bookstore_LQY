"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../models/Order"));
const router = express_1.default.Router();
// GET all orders
router.get("/", async (_, res) => {
    const orders = await Order_1.default.find();
    res.json(orders);
});
// POST create order
router.post("/", async (req, res) => {
    const order = new Order_1.default(req.body);
    await order.save();
    res.status(201).json(order);
});
// PUT update status
router.put("/:id", async (req, res) => {
    const updated = await Order_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updated);
});
exports.default = router;
