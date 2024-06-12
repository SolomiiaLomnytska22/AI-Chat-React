import React from 'react';
import PropTypes from 'prop-types';
import './MessageArea.css';

const MessageArea = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div 
          key={message._id} 
          className={`message ${message.role}`}
        >
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

MessageArea.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      chat: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MessageArea;
