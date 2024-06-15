import React, { useState } from 'react';
import './SideMenu.css';

const SideMenu = (props) => {
    
    const [newChatName, setNewChatName] = useState('');
  
    const addNewChat = ()=>{
        setNewChatName('')
        props.handleClick(newChatName)
    }

  return (
    <div>
      <h2 className="side-header">Recent</h2>
      <div className="addChatContainer">
        <input
          type="text"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          placeholder="New chat name"
          className="input"
        />
        <button onClick={addNewChat} className="button">Add New Chat</button>
      </div>

      <div className="container">
      <ul className="chatList">
        {props.chats.map((chat, index) => (
          <li key={index} className="chatItem">{chat}</li>
        ))}
      </ul>
     </div>
     
    </div>
    
  );
};

export default SideMenu;
