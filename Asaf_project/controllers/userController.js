const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  רישום משתמש חדש
const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  התחברות משתמש
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  שליפת כל המשתמשים (רק אם תשתמש בפונקציה בעתיד)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  לוודא שכל הפונקציות מיוצאות כראוי
module.exports = {
  register,
  login,
  getAllUsers
};
