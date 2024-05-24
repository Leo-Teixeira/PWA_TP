import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import WebSocket from 'ws';
import { createServer, IncomingMessage } from 'http';

const server = createServer();

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: WebSocket.Data) => {
    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
  if (event.headers['upgrade'] && event.headers['upgrade'].toLowerCase() === 'websocket') {
    server.on('upgrade', (req: IncomingMessage, socket, head) => {
      wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
        wss.emit('connection', ws, req);
      });
    });
    
    return {
      statusCode: 101,
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
      },
      body: '',
    };
  } else {
    return {
      statusCode: 400,
      body: 'Unsupported request method',
    };
  }
};
