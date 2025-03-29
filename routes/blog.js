const router = require("express").Router();

const Blog = require("../models/blog");
const path = require("path");

const multer = require("multer");
router.get("/addNew", (req, res) => {
  res.render("blog", { user: req.user });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort("createdBy");

  res.render("index", {
    user: req.user,
    allBlogs,
  });

  // const blog = await Blog.findById(req.params.id);
  // res.render("blog", { blog, user: req.user });
});

module.exports = router;
