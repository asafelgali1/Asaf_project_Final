const express = require("express");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const toyRoutes = require("./routes/toysRoutes");
const auth = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use("/users", userRoutes);
app.use("/toys", toyRoutes);

module.exports = app;



