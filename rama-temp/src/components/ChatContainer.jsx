import React from "react";
import Message from "./Message.jsx";
import InputBox from "./InputBox.jsx";

const ChatContainer = () => {
  const messages = [
    { id: 1, text: "Hola, ¿cómo estás?", sender: "user" },
    { id: 2, text: "¡Hola! Estoy bien, ¿y tú?", sender: "bot" },
    { id: 3, text: "Estoy probando este chat. 😊", sender: "user" },
  ];

  return (
    <div className="flex flex-col h-screen w-screen ustify-center items-center pt-8 bg-gray-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-3/4">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            sender={message.sender}
          />
        ))}
      </div>

      {/* Input Box */}
      <InputBox />
    </div>
  );
};

export default ChatContainer;
