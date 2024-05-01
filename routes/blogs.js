const express = require("express");
const router = express.Router();

const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");

router.route("/").get(getBlogs).post(addBlog);
router.route("/:id").delete(deleteBlog).put(updateBlog);

module.exports = router;
