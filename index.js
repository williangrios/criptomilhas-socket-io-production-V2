const { addUser, removeUserBySocketId, getUser, users} = require('./users.js')
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
// const cors = require("cors");

const PORT = process.env.PORT || 8900

const app = express();
const server = http.createServer(app);
const router = require('./router');
app.use(router);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.criptomilhas.com.br');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const io = socketio(server,   {cors: {
  origin: "https://www.criptomilhas.com.br", // Substitua pelo domínio onde seu código está sendo executado 
  // origin: "*", // Substitua pelo domínio onde seu código está sendo executado...
  methods: ["GET", "POST", "OPTIONS"]
}})

// const io = new Server(server);

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
