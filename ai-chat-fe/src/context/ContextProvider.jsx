import React, { createContext, useState } from 'react';
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); 
  const [chatData, setChatData] = useState(null); 
  return (
    <ChatContext.Provider value={{ userData, setUserData, chatData, setChatData }}>
      {children}
    </ChatContext.Provider>
  );
};
