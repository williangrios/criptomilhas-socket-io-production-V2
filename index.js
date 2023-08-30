const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  } else {
    console.log("nao inseriu pois já estava dentro");
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const io = new Server(server, {
  cors: {
    // origin: "*",
    // origin: "http://localhost:3000",
    // origin: "https://criptomilhas.com.br",
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

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
    console.log("all users addUser", users);
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
      console.log("all user send message", users);
    }
  );

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// app.get("/", (req, res) => { 
//   res.send("Server is running............");
// });

server.listen(443, () => {
  console.log("SERVER RUNNING", server.address());
});
