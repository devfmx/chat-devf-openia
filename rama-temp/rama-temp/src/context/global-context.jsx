import * as React from "react";
const GlobalContext = React.createContext();

const storage = {
  chat: [],
};

function globalReducer(state, action) {
  switch (action.type) {
    // guarda el chat actual en el historial
    case "@IA_RESPONSE": {
      const payload = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: action.payload,
      };
      return {
        ...state,
        chat: [...state.chat, payload],
      };
    }
    case "@USER_MESSAGE": {
      const payload = {
        id: crypto.randomUUID(),
        sender: "user",
        text: action.payload,
      };
      return {
        ...state,
        chat: [...state.chat, payload],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GlobalProvider({ children }) {
  const [state, dispatch] = React.useReducer(globalReducer, storage);
  const value = { state, dispatch };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useGlobal() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }

  return context;
}

// eslint-disable-next-line
export { GlobalProvider, useGlobal };
