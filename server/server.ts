import express from 'express';
import next from 'next';
import http from 'http';
import { Server, Socket } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(4620, (err?: Error) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:4620');
  });
});
