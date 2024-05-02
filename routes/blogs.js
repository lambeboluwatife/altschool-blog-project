const express = require("express");
const router = express.Router();

const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  changeBlogState,
} = require("../controllers/blogs");

router.route("/").get(getBlogs).post(addBlog);
router.route("/:id").delete(deleteBlog).put(updateBlog);
router.route("/:id/state").put(changeBlogState);

module.exports = router;
