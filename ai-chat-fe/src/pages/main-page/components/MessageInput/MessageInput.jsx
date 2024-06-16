import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim())
      setInputValue('');
    }
  };

  return (
    <div className="custom-text-input-container">
      <textarea
        className="custom-text-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Write you prompt..."
      />
      <button className="send-button" onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default MessageInput;
