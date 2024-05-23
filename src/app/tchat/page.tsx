// 'use client'
// import React, { useEffect, useState } from 'react';

// interface Message {
//   text: string;
//   timestamp: string;
// }

// function Tchat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [messageInput, setMessageInput] = useState<string>('');
//   let socket: WebSocket;

//   useEffect(() => {
//     socket = new WebSocket('wss://plac.netlify.app/.netlify/functions/websocket');

//     socket.onopen = () => {
//       console.log('WebSocket connection established.');
//     };

//     socket.onmessage = (event) => {
//       const receivedMessage: Message = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (messageInput.trim() !== '') {
//       const message: Message = {
//         text: messageInput,
//         timestamp: new Date().toISOString(),
//       };
//       socket.send(JSON.stringify(message));
//       setMessageInput('');
//     }
//   };

//   return (
//     <div className="App">
//       <div className="chat-container">
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div key={index} className="message">
//               <span>{message.timestamp}</span> - <span>{message.text}</span>
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Tchat;
