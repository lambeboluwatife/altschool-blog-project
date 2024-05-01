const express = require("express");
const router = express.Router();

const {
  getBlogs,
  addBlog,
  deleteBlogs,
  updateBlogs,
} = require("../controllers/blogs");

router.route("/").get(getBlogs).post(addBlog);
router.route("/:id");
// .delete(deleteBlogs)
// .update(updateBlogs);

module.exports = router;
