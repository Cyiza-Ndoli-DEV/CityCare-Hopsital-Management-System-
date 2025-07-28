import React from 'react';
import { FaUserMd, FaCalendarAlt, FaNotesMedical, FaPills, FaStethoscope } from 'react-icons/fa';
import './MedicalRecordDetailModal.css';

const MedicalRecordDetailModal = ({ record }) => {
  if (!record) {
    return null;
  }

  // Adding more mock details for a richer display
  const details = {
    doctor: 'Dr. Ssekamatte',
    symptoms: 'Patient reported high fever, headache, and body weakness.',
    doctorNotes: 'Physical examination confirmed symptoms consistent with Malaria. Recommended complete course of Amoxycilin and adequate rest.',
    prescription: 'Amoxycilin 500mg - 1 tablet every 8 hours for 7 days.'
  };

  return (
    <div className="record-detail-content">
      <div className="record-detail-header">
        <h2>{record.diagnosis} Details</h2>
      </div>
      <div className="record-detail-body">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label"><FaUserMd /> Attending Doctor</span>
            <span className="detail-value">{details.doctor}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"><FaCalendarAlt /> Visit Date</span>
            <span className="detail-value">{record.date}</span>
          </div>
        </div>
        <div className="detail-section">
          <h4><FaNotesMedical /> Patient Reported Symptoms</h4>
          <p>{details.symptoms}</p>
        </div>
        <div className="detail-section">
          <h4><FaStethoscope /> Doctor's Notes</h4>
          <p>{details.doctorNotes}</p>
        </div>
        <div className="detail-section">
          <h4><FaPills /> Prescription Issued</h4>
          <p>{details.prescription}</p>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetailModal;