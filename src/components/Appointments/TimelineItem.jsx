import React from 'react';
import './Appointments.css';

// We now accept a new prop: `onViewDetails`
const TimelineItem = ({ event, onViewDetails }) => {
  const getDotColor = (type) => {
    switch (type) {
      case 'checkup': return '#FFC107';
      case 'cleaning': return '#4CAF50';
      case 'scaling': return '#FF9800';
      default: return '#2196F3';
    }
  };
  
  // We pass the dot color up with the event data for the modal
  const eventWithColor = { ...event, color: getDotColor(event.type) };

  return (
    <div className="timeline-item">
      <div className="timeline-time">{event.hour}</div>
      <div className="timeline-connector">
        <div className="timeline-dot" style={{ backgroundColor: getDotColor(event.type) }}></div>
        <div className="timeline-line"></div>
      </div>
      <div className="timeline-content">
        <h4>{event.title}</h4>
        <p>Patient Name - {event.patientName}</p>
        <div className="timeline-details">
          <span>{event.timeRange}</span>
          {/* This is now a button that calls the onViewDetails function */}
          <button className="btn-view-details" onClick={() => onViewDetails(eventWithColor)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;