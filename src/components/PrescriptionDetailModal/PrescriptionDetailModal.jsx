// src/components/PrescriptionDetailModal/PrescriptionDetailModal.jsx

import React from "react";
import { FaUserMd, FaCalendarAlt, FaNotesMedical, FaCapsules, FaUser, FaInfoCircle } from "react-icons/fa";
import "./PrescriptionDetailModal.css";

const PrescriptionDetailModal = ({ prescription, onClose }) => {
  if (!prescription) return null;

  return (
    <div className="prescription-detail-modal">
      <div className="modal-bg" onClick={onClose}>
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
          <h3>Prescription Details</h3>
          <div className="modal-section">
            <b>RX Number:</b> {prescription.rx}
          </div>
          <div className="modal-section">
            <b>Patient:</b> <FaUser style={{marginRight: 5, color:"#1e40af"}} /> {prescription.patient} <span className="pill pill-id">ID: {prescription.id}</span>
          </div>
          <div className="modal-section">
            <b>Age/Gender:</b> {prescription.age} / {prescription.gender}
          </div>
          <div className="modal-section">
            <b>Medication:</b> <FaCapsules style={{marginRight: 5, color:"#059669"}} /> {prescription.med}
          </div>
          <div className="modal-section">
            <b>Prescribing Doctor:</b> <FaUserMd style={{marginRight: 5, color:"#a21caf"}} /> {prescription.doctor}
          </div>
          <div className="modal-section">
            <b>Issue Date:</b> <FaCalendarAlt style={{marginRight: 5, color:"#f59e42"}} /> {prescription.issueDate}
          </div>
          <div className="modal-section">
            <b>Status:</b> <span className={`status-pill status-${prescription.status}`}>{prescription.status}</span>
          </div>
          <div className="modal-section">
            <b>Pickup Code:</b> <span className="pill pill-pickup">{prescription.pickupCode}</span>
          </div>
          <div className="modal-section">
            <b>Allergies:</b> <span className="pill pill-allergy">{prescription.allergies}</span>
          </div>
          <div className="modal-section">
            <b>Notes:</b> <FaNotesMedical style={{marginRight: 5, color:"#eab308"}} /> {prescription.notes}
          </div>
          <div className="modal-actions">
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetailModal;