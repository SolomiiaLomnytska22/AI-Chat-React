import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './MessageInput.css';

const InactiveInput = () => {
  return (
    <div className="inactive-text-input-container">
      <textarea
        className="inactive-text-input"
        placeholder="This chat is in history mode. Create new chat to get your questions answered."
        disabled
      />
      <button className="inactive-send-button">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default InactiveInput;
