const { addUser, removeUser, getUser, users} = require('./users.js')
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 8900

const app = express();
const server = http.createServer(app);
app.use(cors());
const router = require('./router');
app.use(router);

const io = socketio(server,   {cors: {
  origin: "https://criptomilhas.com.br", // Substitua pelo domínio onde seu código está sendo executado
  methods: ["GET", "POST"]
}})

// const io = new Server(server);

io.on("connection", (socket) => {
  // exemplo de como enviar credenciai
  // https://socket.io/docs/v4/middlewares/
  // middleware
  // socket.use(([event, ...args], next) => {
  //   if (isUnauthorized(event)) {
  //     return next(new Error("unauthorized event"));
  //   }
  //   next();
  // });
  // io.use((socket, next) => {
  //   if (isValid(socket.request)) {
  //     next();
  //   } else {
  //     next(new Error("invalid"));
  //   }
  // });
  console.log(`User Connected: ${socket.id}`);
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on(
    "sendMessage",
    ({ conversationId, senderId, receiverId, text, attachedImage }) => {
      const user = getUser(receiverId);
      io.to(user?.socketId).emit("getMessage", {
        // ?
        conversationId,
        senderId,
        text,
        attachedImage,
      });
    }
  );

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id)
    removeUser(socket.id)
  });
});

server.listen(PORT, () => {
  console.log("SERVER RUNNING:", server.address(), ' PORT:', PORT);
});
