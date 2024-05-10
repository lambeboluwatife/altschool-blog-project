const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/jwt");
const {
  ensureAuthenticated,
  checkBlogOwnership,
} = require("../middlewares/authMiddleware");

const {
  getBlogs,
  getBlog,
  addBlog,
  deleteBlog,
  updateBlog,
  changeBlogState,
} = require("../controllers/blogs");

router.route("/").get(getBlogs).post(verifyToken, addBlog);
router.route("/:id").get(getBlog);
router
  .route("/:id")
  .delete(checkBlogOwnership, deleteBlog)
  .put(checkBlogOwnership, updateBlog);
router.route("/:id/state").put(checkBlogOwnership, changeBlogState);

module.exports = router;
