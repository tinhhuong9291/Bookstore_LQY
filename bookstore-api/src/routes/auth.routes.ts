import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash });
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
  User.findOne({ email }).then((user) => {
    if (!user || !user.password || !bcrypt.compare(password, user.password)) {
      res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    } else {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET!
      );
      res.json({ token });
    }
  });
});

export default router;
