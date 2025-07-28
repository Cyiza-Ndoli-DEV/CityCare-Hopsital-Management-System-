import React from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaStethoscope, FaSave } from 'react-icons/fa';
import './AddAppointmentModal.css';

// It now accepts a new prop: onSaveSuccess
const AddAppointmentModal = ({ onClose, onSaveSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. Call the new success function passed from the parent
    onSaveSuccess("Appointment saved successfully! The patient will be notified.");
    // 2. The modal still closes itself
    onClose();
  };

  return (
    <div className="add-appointment-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patient"><FaUser /> Patient Name</label>
          <input type="text" id="patient" placeholder="Enter patient name or ID" required />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentType"><FaStethoscope /> Appointment Type</label>
          <select id="appointmentType" required>
            <option value="">Select type</option>
            <option value="checkup">Patient Checkup</option>
            <option value="cleaning">Root Cleaning</option>
            <option value="scaling">Scaling</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date"><FaCalendarAlt /> Date</label>
            <input type="date" id="date" required />
          </div>
          <div className="form-group">
            <label htmlFor="time"><FaClock /> Time</label>
            <input type="time" id="time" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea id="notes" rows="4" placeholder="Add any relevant notes here..."></textarea>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-save">
            <FaSave /> Save Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointmentModal;