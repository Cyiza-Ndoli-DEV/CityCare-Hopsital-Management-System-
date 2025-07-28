import React from 'react';
import './Appointments.css'; // This is the shared CSS file we will create next

const AppointmentStats = () => {
  return (
    <div className="appointment-stats-card">
      <div className="stat-item">
        <p className="stat-label">Total appointment In This Month</p>
        <p className="stat-value primary">304</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Pending appointment In This Month</p>
        <p className="stat-value secondary">154</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Complete appointment In This Month</p>
        <p className="stat-value tertiary">150</p>
      </div>
    </div>
  );
};

export default AppointmentStats;