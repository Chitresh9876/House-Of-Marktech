const express = require("express");
const { getChatHistory } = require("../controllers/chatController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to fetch chat history between the authenticated user and another user
router.get("/chat/:otherUserId", authenticate, getChatHistory);

module.exports = router;
