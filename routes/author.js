const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const { getOwnerBlogs } = require("../controllers/author");

router.route("/blogs").get(ensureAuthenticated, getOwnerBlogs);

module.exports = router;
