'use client'
import React, { useEffect, useState } from 'react';
import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

interface Message {
  text: string;
  timestamp: string;
}

function Tchat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  let socket: WebSocket;

  useEffect(() => {
    io.on("connection", (socket) => {
      console.log("a user connected");
  
      socket.on("chat message", (message) => {
        console.log("message: " + message);
        io.emit("chat message", message);
      });
  
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const message: Message = {
        text: messageInput,
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(message));
      setMessageInput('');
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <span>{message.timestamp}</span> - <span>{message.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Tchat;
