import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

app.use(express.static(path.join(__dirname, 'build')));
// Créer le serveur HTTP
const httpServer = createServer(app);
const PORT = 4620;
app.use(cors());


// Créer le serveur Socket.io
const io = new SocketIOServer(httpServer, {
    cors: {
      origin: 'plac.netlify.app',
      methods: ['GET', 'POST'],
    },
  });

// Démarrer le serveur HTTP
httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

app.get('/test', (req, res) => {
    res.send('Hello world');
  });

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }); 

// Gérer les connexions Socket.io
io.on('connection', (socket) => {
  console.log('new client connected');
  // Ajouter ici d'autres gestionnaires d'événements pour le socket
});