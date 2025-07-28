import StatCard from '../../components/StatCard/StatCard';
import BarChart from '../../components/Charts/BarChart';
import PieChart from '../../components/Charts/PieChart';
import { FaUsers, FaUserTie, FaUserClock, FaCalendarDay, FaFilePdf, FaChartBar } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Chart data configurations
  const departmentData = {
    labels: ['Emergency', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Surgery'],
    datasets: [
      {
        label: 'Patient Volume',
        data: [2800, 1300, 1100, 1000, 700, 600],
        backgroundColor: '#6B7A8F', // A neutral, slate-blue color from the image
        borderWidth: 0,
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  };

  const patientTypeData = {
    labels: ['Admitted', 'Appointments', 'ICU', 'Surgery', 'Emergency'],
    datasets: [
      {
        label: 'Patient Distribution',
        data: [300, 450, 50, 100, 200], // Using raw numbers for the doughnut
        backgroundColor: ['#4C5BAF', '#6B7A8F', '#E53E3E', '#9F7AEA', '#ED8936'],
        borderColor: '#ffffff', // White border to match the card background
        borderWidth: 4,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="admin-dashboard-page">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-title">
          <FaChartBar />
          <h1>Admin Dashboard</h1>
        </div>
      </header>

      {/* Stats Cards Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <StatCard icon={<FaUsers />} value="2,000" label="Total Patients" color="primary" />
          <StatCard icon={<FaUserTie />} value="202" label="Total Employees" color="secondary" />
          <StatCard icon={<FaUserClock />} value="400" label="Active Patients" color="danger" />
          <StatCard icon={<FaCalendarDay />} value="200" label="Today's Appointments" color="success" />
        </div>
      </section>

  
<section className="statistics-card">
  <div className="card-header">
    <h2>Hospital Statistics Overview</h2>
    <button className="view-more-btn">View More</button>
  </div>

  <div className="charts-grid">
    {/* Bar Chart Container */}
    <div className="chart-container">
      <h3>Patient Volume by Department</h3>
      <div className="chart-wrapper">
        <BarChart chartData={departmentData} />
      </div>
    </div>
    
    {/* Pie Chart Container */}
    <div className="chart-container">
      <h3>Patient Distribution by Type</h3>
      <div className="chart-wrapper">
        <PieChart chartData={patientTypeData} />
      </div>
    </div>
  </div>

  {/* CONTAINER FOR THE EXPORT  BUTTON */}
  <div className="export-actions-container">
    <button className="export-btn">
      <FaFilePdf />
      <span>Export PDF Report</span>
    </button>
  </div>
</section>
    </div>
  );
};

export default AdminDashboard;