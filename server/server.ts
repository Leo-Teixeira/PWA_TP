import { server as WebSocketServer, request as WebSocketRequest, connection as WebSocketConnection, Message } from 'websocket';
import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  // Handle HTTP requests here
  response.writeHead(404);
  response.end();
});

const webSocketServer = new WebSocketServer({
  httpServer: server,
});

webSocketServer.on('request', (request: WebSocketRequest) => {
  const connection = request.accept(null, request.origin);

  connection.on('message', (message: Message) => {
    // Handle incoming WebSocket messages here
    if (message.type === 'utf8' && message.utf8Data) {
      console.log('Received Message:', message.utf8Data);
      connection.sendUTF('Hello from server!');
    }
  });

  connection.on('close', (reasonCode: number, description: string) => {
    // Handle WebSocket connection closure here
    console.log('Client has disconnected.');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server is listening on port 3001');
});
