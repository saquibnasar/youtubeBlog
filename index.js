const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
