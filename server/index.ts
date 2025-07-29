import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = 4444;

const app = express();
app.use(cors());

// чтобы работал сокет io нужно чтобы наш сервер слушал модуль http, но в качестве сервера будем использовать Express
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // адрес фронтенда (Vue, Vite)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconect", () => {
    console.log("User disconect", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "ok123" });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
