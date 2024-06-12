import React, { useState } from 'react';
import './MainPage.css';
import MessageInput from './components/MessageInput/MessageInput';

function MainPage() {
  const [sideMenuVisible, setSideMenuVisible] = useState(true);

  return (
    <div className={`main-page ${sideMenuVisible ? 'with-side-menu' : 'without-side-menu'}`}>
      <div className='photo'></div>
      {sideMenuVisible && <div className='side-menu'></div>}
      <div className='messages-container'></div>
      <div className='message-input'>
        <MessageInput />
      </div>
    </div>
  );
}

export default MainPage;
