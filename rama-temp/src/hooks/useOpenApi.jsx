import Ollama from "ollama-js-client";
import { useState, useEffect, useCallback, useRef } from "react";

function useOpenApi() {
  const ollama = useRef(
    new Ollama({
      model: "avante", // define el modelo que instalaste
      url: "http://127.0.0.1:11434/api/",
    }),
  );
  const [onLoading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState([]);
  const [ollamaResp, setOllamaResp] = useState(null);

  const fetchResponse = useCallback(
    async (message) => {
      setLoading(true);
      const on_response = (err, resp) => {
        if (err) {
          console.error(err);
        } else if (resp.done) {
          // paramos el loading por que termino de analizar nuestra respuesta
          setLoading(false);
        } else {
          // almacenamos la respuesta en el estado para intentar mostrar el chat en stream como si fuera un chat real
          setOllamaResp((prev) => [...(prev || []), resp.response]);
        }
      };

      await ollama?.current?.prompt_stream(message, on_response);
    },
    [ollama],
  );

  const handleSendMessage = (message) => {
    setUserMessage(message);
  };

  useEffect(() => {
    if (userMessage.length > 0) {
      fetchResponse(userMessage);
    }
  }, [userMessage, fetchResponse]);

  return {
    onLoading,
    handleSendMessage,
    response: ollamaResp,
  };
}

export default useOpenApi;
