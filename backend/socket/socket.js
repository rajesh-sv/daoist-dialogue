import { Server } from "socket.io";
import http from "http";
import express from "express";

const PORT = process.env.PORT || "3000";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:${PORT}`],
    methods: ["GET", "POST"],
  },
});

// { userId: socketId }
const userSocketMap = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap.set(userId, socket.id);

  io.emit("onlineUsers", [...userSocketMap.keys()]);

  socket.on("disconnect", () => {
    userSocketMap.delete(userId);
    io.emit("onlineUsers", [...userSocketMap.keys()]);
  });
});

const getUserSocketId = (userId) => userSocketMap.get(userId);

export { app, server, io, getUserSocketId };
