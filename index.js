const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT;
const userRouter = require("./routes/user");

const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://${process.env.MONGOOSEURL}`)
  .then(() => console.log("Connected to MongoDB"));

app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
