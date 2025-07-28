import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './SuccessMessage.css';

const SuccessMessage = ({ title, message, onClose }) => {
  return (
    <div className="success-message-container">
      <div className="success-icon-wrapper">
        <FaCheckCircle className="success-icon" />
      </div>
      <h3 className="success-title">{title}</h3>
      <p className="success-message">{message}</p>
      <button className="success-ok-btn" onClick={onClose}>
        OK
      </button>
    </div>
  );
};

export default SuccessMessage;