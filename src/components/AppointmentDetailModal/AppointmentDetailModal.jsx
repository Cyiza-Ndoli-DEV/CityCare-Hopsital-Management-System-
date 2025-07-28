// src/components/AppointmentDetailModal/AppointmentDetailModal.jsx
import React from 'react';
import { FaUser, FaClock, FaStethoscope, FaClipboardList, FaCalendarDay } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import './AppointmentDetailModal.css';

const AppointmentDetailModal = ({ appointment, isOpen, onClose }) => {
  if (!appointment) return null;

  return (
    <Modal 
      title="Appointment Details" 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className="appointment-detail-modal">
        <div className="detail-header">
          <div className="detail-icon">
            <FaStethoscope />
          </div>
          <div className="detail-title">
            <h3>{appointment.patientName}'s Appointment</h3>
            <p>ID: {appointment.id}</p>
          </div>
        </div>
        <div className="detail-body">
          <div className="detail-item">
            <span className="detail-label"><FaUser /> Patient Name</span>
            <span className="detail-value">{appointment.patientName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"><FaStethoscope /> Doctor</span>
            <span className="detail-value">{appointment.doctorName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"><FaCalendarDay /> Date</span>
            <span className="detail-value">{appointment.date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"><FaClock /> Time</span>
            <span className="detail-value">{appointment.time}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className={`detail-value status-badge status-${appointment.status.toLowerCase()}`}>
              {appointment.status}
            </span>
          </div>
          <div className="detail-item full-width">
            <span className="detail-label"><FaClipboardList /> Notes</span>
            <p className="detail-notes">
              {appointment.notes || 'No additional notes provided for this appointment.'}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentDetailModal;