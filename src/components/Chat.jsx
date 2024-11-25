import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

const Chat = () => {
  const { user, logout } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    logout({
        returnTo: 'http://localhost:3000'
    });
};

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("messageResponse");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { text: message, name: user.name });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 text-white bg-gray-800">
        <h1>Chat General</h1>
        <button onClick={handleLogout} className="p-2 bg-red-500 rounded">
          Cerrar Sesión
        </button>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="my-2">
            <strong>{msg.name}: </strong>
            {msg.text}
          </div>
        ))}
      </main>
      <footer className="p-4">
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            className="flex-1 p-2 border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            className="p-2 ml-2 text-white bg-blue-500 rounded"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
