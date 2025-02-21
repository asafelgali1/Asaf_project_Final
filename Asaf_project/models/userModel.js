const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
  },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
