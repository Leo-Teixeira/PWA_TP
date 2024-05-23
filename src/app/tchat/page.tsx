'use client'
import { useEffect, useState, FormEvent } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  content: string;
  dateEmis: string;
  serverId: string;
  autorId: string;
}

let socket: Socket;

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Cette vérification assure que ce code ne s'exécute que côté client
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
      if (username) {
        
        socket = io();

        socket.on('message', (msg: Message) => {
          setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
          socket.disconnect();
        };
      }
    }
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    const msg: Message = {
      content: message,
      dateEmis: new Date().toISOString(),
      serverId: 'server1',
      autorId: username || 'unknown',
    };
    socket.emit('message', msg);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.content}</p>
            <small>{msg.dateEmis}</small>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Home;
