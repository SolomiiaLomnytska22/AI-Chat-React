import React, { useState } from 'react';
import './MainPage.css';
import MessageInput from './components/MessageInput/MessageInput';
import MessageArea from './components/MessageArea/MessageArea';

const messages = [
    {
      _id: '1',
      user: '123',
      chat: '456',
      text: 'Hello!',
      role: 'user',
      createdAt: '2024-06-12T10:00:00Z',
    },
    {
      _id: '2',
      user: '123',
      chat: '456',
      text: 'How can I help you? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      role: 'tool',
      createdAt: '2024-06-12T10:01:00Z',
    }
  ];

  
function MainPage() {
  const [sideMenuVisible, setSideMenuVisible] = useState(true);

  return (
    <div className={`main-page ${sideMenuVisible ? 'with-side-menu' : 'without-side-menu'}`}>
      <div className='header'> 
        <div className='title'>
            <h1>ALPHA AI</h1>
        </div>
        <div className='photo'></div>
      </div>

      {sideMenuVisible && <div className='side-menu'></div>}
      <div className='messages-container'>
        <MessageArea messages={messages}></MessageArea>
      </div>
      <div className='message-input'>
        <MessageInput />
      </div>
    </div>
  );
}

export default MainPage;
