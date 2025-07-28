import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './Appointments.css';

// We now accept onAccept and onReject functions from the parent
const AppointmentRequestCard = ({ patient, onAccept, onReject }) => {
  // This state will track the status of THIS card only
  const [status, setStatus] = useState('pending'); // 'pending', 'accepted', 'rejected'

  const handleAccept = () => {
    setStatus('accepted');
    // After showing "Accepted" for 1.5 seconds, call the parent's onAccept function
    setTimeout(() => {
      onAccept(patient.id, patient); // Pass the full patient object up
    }, 1500); // 1500ms = 1.5 seconds
  };

  const handleReject = () => {
    setStatus('rejected');
    // After showing "Rejected" for 1.5 seconds, call the parent's onReject function
    setTimeout(() => {
      onReject(patient.id);
    }, 1500);
  };

  return (
    <div className={`request-card status-${status}`}>
      <img src={patient.avatar} alt={patient.name} className="request-avatar" />
      <div className="request-info">
        <h4>{patient.name}</h4>
        <p>{patient.details}</p>
        <p>{patient.treatment}</p>
      </div>
      <div className="request-time">
        <p>{patient.time}</p>
      </div>
      <div className="request-actions">
        {/* We now conditionally render the content based on the status */}
        {status === 'pending' && (
          <>
            <button className="btn-accept" onClick={handleAccept}>Accept</button>
            <button className="btn-reject" onClick={handleReject}>Reject</button>
          </>
        )}
        {status === 'accepted' && (
          <div className="request-status accepted">
            <FaCheck /> Accepted
          </div>
        )}
        {status === 'rejected' && (
          <div className="request-status rejected">
            <FaTimes /> Rejected
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequestCard;