const express = require("express");
const User = require("../models/user");
const { generateToken } = require("../services/authentication");
const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/logout", async (req, res) => {
  return res.clearCookie("token").redirect("/");
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.create({ fullName, email, password });
  console.log(user);
  const token = generateToken(user);
  return res.cookie("token", token).redirect("/");
});

module.exports = router;
