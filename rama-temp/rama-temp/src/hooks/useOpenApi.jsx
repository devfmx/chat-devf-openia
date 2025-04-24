import Ollama from "ollama-js-client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useGlobal } from "../context/global-context";

function useOpenApi() {
  const ollama = useRef(
    new Ollama({
      model: "avante", // define el modelo que instalaste
      url: "http://127.0.0.1:11434/api/",
    }),
  );

  const [onLoading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState([]);
  const context = useGlobal();

  const fetchResponse = useCallback(
    async (message) => {
      setLoading(true);

      try {
        const res = await ollama?.current?.prompt(message);
        context.dispatch({
          type: "@IA_RESPONSE",
          payload: res.response,
        });
      } catch (error) {
        console.error("Error fetching response", error);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line
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
  };
}

export default useOpenApi;
