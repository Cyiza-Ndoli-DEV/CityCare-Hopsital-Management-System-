import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  // This hook will automatically call the onClose function after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timer if the component is removed early
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const icon = type === 'success' ? <FaCheckCircle /> : null;

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-icon">{icon}</div>
      <p className="toast-message">{message}</p>
      <button className="toast-close-btn" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;