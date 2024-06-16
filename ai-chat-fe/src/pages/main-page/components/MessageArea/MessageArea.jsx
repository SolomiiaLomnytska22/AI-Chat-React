import React from 'react';
import './MessageArea.css';
import ReactMarkdown from 'react-markdown';

const MessageArea = ({ messages }) => {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return date.toLocaleString('en-US', options);
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div 
          key={message._id} 
          className={`message ${message.role}`}
        >
          <ReactMarkdown>{message.text}</ReactMarkdown>
          <div className="message-date">{formatDateTime(message.createdAt)}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageArea;
