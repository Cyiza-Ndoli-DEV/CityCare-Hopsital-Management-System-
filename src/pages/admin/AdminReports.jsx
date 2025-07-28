import React, { useRef } from 'react';
import './AdminReports.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, RadialLinearScale } from 'chart.js';
import { Bar, Pie, Line, Radar, Doughnut } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Chart.js Registration ---
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, RadialLinearScale);

// --- Reusable Components (for clean code) ---
const StatCard = ({ title, value, trend, trendDirection }) => (
    <div className="stat-card">
        <h3>{title}</h3>
        <span className="stat-value">{value}</span>
        <span className={`trend ${trendDirection}`}>
            {trendDirection === 'up' && <span className="arrow">▲</span>}
            {trendDirection === 'down' && <span className="arrow">▼</span>}
            {trend}
        </span>
    </div>
);

// --- CORRECTED CHART CARD COMPONENT ---
const ChartCard = ({ title, children }) => (
    <div className="chart-card">
        <div className="chart-title">{title}</div>
        <div className="chart-wrapper">
            {children}
        </div>
    </div>
);

// --- Component Definition ---
function AdminReports() {
    const reportContentRef = useRef(null);

    const handleExportPDF = () => {
        const input = reportContentRef.current;
        if (input) {
            html2canvas(input, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4'
                });
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = pageWidth;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                pdf.save("CityCare-Reports-Analytics.pdf");
            });
        }
    };
    
    // --- Chart Data Definitions ---
    const patientsBarData = {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{ label: "Patients", data: [120,150,170,190,210,250,230,220,200,180,160,140], backgroundColor: 'rgba(40,120,181,0.7)' }]
    };
    const appointmentsPieData = {
        labels: ["General", "Pediatrics", "Dental", "Cardiology", "Others"],
        datasets: [{ data: [340, 210, 140, 90, 90], backgroundColor: ['#2878b5', '#27ae60', '#f9b428', '#e74c3c', '#9b59b6'] }]
    };
    const prescriptionLineData = {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
        datasets: [{ label: "Prescriptions", data: [50, 65, 80, 100, 120, 140, 155], borderColor: "#f9b428", backgroundColor: 'rgba(249,180,40,0.2)', fill: true, tension: .3 }]
    };
    const doctorRadarData = {
        labels: ['Appointments', 'Prescriptions', 'Avg. Wait Time', 'Patient Satisfaction', 'Follow-ups'],
        datasets: [
          { label: 'Dr. Felix', data: [95, 87, 80, 92, 85], fill: true, backgroundColor: 'rgba(40,120,181,0.2)', borderColor: '#2878b5' },
          { label: 'Dr. Alice', data: [90, 85, 82, 88, 80], fill: true, backgroundColor: 'rgba(249,180,40,0.2)', borderColor: '#f9b428' }
        ]
    };
    const revenueAreaData = {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
        datasets: [{ label: "Revenue ($000)", data: [22, 24, 28, 32, 38, 45, 43], borderColor: "#27ae60", backgroundColor: 'rgba(39,174,96,0.2)', fill: true, tension: .35 }]
    };
    const ageDoughnutData = {
        labels: ['0-12', '13-25', '26-45', '46-65', '65+'],
        datasets: [{ data: [180, 420, 900, 600, 240], backgroundColor: ['#f9b428', '#2878b5', '#e74c3c', '#9b59b6', '#27ae60'] }]
    };
    const appointmentsCurveData = {
        labels: ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"],
        datasets: [{ label: "Appointments", data: [620, 710, 690, 800, 850, 870, 900, 920, 950, 980, 1000, 970], borderColor: "#2878b5", backgroundColor: 'rgba(40,120,181,0.07)', fill: true, tension: .4 }]
    };
    const waitTimeCurveData = {
        labels: ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"],
        datasets: [{ label: "Avg. Wait Time (min)", data: [18, 17, 17, 16, 15, 15, 14, 14, 13, 13, 12, 12], borderColor: "#e74c3c", backgroundColor: 'rgba(231,76,60,0.13)', fill: true, tension: .5 }]
    };
    const stockCurveData = {
        labels: ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"],
        datasets: [{ label: "Stock Level", data: [1200, 1150, 1100, 1050, 1000, 950, 900, 950, 1000, 1050, 1100, 1200], borderColor: "#9b59b6", backgroundColor: 'rgba(155,89,182,0.10)', fill: true, tension: .4 }]
    };
    const appointmentStatusData = {
        labels: ['Completed', 'Pending', 'Cancelled', 'No-show'],
        datasets: [{ data: [680, 120, 40, 30], backgroundColor: ['#27ae60', '#f9b428', '#e74c3c', '#2878b5'] }]
    };
    const topMedicinesData = {
        labels: ['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Cough Syrup', 'Vitamin C'],
        datasets: [{ label: "Dispensed", data: [340, 290, 270, 210, 180], backgroundColor: ['#2878b5', '#f9b428', '#e74c3c', '#27ae60', '#9b59b6'] }]
    };
    const staffRoleData = {
        labels: ['Doctors', 'Receptionists', 'Pharmacists', 'Admin'],
        datasets: [{ data: [27, 10, 6, 2], backgroundColor: ['#2878b5', '#f9b428', '#e74c3c', '#27ae60'] }]
    };

    // --- Chart Options ---
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // This is crucial for the wrapper fix to work
    };

    return (
        <div className="admin-reports-container">
            <header className="page-local-header">
                <h1>Admin Reports & Analytics</h1>
                <button className="export-btn" onClick={handleExportPDF}>Export PDF</button>
            </header>
            
            <main className="report-content" ref={reportContentRef}>
                <div className="stats-cards">
                    <StatCard title="Total Patients" value="2,340" trend="+5% last month" trendDirection="up" />
                    <StatCard title="Appointments This Month" value="870" trend="-2% last month" trendDirection="down" />
                    <StatCard title="Prescriptions Issued" value="430" trend="+12% last month" trendDirection="up" />
                    <StatCard title="Doctors" value="27" trend="+1 new" trendDirection="up" />
                    <StatCard title="Receptionists" value="10" trend="Stable" />
                    <StatCard title="Pharmacists" value="6" trend="-1 this month" trendDirection="down" />
                </div>

                <div className="charts-section">
                    <div className="grid">
                        <ChartCard title="Monthly Patient Registrations"><Bar data={patientsBarData} options={{...chartOptions, plugins: { legend: { display: false }}}} /></ChartCard>
                        <ChartCard title="Appointments by Department"><Pie data={appointmentsPieData} options={chartOptions} /></ChartCard>
                        <ChartCard title="Prescription Trends"><Line data={prescriptionLineData} options={{...chartOptions, plugins: { legend: { display: true }}}} /></ChartCard>
                    </div>
                    <div className="grid">
                        <ChartCard title="Doctor Performance"><Radar data={doctorRadarData} options={{...chartOptions, plugins: { legend: { position: 'bottom' }}}} /></ChartCard>
                        <ChartCard title="Revenue (Monthly)"><Line data={revenueAreaData} options={{...chartOptions, plugins: { legend: { display: true }}}} /></ChartCard>
                        <ChartCard title="Patient Age Distribution"><Doughnut data={ageDoughnutData} options={chartOptions} /></ChartCard>
                    </div>
                </div>

                <div className="charts-section">
                    <div className="section-title">Curves & Trends</div>
                    <div className="grid">
                        <ChartCard title="Appointments Trend (Last 12 Months)"><Line data={appointmentsCurveData} options={{...chartOptions, plugins: { legend: { display: true }}}} /></ChartCard>
                        <ChartCard title="Average Wait Time Trend"><Line data={waitTimeCurveData} options={{...chartOptions, plugins: { legend: { display: true }}}} /></ChartCard>
                        <ChartCard title="Medicine Stock Level (Pharmacy)"><Line data={stockCurveData} options={{...chartOptions, plugins: { legend: { display: true }}}} /></ChartCard>
                    </div>
                </div>

                <div className="table-section">
                    <div className="section-title">Recent Activities (Last 7 Days)</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Activity</th>
                                <th>User</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr><td>2025-07-21</td><td>Registered new patient</td><td>Jane M.</td><td>Receptionist</td></tr>
                          <tr><td>2025-07-21</td><td>Issued prescription</td><td>Dr. Felix</td><td>Doctor</td></tr>
                          <tr><td>2025-07-20</td><td>Added medicine stock</td><td>Paul K.</td><td>Pharmacist</td></tr>
                          <tr><td>2025-07-19</td><td>Completed appointment</td><td>Dr. Alice</td><td>Doctor</td></tr>
                          <tr><td>2025-07-19</td><td>Updated patient record</td><td>Jane M.</td><td>Receptionist</td></tr>
                          <tr><td>2025-07-18</td><td>Scheduled appointment</td><td>Dr. Felix</td><td>Doctor</td></tr>
                          <tr><td>2025-07-18</td><td>Issued prescription</td><td>Dr. Alice</td><td>Doctor</td></tr>
                          <tr><td>2025-07-17</td><td>Added new receptionist</td><td>Admin</td><td>Admin</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="charts-section">
                    <div className="section-title">Other Analytics</div>
                    <div className="grid">
                        <ChartCard title="Appointment Status Overview"><Pie data={appointmentStatusData} options={chartOptions} /></ChartCard>
                        <ChartCard title="Top 5 Medicines Dispensed"><Bar data={topMedicinesData} options={{...chartOptions, plugins: { legend: { display: false }}}} /></ChartCard>
                        <ChartCard title="Staff Role Distribution"><Pie data={staffRoleData} options={chartOptions} /></ChartCard>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminReports;