import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

const Chat = () => {
  const { user, logout } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

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
      <header className="bg-gray-800 text-white p-4">
        <h1>Chat General</h1>
        <button onClick={() => logout()} className="bg-red-500 p-2 rounded">
          Cerrar Sesión
        </button>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
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
            className="border p-2 flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
