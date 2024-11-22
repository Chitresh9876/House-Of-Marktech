const express = require("express");
const {
  createPost,
  getPosts,
  addComment,
} = require("../controllers/postController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/posts", authenticate, createPost);
router.get("/posts", getPosts);
router.post("/comments", authenticate, addComment);

module.exports = router;
