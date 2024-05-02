const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/jwt");

const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  changeBlogState,
} = require("../controllers/blogs");

router.route("/").get(getBlogs).post(verifyToken, addBlog);
router.route("/:id").delete(deleteBlog).put(updateBlog);
router.route("/:id/state").put(changeBlogState);

module.exports = router;
