require("dotenv").config();
const express = require("express");
const connectDB = require("./db/mongoConnect");

const app = require("./app");

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});





