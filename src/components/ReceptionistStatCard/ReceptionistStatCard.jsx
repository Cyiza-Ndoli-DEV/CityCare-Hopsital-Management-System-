import React from 'react';
import './ReceptionistStatCard.css';

function ReceptionistStatCard({ icon, value, label, iconBgColor }) {
  return (
    <div className="r-stat-card">
      <div className="r-stat-icon" style={{ backgroundColor: iconBgColor }}>
        {icon}
      </div>
      <div className="r-stat-info">
        <span className="r-stat-value">{value}</span>
        <span className="r-stat-label">{label}</span>
      </div>
    </div>
  );
}

export default ReceptionistStatCard;