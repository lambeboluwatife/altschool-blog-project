const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a blog title"],
  },
  description: {
    type: String,
    required: [true, "Please enter blog description"],
  },
  body: {
    type: String,
    required: [true, "Please enter blog contents or body"],
  },
  author: {
    type: String,
    required: [true, "Please enter blog author"],
  },
  tags: {
    type: String,
    required: [true, "Please add tag(s)"],
  },
  state: {
    type: Boolean,
    required: true,
  },
  read_count: {
    type: Number,
    required: true,
  },
  reading_time: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
