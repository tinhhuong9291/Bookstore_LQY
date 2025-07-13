import express from "express";
import { getCartByUser, updateCart, clearCart } from "../controllers/cart.controller";

const router = express.Router();

router.get("/:userId", getCartByUser);
router.post("/", updateCart);
router.delete("/:userId", clearCart);

export default router; 