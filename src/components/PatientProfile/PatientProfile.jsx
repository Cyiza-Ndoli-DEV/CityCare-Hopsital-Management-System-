import React, { useState } from 'react';
import { FaFileMedical, FaIdCard, FaCalendar, FaStethoscope, FaUser, FaVenusMars, FaPhone, FaEnvelope, FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import PrescribeModal from '../PrescribeModal/PrescribeModal';
import MedicalRecordDetailModal from '../MedicalRecordDetailModal/MedicalRecordDetailModal';
import SuccessMessage from '../SuccessMessage/SuccessMessage'; // 1. Import our new SuccessMessage component
import './PatientProfile.css';

const PatientProfile = ({ patient }) => {
  // State for tabs and modals
  const [activeTab, setActiveTab] = useState('Medical History');
  const [isPrescribeModalOpen, setIsPrescribeModalOpen] = useState(false);
  const [isRecordDetailOpen, setIsRecordDetailOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  // 2. Add state for the new success modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!patient) {
    return null;
  }

  // Mock data
  const medicalHistory = [
    { date: '2023-09-09', diagnosis: 'Malaria', treatment: 'Amoxycilin' },
    { date: '2023-06-15', diagnosis: 'Common Cold', treatment: 'Rest and Fluids' },
    { date: '2023-02-28', diagnosis: 'Sprained Ankle', treatment: 'Ibuprofen and Ice' },
  ];

  const handleViewRecordDetails = (record) => {
    setSelectedRecord(record);
    setIsRecordDetailOpen(true);
  };

  // 3. Handler to manage the workflow after a prescription is saved
  const handleSavePrescription = () => {
    setIsPrescribeModalOpen(false); // Close the prescription form
    setIsSuccessModalOpen(true);  // Open the success message
  };

  return (
    <>
      <div className="patient-profile-content">
        {/* Top Header Card */}
        <div className="profile-header-card">
          <div className="patient-avatar">
            <img src="https://i.pravatar.cc/150?u=rwaga" alt={patient.name} />
          </div>
          <div className="patient-summary">
            <h2>{patient.name}</h2>
            <p><FaIdCard className="summary-icon" /> Patient ID: {patient.id}</p>
            <p><FaCalendar className="summary-icon" /> DOB: 08/09/2000 ({patient.age} yrs)</p>
          </div>
          <button className="prescribe-btn" onClick={() => setIsPrescribeModalOpen(true)}>
            <FaStethoscope />
            Prescribe
          </button>
        </div>

        {/* Interactive Tabs */}
        <div className="profile-tabs">
          <button className={`tab-btn ${activeTab === 'Medical History' ? 'active' : ''}`} onClick={() => setActiveTab('Medical History')}>
            Medical History
          </button>
          <button className={`tab-btn ${activeTab === 'Patient Info' ? 'active' : ''}`} onClick={() => setActiveTab('Patient Info')}>
            Patient Info
          </button>
        </div>

        {/* Body content */}
        <div className="profile-body">
          {activeTab === 'Medical History' && (
            <div className="medical-records-section">
              <h3>Medical records</h3>
              <div className="records-list">
                {medicalHistory.map((record, index) => (
                  <div key={index} className="record-item">
                    <span className="record-date">{record.date}</span>
                    <div className="record-details">
                      <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                      <p><strong>Treatment:</strong> {record.treatment}</p>
                    </div>
                    <button className="view-details-btn" onClick={() => handleViewRecordDetails(record)}>
                      <FaFileMedical /> View details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

            {activeTab === 'Patient Info' && (
            <div className="patient-info-section">
              <h3>Patient Information</h3>
              <div className="info-grid">
                <div className="info-item"><span className="info-label"><FaUser /> Full Name</span><span className="info-value">{patient.name}</span></div>
                <div className="info-item"><span className="info-label"><FaVenusMars /> Gender</span><span className="info-value">{patient.gender}</span></div>
                <div className="info-item"><span className="info-label"><FaCalendar /> Date of Birth</span><span className="info-value">08/09/2000</span></div>
                <div className="info-item"><span className="info-label"><FaPhone /> Phone Number</span><span className="info-value">+256 772 123 456</span></div>
                <div className="info-item"><span className="info-label"><FaEnvelope /> Email Address</span><span className="info-value">rwaga.p@email.com</span></div>
                <div className="info-item"><span className="info-label"><FaMapMarkerAlt /> Address</span><span className="info-value">123 Wellness Ave, Kampala</span></div>
              </div>
              <h3>Emergency Contact</h3>
              <div className="info-grid">
                <div className="info-item"><span className="info-label"><FaUser /> Contact Name</span><span className="info-value">Jane Doe</span></div>
                <div className="info-item"><span className="info-label"><FaPhone /> Contact Phone</span><span className="info-value">+256 772 789 101</span></div>
                <div className="info-item full-width"><span className="info-label"><FaExclamationTriangle /> Known Allergies</span><span className="info-value">Penicillin</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Prescription Modal */}
      <Modal
        title={`New Prescription for ${patient.name} ID(${patient.id})`}
        isOpen={isPrescribeModalOpen}
        onClose={() => setIsPrescribeModalOpen(false)}
      >
        {/* 4. Pass the new handler to the PrescribeModal */}
        <PrescribeModal patient={patient} onSaveSuccess={handleSavePrescription} />
      </Modal>

      {/* Medical Record Detail Modal */}
      {selectedRecord && (
        <Modal
          title={`Medical Record - ${selectedRecord.date}`}
          isOpen={isRecordDetailOpen}
          onClose={() => setIsRecordDetailOpen(false)}
        >
          <MedicalRecordDetailModal record={selectedRecord} />
        </Modal>
      )}

      {/* 5. Render the new Success Modal */}
      <Modal
        title="Status"
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <SuccessMessage
          title="Prescription Sent!"
          message="The prescription has been sent to the receptionist. The patient can now proceed for payment before picking up medication from the pharmacy."
          onClose={() => setIsSuccessModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default PatientProfile;