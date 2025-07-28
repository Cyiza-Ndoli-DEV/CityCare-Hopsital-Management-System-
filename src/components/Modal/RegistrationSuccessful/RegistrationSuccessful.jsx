// src/components/Modal/RegistrationSuccessful/RegistrationSuccessful.jsx
import React from 'react';
import Modal from '../Modal';
import { FaCircleCheck, FaRegPaperPlane, FaCalendarPlus } from 'react-icons/fa6';
import './RegistrationSuccessful.css';


function RegistrationSuccessful({ isOpen, onClose, }) {  {/*onBookAppointment*/ }

  const handleCloseAndReset = () => {
   
    onClose(); 
  };
  
  return(
    //   My reusable Modal component and give it a specific className
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title="" 
        className="success-modal"
    >
        <div className="success-modal-content">
            <div className="success-icon-wrapper">
                <FaCircleCheck className="success-icon" />
            </div>
            <h2 className="success-title">Registration Successful</h2>
            <p className="success-subtitle">Patient mudenge alain has been created</p>

            <div className="assigned-id-box">
                <span>ASSIGNED PATIENT ID:</span>
                <strong>PID-2025-2329</strong>
            </div>
            
            <div className="info-box">
                <FaRegPaperPlane />
                <span>Patient ID Also Sent To The Patient's Email Address Or Phone Number</span>
            </div>

            <div className="success-actions">
                {/* <button className="success-btn book-btn" onClick={onBookAppointment}>
                    <FaCalendarPlus /> Book Appointment
                </button> */}
                <button className="success-btn close-btn" onClick={handleCloseAndReset}>
                    Close & New Registration
                </button>
            </div>
        </div>
    </Modal>
  );
}

export default RegistrationSuccessful;