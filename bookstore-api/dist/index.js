"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    // địa chỉ frontend
    origin: [
        "http://localhost:3000",
        "https://bookstore-lqy-f5tc-5rkdcruoy-thanhtiens-projects-32a8cd95.vercel.app",
        "https://bookstore-lqy-f5tc.vercel.app",
    ],
    // cho phép các phương thức HTTP
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/books", book_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
const PORT = process.env.PORT || 8080;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})
    .catch((err) => console.error("❌ MongoDB connect failed:", err));
