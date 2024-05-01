const express = require("express");
const router = express.Router();

const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlogs,
} = require("../controllers/blogs");

router.route("/").get(getBlogs).post(addBlog);
router.route("/:id").delete(deleteBlog);

module.exports = router;
