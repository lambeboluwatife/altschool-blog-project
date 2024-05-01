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
    const { title, description, body, author, tags } = req.body;
    // function calculateReadingTime(text) {
    //   const wordsPerMinute = 200;
    //   const wordCount = text.split(/\s+/).length;
    //   const readingTime = Math.ceil(wordCount / wordsPerMinute);
    //   return readingTime;
    // }
    // const readingTime = calculateReadingTime(req.body.body);
    // const newBlog = {
    //   title,
    //   description,
    //   body,
    //   author,
    //   tags,
    //   state: "not published",
    //   read_count: 0,
    //   reading_time: readingTime,
    //   timestamp,
    // };
    const blog = await Blog.create(req.body);
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
        error: "Server Error",
      });
    }
  }
};
