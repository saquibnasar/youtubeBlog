// make cookie when user signs up
const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT;
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const Blog = require("./models/blog");

const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middlewares/authentication");

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://${process.env.MONGOOSEURL}`)
  .then(() => console.log("Connected to MongoDB"));

// Set views and view engine
app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

// middlewares

app.use(checkForAuthCookie("token"));

// Set static folder

app.use("/", userRouter);
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort("createdBy");

  res.render("index", {
    user: req.user,
    allBlogs,
  });
});

app.use("/blog", blogRouter);

// Listen to port

app.listen(port, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
