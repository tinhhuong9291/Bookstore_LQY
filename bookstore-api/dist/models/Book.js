"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    imageUrl: String,
    quantity: { type: Number, default: 0 },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    reviews: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Review" }],
    ratings: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Book", bookSchema);
