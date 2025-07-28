import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaUsers, FaCalendarAlt, FaFileMedicalAlt, FaStar } from 'react-icons/fa';
import './DoctorDashboard.css';

// Register ChartJS components to ensure they are available
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// StatCard for the top row of main stats
const MainStatCard = ({ icon, value, label, accentColor }) => (
  <div className="main-stat-card" style={{ borderLeft: `5px solid ${accentColor}` }}>
    <div className="main-stat-icon" style={{ color: accentColor }}>{icon}</div>
    <div className="main-stat-info">
      <div className="main-stat-value">{value}</div>
      <div className="main-stat-label">{label}</div>
    </div>
  </div>
);

// StatCard for the second row of smaller stats
const SubStatCard = ({ value, label, valueColor }) => (
  <div className="sub-stat-card">
    <div className="sub-stat-value" style={{ color: valueColor }}>{value}</div>
    <div className="sub-stat-label">{label}</div>
  </div>
);

// Component for each appointment item in the schedule
const AppointmentCard = ({ time, title, patient, status }) => {
  const statusConfig = {
    PENDING: {
      bgColor: '#fff7ed',    // Light Orange
      borderColor: '#f97316', // Orange
      timeBg: '#f97316',
      statusBg: '#f97316',
    },
    COMPLETED: {
      bgColor: '#f0fdf4',    // Light Green
      borderColor: '#22c55e', // Green
      timeBg: '#2c5784',    // Dark Blue for completed time badge
      statusBg: '#22c55e',
    }
  };
  const config = statusConfig[status];

  return (
    <div className="schedule-item" style={{ backgroundColor: config.bgColor, borderLeft: `4px solid ${config.borderColor}` }}>
      <span className="time-badge" style={{ backgroundColor: config.timeBg }}>{time}</span>
      <div className="appointment-info">
        <h4>{title}</h4>
        <p>{patient}</p>
      </div>
      <span className="status-badge" style={{ backgroundColor: config.statusBg }}>{status}</span>
    </div>
  );
};

// The main dashboard component
const DoctorDashboard = () => {
  // Data for the Bar Chart
  const appointmentChartData = {
    labels: ['Emergency', 'Follow-up', 'Checkup', 'Consultation', 'Post-Op'],
    datasets: [{
      label: 'Appointments',
      data: [3, 7, 4, 5, 2],
      backgroundColor: ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#f59e0b'],
      borderRadius: 4,
      barPercentage: 0.5,
    }]
  };

  // Data for the Pie Chart
  const patientChartData = {
    labels: ['Outpatients', 'Inpatients'],
    datasets: [{
      data: [15, 8],
      backgroundColor: ['#3b82f6', '#22c55e'],
      borderColor: '#ffffff',
      borderWidth: 4,
    }]
  };

  // Options for charts
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  return (
    <div className="doctor-dashboard-page">
      {/* Stats Cards Section */}
      <div className="dashboard-stats-area">
        <div className="main-stats-grid">
          <MainStatCard icon={<FaUsers />} value="30" label="Active Patients" accentColor="#3b82f6" />
          <MainStatCard icon={<FaCalendarAlt />} value="12" label="Today's appointments" accentColor="#f97316" />
          <MainStatCard icon={<FaStar />} value="8" label="Treatments today" accentColor="#22c55e" />
          <MainStatCard icon={<FaFileMedicalAlt />} value="3" label="Urgent Alerts" accentColor="#a855f7" />
        </div>
        <div className="sub-stats-grid">
          <SubStatCard value="4" label="High Priority Cases" valueColor="#f97316" />
          <SubStatCard value="5" label="Follow-up Visits" valueColor="#3b82f6" />
          <SubStatCard value="3" label="Routine Checkups" valueColor="#22c55e" />
        </div>
      </div>

      {/* Main Content Area Grid */}
      <div className="dashboard-content-grid">
        {/* Left Column: Schedule */}
        <div className="schedule-card">
          <div className="card-header">
            <h3>Today's schedule</h3>
            <a href="#" className="view-all-link">View Other Days</a>
          </div>
          <div className="schedule-list">
            <AppointmentCard time="08:30" title="Emergency consultation" patient="Basalirwa Ismail (ID: 45978)" status="PENDING" />
            <AppointmentCard time="09:15" title="Follow up consultation" patient="Sarah Johnson (ID: 23456)" status="COMPLETED" />
            <AppointmentCard time="10:00" title="Routine Check-Up" patient="Michael Brown (ID: 78801)" status="PENDING" />
            <AppointmentCard time="11:30" title="Post-Op Evaluation" patient="Emily Wilson (ID: 34567)" status="COMPLETED" />
          </div>
        </div>

        {/* Right Column: Insights with separated charts */}
        <div className="insights-card">
          <div className="card-header">
            <h3>Weekly Patient Insights</h3>
          </div>
          <div className="insights-body">
            <div className="chart-item">
              <Bar data={appointmentChartData} options={barOptions} />
            </div>

            {/* Container for the Pie Chart and its new custom legend */}
            <div className="chart-item pie-chart-container">
              <div className="pie-chart-wrapper">
                <Pie data={patientChartData} options={pieOptions} />
              </div>
              <div className="custom-pie-legend">
                {patientChartData.labels.map((label, index) => (
                  <div key={label} className="legend-item">
                    <span
                      className="legend-color-swatch"
                      style={{ backgroundColor: patientChartData.datasets[0].backgroundColor[index] }}
                    ></span>
                    <span className="legend-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;