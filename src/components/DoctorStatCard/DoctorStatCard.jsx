// src/components/DoctorStatCard/DoctorStatCard.jsx
import './DoctorStatCard.css';

function DoctorStatCard({ icon, value, label, accentColor }) {
  return (
    <div className="doctor-stat-card" style={{ borderLeft: `4px solid ${accentColor}` }}>
      <div className="icon-container" style={{ color: accentColor }}>
        {icon}
      </div>
      <div className="info-container">
        <span className="value">{value}</span>
        <span className="label">{label}</span>
      </div>
    </div>
  );
}

export default DoctorStatCard;