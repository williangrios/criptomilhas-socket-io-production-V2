const { addUser, removeUserBySocketId, getUser, users} = require('./users.js')
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 204,
}));

const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on(
    "sendMessage",
    ({ conversationId, senderId, receiverId, text, attachedImage, personalizedProposalId }) => {
      const user = getUser(receiverId);
      if (!user ) {
        return
      }
      io.to(user?.socketId).emit("getMessage", {
        conversationId,
        senderId,
        text,
        attachedImage,
        personalizedProposalId
      });
    }
  );

  socket.on("disconnect", () => {
    removeUserBySocketId(socket.id)
    io.emit("getUsers", users);
  });
});

server.listen(PORT, () => {
  console.log("SERVER RUNNING:", server.address(), ' PORT:', PORT);
});
