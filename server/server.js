import { server as WebSocketServer } from 'websocket';
import http from 'http';
import express from "express";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconected");
  });

  socket.on("chat-message", function (message) {
    io.emit("chat-message", message);
  });
});

// webSocketServer.on('request', (request) => {
//   const connection = request.accept(null, request.origin);

//   connection.on('message', (message) => {
//     // Handle incoming WebSocket messages here
//     if (message.type === 'utf8' && message.utf8Data) {
//       console.log('Received Message:', message.utf8Data);
//       connection.sendUTF('Hello from server!');
//     }
//   });

//   connection.on('close', (reasonCode, description) => {
//     // Handle WebSocket connection closure here
//     console.log('Client has disconnected.');
//   });
// });

server.listen(3001, () => {
  console.log('WebSocket server is listening on port 3001');
});
