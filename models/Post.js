const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  media: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
