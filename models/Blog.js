const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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
  // state: {
  //   type: String,
  //   required: true,
  // },
  // read_count: {
  //   type: Number,
  //   required: true,
  // },
  // reading_time: {
  //   type: String,
  //   required: true,
  // },
  // timestamp: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
