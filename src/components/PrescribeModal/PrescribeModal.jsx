import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './PrescribeModal.css';

// The component now accepts an `onSaveSuccess` prop instead of `onClose`
const PrescribeModal = ({ patient, onSaveSuccess }) => {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Prescription saved!");
    // This now signals the parent component that the save was successful
    onSaveSuccess();
  };

  return (
    <div className="prescribe-modal-content">
      {/* Patient Header */}
      <div className="prescription-header">
        <img src="https://i.pravatar.cc/150?u=rwaga" alt={patient.name} className="prescription-avatar" />
        <div className="prescription-patient-info">
          <h3>{patient.name}</h3>
          <p>DOB: 2000/20/11</p>
        </div>
      </div>

      {/* Prescription Form */}
      <form onSubmit={handleSubmit} className="prescription-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="medication">Medication</label>
            <input type="text" id="medication" placeholder="e.g Paracetamol 500mg Tablet" />
          </div>
          <div className="form-group">
            <label htmlFor="services">Additional services</label>
            <input type="text" id="services" />
          </div>
          <div className="form-group full-width">
            <label htmlFor="directions">Directions</label>
            <textarea id="directions" placeholder="e.g Take one tablet after every 6 hours orally" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" defaultValue="30" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message (optional)</label>
            <input type="text" id="message" />
          </div>
        </div>
        <div className="prescription-footer">
          <button type="submit" className="save-prescription-btn">
            <FaPaperPlane /> Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescribeModal;