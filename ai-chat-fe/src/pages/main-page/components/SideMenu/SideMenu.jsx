import React, { useState, useContext } from 'react';
import './SideMenu.css';
import { ChatContext } from '../../../../context/ContextProvider'; 
import { completeLogout } from '../../../../services/login';
import { useNavigate } from 'react-router-dom';


const SideMenu = (props) => {
    const { setChatData, chatData } = useContext(ChatContext);
    const [newChatName, setNewChatName] = useState('');
    const navigate = useNavigate()

    const addNewChat = () => {
        setNewChatName('');
        props.handleClick(newChatName);
    };

    const selectChat = (chat) => () => {
        setChatData({ currentChat: chat._id });
        props.onSelectChat(chat);
    };

    const handleLogout = () =>{
        completeLogout()
        navigate('/')
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
                    {props.chats.map((chat) => (
                        <li key={chat._id} className={`chatItem ${
                            chatData?.currentChat === chat._id ? 'current' : ''
                        }`} onClick={selectChat(chat)}>{chat.name}</li>
                    ))}
                </ul>
            </div>
            <div className="log-out" onClick={handleLogout}>
                Log Out
            </div>
        </div>
    );
};

export default SideMenu;
