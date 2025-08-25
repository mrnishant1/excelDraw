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
//All message handle by the handle message function---------------------
  function handleMessages(msg: string) {
    console.log("message from client:", msg);
    // const message_recieved:{userId:string, roomId: string, type: ChatType, content:string} = JSON.parse(msg);
    broadcastMessage(socket, msg);
  }

  console.log("a user connected:", socket.id);
  socket.on("message", handleMessages);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });


});

httpserver.listen(4000, () => {
  console.log("Socket.IO server running on http://localhost:4000");
});

function broadcastMessage(socket: Socket, msg: string) {
  console.log("message broadcasted from backend")
  socket.broadcast.emit("message", msg);
}
