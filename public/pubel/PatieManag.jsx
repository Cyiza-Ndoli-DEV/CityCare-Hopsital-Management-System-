
// src/pages/receptionist/PatientManagement.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEye, FaEnvelope, FaPenToSquare } from 'react-icons/fa6';
import { FaSearch } from "react-icons/fa";
import AddPatientModal from '../../components/AddPatientModal/AddPatientModal';
import RegistrationSuccessModal from '../../components/RegistrationSuccessModal/RegistrationSuccessful';
import './PatientManagement.css';

const mockPatients = [
  { id: 'PID-2023-01', name: 'Rwaga', avatar: 'R', age: '55/MALE', condition: 'Ulcers', lastVisit: 'Today 08:30 AM', status: 'Pending' },
  { id: 'PID-2023-02', name: 'Alain', avatar: 'A', age: '12/FEMALE', condition: 'Hypertension', lastVisit: 'Yesterday 15:56', status: 'Paid' },
  { id: 'PID-2023-03', name: 'Bob', avatar: 'B', age: '22/MALE', condition: 'Pneumonia', lastVisit: 'June 23 07:00 AM', status: 'Paid' },
  { id: 'PID-2023-04', name: 'Alain', avatar: 'A', age: '12/FEMALE', condition: 'Hypertension', lastVisit: 'Yesterday 15:56', status: 'Paid' },
  { id: 'PID-2023-05', name: 'Bob', avatar: 'B', age: '22/MALE', condition: 'Pneumonia', lastVisit: 'June 23 07:00 AM', status: 'Paid' },
  { id: 'PID-2023-06', name: 'Alain', avatar: 'A', age: '12/FEMALE', condition: 'Hypertension', lastVisit: 'Yesterday 15:56', status: 'Paid' },
  { id: 'PID-2023-07', name: 'Bob', avatar: 'B', age: '22/MALE', condition: 'Pneumonia', lastVisit: 'June 23 07:00 AM', status: 'Insurance' },
];

function PatientManagement() {
  const [activeTab, setActiveTab] = useState('inpatients');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    setIsAddModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleViewPatient = (patientId) => {
    navigate(`/receptionist/patients/${patientId}`);
  };

  return (
    <>
      <div className="patient-management-page">
        <div className="page-header">
          <div className="header-actions">
            <button className="action-button add-patient-btn" onClick={() => setIsAddModalOpen(true)}>
              <FaPlus /> Add Patient
            </button>
            <button className="action-button view-patients-btn"><FaEye /> View Patients</button>
          </div>
        </div>

        <div className="patient-type-toggle">
          <label className={`toggle-label ${activeTab === 'inpatients' ? 'active' : ''}`}>
            <input type="radio" name="patient-type" value="inpatients" checked={activeTab === 'inpatients'} onChange={() => setActiveTab('inpatients')} />
            Inpatients
          </label>
          <label className={`toggle-label ${activeTab === 'outpatients' ? 'active' : ''}`}>
            <input type="radio" name="patient-type" value="outpatients" checked={activeTab === 'outpatients'} onChange={() => setActiveTab('outpatients')} />
            Outpatients
          </label>
        </div>

        <div className="table-container-card">
          <div className="table-controls">
            <span className="patient-count">All patients(3000)</span>
            <div className="search-and-filter">
              <div className="search-bar">
                <input type="text" placeholder="search patient or patient ID" />
                <FaSearch className="search-icon"/>
              </div>
              <select className="status-filter">
                <option>All statuses</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Insurance</option>
              </select>
            </div>
          </div>
          
          <div className="table-wrapper">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient ID & Name</th>
                  <th>Age/Gender</th>
                  <th>Condition</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPatients.map((patient, index) => (
                  <tr key={index} onClick={() => handleViewPatient(patient.id)} className="clickable-row">
                    <td className="patient-cell">
                      <div className="patient-avatar">{patient.avatar}</div>
                      <div>
                        <span className="patient-name">{patient.name}</span>
                        <span className="patient-id">ID: {patient.id}</span>
                      </div>
                    </td>
                    <td>{patient.age}</td>
                    <td>{patient.condition}</td>
                    <td>{patient.lastVisit}</td>
                    <td>
                      <span className={`status-pill status-${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <FaEye className="action-icon" />
                      <FaPenToSquare className="action-icon" />
                      <FaEnvelope className="action-icon" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddPatientModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />
      <RegistrationSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        onBookAppointment={() => console.log("Navigate to Booking Appointment Page...")}
      />
    </>
  );
}

export default PatientManagement;
