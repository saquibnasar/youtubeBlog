const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT;
const userRouter = require("./routes/user");

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://${process.env.MONGOOSEURL}`)
  .then(() => console.log("Connected to MongoDB"));

// Set views and view engine

app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");

// Body parser
app.use(express.urlencoded({ extended: false }));

// Set static folder

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/", userRouter);

// Listen to port

app.listen(port, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
