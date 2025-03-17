import React from 'react';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default App;
