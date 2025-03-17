import React from "react";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import { GlobalProvider } from "./context/global-context";

const App = () => {
  return (
    <div className="flex h-screen">
      <GlobalProvider>
        <Sidebar />
        <ChatContainer />
      </GlobalProvider>
    </div>
  );
};

export default App;
