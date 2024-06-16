import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './MainPage.css';
import MessageInput from './components/MessageInput/MessageInput';
import MessageArea from './components/MessageArea/MessageArea';
import SideMenu from './components/SideMenu/SideMenu';
import { ChatContext } from '../../context/ContextProvider'; 
import { getUser } from '../../services/accessToken';
import { getAllChats, addChat } from '../../services/chat';
import { getMessagesByChatId, addMessage } from '../../services/message';

function MainPage() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sideMenuVisible, setSideMenuVisible] = useState(true);
  const { userData, setChatData, chatData } = useContext(ChatContext);
  const { setUserData } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUserData(userData);
    }
    else {
      navigate('/login');
    }
  
    const fetchChats = async () => {
      const allChats = await getAllChats();
      if (allChats) {
        setChats(allChats);
      }
    };

    fetchChats();
  }, [navigate, setUserData]);

  const addNewChat = async (chatName) => {
    if (chatName.trim()) {
      const success = await addChat(chatName);
      if (success) {
        const allChats = await getAllChats();
        if (allChats) {
          setChats(allChats);
        }
        selectChat(success.data)
      }
    }
  };

  const selectChat = async (chat) => {
    setChatData({ currentChat: chat._id });
    const chatMessages = await getMessagesByChatId(chat._id);
    if (chatMessages) {
      setMessages(chatMessages);
    }
  };

  const handleSendMessage = async (text) => {
    const currentChat = chatData.currentChat;
    if (text.trim() && currentChat) {
      const messageData = { chat: currentChat, text };
      const success = await addMessage(messageData);
      if (success) {
        const updatedMessages = await getMessagesByChatId(currentChat);
        if (updatedMessages) {
          setMessages(updatedMessages);
        }
      }
    }
  };

  return (
    <div className={`main-page ${sideMenuVisible ? 'with-side-menu' : 'without-side-menu'}`}>
      <div className='header'> 
        <div className='title'>
            <h1>ALPHA AI</h1>
        </div>
        <div className='photo'>
          <img src={userData?.profilePictureUrl || 'https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-icon-isolated-on-abstract-background-png-image_5192004.jpg'} alt="Profile" /> {/* Use user profile picture */}
        </div>
      </div>

      {sideMenuVisible && <div className='side-menu'>
        <SideMenu chats={chats} handleClick={addNewChat} onSelectChat={selectChat} />
      </div>}
      <div className='messages-container'>
        <MessageArea messages={messages} />
      </div>
      <div className='message-input'>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default MainPage;
