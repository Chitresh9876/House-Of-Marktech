const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { saveMessage } = require("./controllers/chatController");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for incoming chat messages
  socket.on("chatMessage", async (messageData) => {
    try {
      // Save message to database
      const savedMessage = await saveMessage(messageData);

      // Emit the message to both the sender and receiver
      io.to(messageData.senderId).emit("newMessage", savedMessage);
      io.to(messageData.receiverId).emit("newMessage", savedMessage);
    } catch (error) {
      console.error("Error handling chat message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Connect to DB and start server
connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
