import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";
const PORT = 4444;
const app = express();
app.use(cors());

// чтобы работал сокет io нужно чтобы наш сервер слушал модуль http, но в качестве сервера будем использовать Express
const server = createServer(app);
const SocketIO = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // адрес фронтенда (Vue, Vite)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users: any = [];

SocketIO.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("message", (data) => {
    console.log(data);

    // отправляем сообщение всем пользователям чата с сервера
    SocketIO.emit("response", data);
  });

  socket.on("newUser", (data) => {
    console.log("✌️newUser --->", data);
    users.push(data);
    SocketIO.emit("responseNewUser", users);
  });

  socket.on("disconect", () => {
    users.splice(users.indexOf(socket.id), 1);
    console.log("User disconect", socket.id);
  });

  // чтобы не висело постоянно
  socket.on("typing", (data) => {
    console.log("✌️data --->", data);
    SocketIO.emit("responseTyping", data, { broadcast: true });
  });
});

app.get("/", (req, res) => {
  res.json({ message: "ok123" });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
