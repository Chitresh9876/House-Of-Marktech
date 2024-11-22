const Chat = require("../models/Chat"); // Assuming a Chat model exists
const User = require("../models/User");

// Save chat messages to the database
exports.saveMessage = async (messageData) => {
  try {
    const { senderId, receiverId, message } = messageData;
    const chat = await Chat.create({
      sender: senderId,
      receiver: receiverId,
      message,
    });
    return chat;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw new Error("Failed to save chat message");
  }
};

// Fetch chat history between two users
exports.getChatHistory = async (req, res) => {
  const { userId } = req.user; // Current logged-in user
  const { otherUserId } = req.params; // User to fetch chat with

  try {
    const chats = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: 1 }); // Sort by oldest to newest

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};
