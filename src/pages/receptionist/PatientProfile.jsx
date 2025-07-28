// src/pages/receptionist/PatientProfile.jsx
import React, { useState } from 'react';
import { 
  FaRegCalendarAlt, FaFileMedical, FaFileInvoiceDollar, FaPhone, 
  FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaExclamationTriangle, FaCalendarPlus, 
  FaNotesMedical, FaClock, FaCheckCircle, FaMoneyBillWave, FaFileAlt
} from 'react-icons/fa';
import BookAppointmentModal from '../../components/BookAppointmentModal/BookAppointmentModal';
import './PatientProfile.css';

function PatientProfile() {
  // Patient data
  const patientData = {
    id: 'PID-001',
    name: 'Rwaga',
    avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    dob: '12 / 06 / 1968 (55 Yrs)',
    phone: '+256 789 234 332',
    email: 'rwaga@email.com',
    address: 'Mubende, Kassanda',
    gender: 'Male',
    outstandingBalance: '500,000 UGX'
  };

  // Mock data
  const upcomingAppointments = [
    { type: 'Dentist', details: 'Dr. Kabingo, Today @ 10:00AM', status: 'Pending' },
    { type: 'Routine checkup', details: 'Dr. Aline, Mon 13, @ 11:30AM', status: 'Confirmed' }
  ];

  const medicalHistory = [
    { date: '2024-05-20', diagnosis: 'Ulcers', treatment: 'Antacids & diet control' },
    { date: '2023-11-04', diagnosis: 'Tooth Decay', treatment: 'Tooth filling' }
  ];

  const labResults = [
    { test: 'Blood Test', result: 'Normal', date: '2024-06-10' },
    { test: 'X-ray', result: 'No issues found', date: '2024-03-22' }
  ];

  const billingRecords = [
    { date: '2024-07-01', service: 'Dentist Consultation', amount: '500,000 UGX', status: 'Pending' },
    { date: '2024-05-20', service: 'Ulcer Treatment', amount: '400,000 UGX', status: 'Paid' }
  ];

  // States
  const [activeTab, setActiveTab] = useState('Appointments');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showPaymentAlert, setShowPaymentAlert] = useState(true);
  const [paidBalance, setPaidBalance] = useState(false);

  const handlePayment = () => {
    alert(`Payment of ${paymentAmount} submitted successfully!`);
    setShowPaymentModal(false);
    setPaymentAmount('');
    setPaidBalance(true);
    setShowPaymentAlert(false);
  };

  const hasOutstandingBalance = !paidBalance && patientData.outstandingBalance !== '0 UGX';

  return (
    <div className="patient-profile-page">
      {/* Header */}
      <div className="profile-header-card">
        <div className="profile-summary">
          <img src={patientData.avatar} alt={patientData.name} className="profile-avatar-large" />
          <div className="profile-info-main">
            <h1 className="patient-name">{patientData.name}</h1>
            <p className="patient-id">ID: {patientData.id}</p>
            <div className="patient-contact-details">
              <span><FaPhone /> {patientData.phone}</span>
              <span><FaEnvelope /> {patientData.email}</span>
              <span><FaMapMarkerAlt /> {patientData.address}</span>
              <span><FaVenusMars /> {patientData.gender}</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <div className={`balance-alert ${hasOutstandingBalance ? 'has-balance' : ''}`}>
            <FaExclamationTriangle />
            <span>Outstanding Balance: <strong>{patientData.outstandingBalance}</strong></span>
          </div>
          <button className="book-appointment-btn" onClick={() => setIsBookingModalOpen(true)}>
            <FaCalendarPlus /> Book Appointment
          </button>
        </div>
      </div>

      {/* Payment Alert */}
      {showPaymentAlert && hasOutstandingBalance && (
        <div className="floating-payment-alert">
          <div>
            <FaExclamationTriangle /> Please check the Billing tab to pay your outstanding balance
          </div>
          <button className="close-alert-btn" onClick={() => setShowPaymentAlert(false)}>
            ×
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="profile-nav-tabs">
        <button 
          className={`tab-button ${activeTab === 'Appointments' ? 'active' : ''}`} 
          onClick={() => setActiveTab('Appointments')}
        >
          <FaRegCalendarAlt /> Appointments
        </button>
        <button 
          className={`tab-button ${activeTab === 'Medical History' ? 'active' : ''}`} 
          onClick={() => setActiveTab('Medical History')}
        >
          <FaFileMedical /> Medical History
        </button>
        <button 
          className={`tab-button ${activeTab === 'Lab Results' ? 'active' : ''}`} 
          onClick={() => setActiveTab('Lab Results')}
        >
          <FaNotesMedical /> Lab Results
        </button>
        <button 
          className={`tab-button ${activeTab === 'Billing' ? 'active' : ''}`} 
          onClick={() => setActiveTab('Billing')}
        >
          <FaFileInvoiceDollar /> Billing
          {hasOutstandingBalance && <span className="payment-notification-badge">!</span>}
        </button>
      </div>

      {/* Content */}
      <div className="profile-content">
        {activeTab === 'Appointments' && (
          <div className="upcoming-appointments-card">
            <div className="card-header">
              <h2 className="card-title">Upcoming Appointments</h2>
            </div>
            <div className="appointments-list">
              {upcomingAppointments.map((app, index) => (
                <div key={index} className="appointment-item">
                  <div className={`appointment-icon-wrapper status-${app.status.toLowerCase()}`}>
                    {app.status === 'Pending' ? <FaClock /> : <FaCheckCircle />}
                  </div>
                  <div className="appointment-details">
                    <strong>{app.type}</strong>
                    <span>{app.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Medical History' && (
          <div className="medical-history-card">
            <div className="card-header">
              <h2 className="card-title">Medical Records</h2>
            </div>
            <div className="records-list">
              {medicalHistory.map((record, index) => (
                <div key={index} className="record-item">
                  <div className="record-date">{record.date}</div>
                  <div className="record-details">
                    <div className="record-diagnosis">
                      <strong>Diagnosis:</strong> {record.diagnosis}
                    </div>
                    <div className="record-treatment">
                      <strong>Treatment:</strong> {record.treatment}
                    </div>
                  </div>
                  <button className="view-details-btn">
                    <FaFileAlt /> Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Lab Results' && (
          <div className="lab-results-card">
            <div className="card-header">
              <h2 className="card-title">Lab Results</h2>
            </div>
            <div className="results-table">
              <table>
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Result</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {labResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.test}</td>
                      <td>
                        <span className={`result-badge ${result.result === 'Normal' ? 'normal' : 'abnormal'}`}>
                          {result.result}
                        </span>
                      </td>
                      <td>{result.date}</td>
                      <td>
                        <button className="view-result-btn">
                          <FaFileAlt /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Billing' && (
          <div className="billing-card">
            <div className="card-header">
              <h2 className="card-title">Billing</h2>
              <div className="balance-summary">
                <div className="outstanding-balance">
                  <FaExclamationTriangle /> Balance: <strong>{patientData.outstandingBalance}</strong>
                </div>
                <button 
                  className="make-payment-btn"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <FaMoneyBillWave /> Pay Now
                </button>
              </div>
            </div>
            <div className="billing-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Service</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.date}</td>
                      <td>{record.service}</td>
                      <td>{record.amount}</td>
                      <td>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal">
          <div className="modal-content">
            <h3>Make Payment</h3>
            <div className="payment-form">
              <div className="form-group">
                <label>Amount (UGX)</label>
                <input
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="payment-actions">
                <button className="cancel-btn" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </button>
                <button className="confirm-btn" onClick={handlePayment}>
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        patientName={patientData.name}
      />
    </div>
  );
}

export default PatientProfile;