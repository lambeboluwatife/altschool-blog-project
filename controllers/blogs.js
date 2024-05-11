const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const logger = require("../middlewares/logger");

exports.getBlogs = async (req, res, next) => {
  logger.info("Get all Blogs function called");

  logger.info("Starting process...");

  try {
    const blogs = await Blog.find({ state: true });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs.length === 0 ? "No Blogs" : blogs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
    logger.info("Process completed");
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id).where("state").equals(true);

    if (blog === null) {
      return res.status(200).json({
        success: true,
        data: "No Blog with that ID found",
      });
    } else {
      blog.read_count = blog.read_count + 1;
      blog = await blog.save();

      return res.status(200).json({
        success: true,
        data: blog,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.addBlog = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: "Forbidden",
      });
    } else {
      try {
        const { title, description, body, tags, timestamp } = req.body;
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

        const author = {
          id: authData.user._id,
          username: authData.user.username,
          name: `${authData.user.last_name} ${authData.user.first_name}`,
          email: authData.user.email,
        };

        const newBlog = new Blog({
          title,
          description,
          body,
          author,
          tags,
          state: false,
          read_count: 0,
          reading_time: readingTimeMinutes(body),
          author,
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
    }
  });
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
