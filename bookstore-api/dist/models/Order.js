"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    userId: String,
    items: [
        {
            bookId: String,
            quantity: Number,
        },
    ],
    address: String,
    phone: String,
    status: { type: String, default: "pending" },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Order", orderSchema);
