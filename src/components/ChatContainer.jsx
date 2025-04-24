import React from "react";
import Message from "./Message.jsx";
import InputBox from "./InputBox.jsx";
import { useGlobal } from "../context/global-context.jsx";

const ChatContainer = () => {
  const context = useGlobal();
  console.log("context", context.state);
  console.log("messages", context.state.chat);

  return (
    <div className="flex flex-col h-screen w-screen ustify-center items-center pt-8 bg-gray-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-3/4">
        {Array.isArray(context.state.chat) && context.state.chat?.map((message) => (
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
