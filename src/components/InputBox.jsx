import React, { useState } from 'react';

const InputBox = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Mensaje enviado:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex w-3/4 bg-[#404045] text-white rounded-2xl py-4 my-4 items-end" >
      <textarea
        className="ml-2 flex-1 p-2 resize-none focus:outline-none"
        placeholder="Escribe tu mensaje..."
        // value={inputValue}
        onChange={(e) => setMessage(e.target.value)}
        // onKeyPress={handleKeyPress}
      />
      <button
        className="bg-[#71717A] hover:bg-gray-600 text-white font-semibold h-10 w-10 p-2 flex justify-center rounded-full ml-2 mr-2 cursor-pointer"
        onClick={handleSendMessage}
      >
        <img src="/send-icon.svg" alt="Enviar" />
      </button>
    </div >
  );
};

export default InputBox;
