const Blog = require("../models/Blog");

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addBlog = async (req, res, next) => {
  try {
    const { title, description, body, author, tags, timestamp } = req.body;
    function calculateReadingTime(text) {
      const wordsPerMinute = 200;
      const wordCount = text.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      return readingTime;
    }

    function readingTimeMinutes(time) {
      if (calculateReadingTime(time) === 1) {
        return `${calculateReadingTime(time)} min`;
      } else {
        return `${calculateReadingTime(time)} mins`;
      }
    }

    const newBlog = new Blog({
      title,
      description,
      body,
      author,
      tags,
      state: false,
      read_count: 0,
      reading_time: readingTimeMinutes(body),
      timestamp,
    });
    const blog = await newBlog.save();
    return res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const updateFields = req.body;

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "No blog found",
      });
    }

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] !== undefined) {
        blog[key] = updateFields[key];
      }
    });

    blog = await blog.save();

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.changeBlogState = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "No blog found",
      });
    }

    blog.state = !blog.state;

    blog = await blog.save();

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "No blog found",
      });
    }

    await blog.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
