// src/pages/receptionist/ReceptionistDashboard.jsx
import React from 'react';
import {  FaRegCalendarAlt, FaCalendarCheck, FaHourglassStart } from 'react-icons/fa';
import { FaEye,FaPenToSquare, FaTrash } from 'react-icons/fa6';
import ReceptionistStatCard from '../../components/ReceptionistStatCard/ReceptionistStatCard';
import './ReceptionistDashboard.css';

// Mock Data for our new table
const mockArrivals = [
  { id: '2023-04', name: 'Rwaga', avatarInitial: 'R', time: '08:30 AM', ageGender: '55/MALE', condition: 'Ulcers', status: 'Checked In' },
  { id: '2023-04', name: 'Alain', avatarInitial: 'A', time: '03:30 PM', ageGender: '12/FEMALE', condition: 'Hypertension', status: 'Paid' },
  { id: '2023-04', name: 'Bob', avatarInitial: 'B', time: '03:30 PM', ageGender: '22/MALE', condition: 'Pneumonia', status: 'Paid' },
  { id: '2023-04', name: 'Alain', avatarInitial: 'A', time: '03:30 PM', ageGender: '12/FEMALE', condition: 'Hypertension', status: 'Paid' }
];

function ReceptionistDashboard() {
  return (
    <div className="receptionist-dashboard-page">
      <div className="page-header">
        <h1 className="welcome-title">Welcome, Jenifer!</h1>
        {/* <div className="header-actions">
          <button className="action-button add-patient-btn"><FaPlus /> Add Patient</button>
          <button className="action-button view-patients-btn"><FaEye /> View Patients</button>
        </div> */}
      </div>

     <div className="receptionist-stats-grid">
        <ReceptionistStatCard 
          icon={<FaRegCalendarAlt style={{ color: '#8b5cf6' }} />}
          value="200"
          label="Total appointments"
          iconBgColor="#f5f3ff"
        />
        <ReceptionistStatCard 
          icon={<FaCalendarCheck style={{ color: '#22c55e' }} />}
          value="45"
          label="Upcoming appointments"
          iconBgColor="#f0fdf4"
        />
        <ReceptionistStatCard 
          icon={<FaHourglassStart style={{ color: '#eab308' }} />}
          value="17"
          label="Pending appointments"
          iconBgColor="#fefce8"
        />
      </div>

      {/* NEW: Arrivals Table Section */}
      <div className="arrivals-table-container">
        <h2 className="table-title">Today's patients Arrivals (23)</h2>
        <div className="table-wrapper">
          <table className="arrivals-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient ID & Name</th>
                <th>Age/Gender</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockArrivals.map((patient, index) => (
                <tr key={index}>
                  <td className="time-cell">{patient.time}</td>
                  <td className="patient-cell">
                    <div className="patient-avatar" style={{ backgroundColor: patient.avatarInitial === 'R' ? '#4a90e2' : '#f5a623' }}>
                      {patient.avatarInitial}
                    </div>
                    <div className="patient-info">
                      <span className="patient-name">{patient.name}</span>
                      <span className="patient-id">ID: {patient.id}</span>
                    </div>
                  </td>
                  <td>{patient.ageGender}</td>
                  <td>{patient.condition}</td>
                  <td>
                    <span className={`status-tag status-${patient.status.toLowerCase().replace(' ', '')}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                                        <FaEye className="action-icon"/>
                                        <FaPenToSquare className="action-icon"/>
                                        <FaTrash className="action-icon"/>
                                      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          {/* We can make this dynamic later */}
          <span className="page-number active">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span className="page-number">4</span>
          <span className="page-number">5</span>
          <span className="page-number">6</span>
          <span className="page-arrow"></span>
        </div>
      </div>

    </div>
  );
}

export default ReceptionistDashboard;