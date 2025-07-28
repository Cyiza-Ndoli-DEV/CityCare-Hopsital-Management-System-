// src/components/Modal/Modal.jsx
import React from 'react';
import './Modal.css';
import { FaXmark } from "react-icons/fa6";

// The `children` prop is where we will put our form content
function Modal({ title, isOpen, onClose, children }) {
    if (!isOpen) {
        return null; // Don't render anything if the modal is not open
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button onClick={onClose} className="modal-close-button">
                        <FaXmark />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;