// src/components/BookingSuccessModal/BookingSuccessModal.jsx

import React from 'react';
import Modal from '../Modal/Modal';
// 1. We need the Doctor icon and the bell icon for the reminder message
import { FaCircleCheck, FaUser, FaClock, FaUserDoctor, FaRegBell } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './BookingSuccessModal.css';

function BookingSuccessModal({ isOpen, onClose }) {
  // Mock data for the doctor for our demonstration
  const doctorName = 'Dr. Byiringiro';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" className="booking-success-modal">
      <div className="booking-success-wrapper">
        <div className="success-icon-container">
          <FaCircleCheck />
        </div>
        <h2 className="success-title">Appointment created successfully!</h2>
        
        <div className="appointment-summary-card">
          <div className="summary-item">
            <FaUser className="summary-icon" />
            <div className="summary-details">
              <span>Patient Name</span>
              <strong>Mugisha Alain</strong>
            </div>
          </div>
          <div className="summary-item">
            <FaRegCalendarAlt className="summary-icon" />
            <div className="summary-details">
              <span>Date</span>
              <strong>Tuesday, 17/12/2024</strong>
            </div>
          </div>
          <div className="summary-item">
            <FaClock className="summary-icon" />
            <div className="summary-details">
              <span>Time</span>
              <strong>09:00AM - 09:40AM</strong>
            </div>
          </div>
          {/* 2. Add the new Doctor summary item */}
          <div className="summary-item">
            <FaUserDoctor className="summary-icon" />
            <div className="summary-details">
              <span>Doctor</span>
              <strong>{doctorName}</strong>
            </div>
          </div>
        </div>

        {/* 3. Add the final reminder message */}
        <div className="reminder-message">
          <FaRegBell />
          <span>Patient will be sent a reminder a day before the appointment.</span>
        </div>
        
        <button className="ok-button" onClick={onClose}>
          OK
        </button>
      </div>
    </Modal>
  );
}

export default BookingSuccessModal;