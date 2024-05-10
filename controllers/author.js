const Blog = require("../models/Blog");

exports.getOwnerBlogs = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const { page = 1, limit = 10, state } = req.query;
    const query = { "author.id": ownerId };

    if (state) {
      query.state = state === "true";
    }

    const options = {
      skip: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
    };

    const blogs = await Blog.find(query, null, options);

    if (!blogs.length) {
      return res.status(404).json({
        success: false,
        error: "No blogs found for this owner",
      });
    }

    return res.status(200).json({
      success: true,
      count: blogs.length,
      currentPage: parseInt(page),
      totalPages: Math.ceil(blogs.length / parseInt(limit)),
      data: blogs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
