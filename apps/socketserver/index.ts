import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from "express";
//Message type Backend recieves
enum ChatType {
  TEXT,
  DRAWING,
  IMAGE,
  FILE,
}

const app = express();
const httpserver = createServer(app);

//creation of new WS sever---------------------------
const io = new Server(httpserver, {
  cors: {
    origin: "http://localhost:3000", // your Next.js frontend
    methods: ["GET", "POST"],
  },
});
//A connection of client to WS server as socket------------------
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on('joinRoom',(roomId)=>{
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  })


  socket.on("sendMessage", ({ roomId, message }) => {
     console.log("message came on socketserver index.ts")
    socket.to(roomId).emit("message", message);
  });



  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});





httpserver.listen(4000, () => {
  console.log("Socket.IO server running on http://localhost:4000");
});
