"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// POST /register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcryptjs_1.default.hash(password, 10);
    const user = new User_1.default({ name, email, password: hash });
    await user.save();
    res.status(201).json({ message: "Đăng ký thành công" });
});
// POST /login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password)))
//     return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
//   const token = jwt.sign(
//     { id: user._id, isAdmin: user.isAdmin },
//     process.env.JWT_SECRET!
//   );
//   res.json({ token });
// });
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User_1.default.findOne({ email }).then((user) => {
        if (!user || !user.password || !bcryptjs_1.default.compare(password, user.password)) {
            res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
            res.json({ token });
        }
    });
});
exports.default = router;
