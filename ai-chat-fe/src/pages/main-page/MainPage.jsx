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
import InactiveInput from './components/InactiveInput/MessageInput';
import { isActive } from '../../services/chat';

function MainPage() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sideMenuVisible, setSideMenuVisible] = useState(true);
  const [isActiveStatus, setIsActiveStatus] = useState(false);
  const { userData, setChatData, chatData, setUserData } = useContext(ChatContext);
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
        await selectChat(success.data);
        return success.data._id;
      }
    }
  };

  const sendDefaultMessage = async (id, text) => {
    console.log(id)
    if (text.trim() && id) {
      const messageData = { chat: id, text };
      const success = await addMessage(messageData);
      if (success) {
        const updatedMessages = await getMessagesByChatId(id);
        if (updatedMessages) {
          setMessages(updatedMessages);
        }
      }
    }
  };

  const selectChat = async (chat) => {
    console.log('select chat')
    setChatData({ currentChat: chat._id });
    console.log(chatData)
    const chatMessages = await getMessagesByChatId(chat._id);
    if (chatMessages) {
      setMessages(chatMessages);
    }
    const isActiveStatus = await isActive(chat._id);
    console.log(isActiveStatus)
    setIsActiveStatus(isActiveStatus);
  };

  const handleSendMessage = async (text) => {
    console.log('send message')
    const currentChat = chatData?.currentChat;
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
        <MessageArea messages={messages} onSendMessage={sendDefaultMessage} onAddChat={addNewChat} />
      </div>
      <div className='message-input'>
        {isActiveStatus &&
            <MessageInput onSendMessage={handleSendMessage} />
        }
        {(!isActiveStatus&&chatData?.currentChat) &&
            <InactiveInput />
        }
      </div>
    </div>
  );
}

export default MainPage;
