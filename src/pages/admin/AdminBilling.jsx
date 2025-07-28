import React, { useState, useRef } from 'react';
import './AdminBilling.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Chart.js Registration ---
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

// --- Reusable Components ---
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

const ChartCard = ({ title, children }) => (
    <div className="chart-card">
        <div className="chart-title">{title}</div>
        <div className="chart-wrapper">{children}</div>
    </div>
);

// --- Component Definition ---
function AdminBilling() {
    const billingContentRef = useRef(null);
    const [filters, setFilters] = useState({
        period: 'monthly',
        start: '2025-07-01',
        end: '2025-07-22',
        department: 'all'
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        // In a real app, this would trigger a data refetch
        console.log("Filters updated:", { ...filters, [name]: value });
    };

    const handleExportPDF = () => {
        const input = billingContentRef.current;
        if (input) {
            html2canvas(input, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const ratio = canvasWidth / pdfWidth;
                const imgHeight = canvasHeight / ratio;
                let heightLeft = imgHeight;
                let position = 0;
                
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft >= 0) {
                  position = heightLeft - imgHeight;
                  pdf.addPage();
                  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                  heightLeft -= pdfHeight;
                }
                pdf.save("CityCare-Billing-Finances.pdf");
            });
        }
    };

    const recentBillingData = [
        { date: '2025-07-22', patient: 'Jane M.', amount: '450,000', method: 'Mobile Money', status: 'Paid' },
        { date: '2025-07-22', patient: 'Felix K.', amount: '210,000', method: 'Cash', status: 'Pending' },
        { date: '2025-07-21', patient: 'Paul N.', amount: '900,000', method: 'Insurance', status: 'Paid' },
        { date: '2025-07-21', patient: 'Janet C.', amount: '125,000', method: 'Mobile Money', status: 'Paid' },
        { date: '2025-07-20', patient: 'Dr. Alice', amount: '280,000', method: 'Cash', status: 'Paid' },
        { date: '2025-07-20', patient: 'Jane M.', amount: '335,000', method: 'Insurance', status: 'Paid' },
        { date: '2025-07-19', patient: 'Felix K.', amount: '210,000', method: 'Mobile Money', status: 'Pending' },
        { date: '2025-07-18', patient: 'Paul N.', amount: '900,000', method: 'Insurance', status: 'Paid' }
    ];
    
    // --- Chart Data & Options ---
    const chartOptions = { responsive: true, maintainAspectRatio: false };
    const revenueLineData = {
        labels: ["Jul 1","Jul 5","Jul 10","Jul 15","Jul 20","Jul 22"],
        datasets: [{ label: "Revenue (UGX)", data: [9000000, 27000000, 62000000, 124000000, 163000000, 178500000], borderColor: "#2878b5", backgroundColor: 'rgba(40,120,181,0.1)', fill: true, tension: .4 }]
    };
    const expensesPieData = {
        labels: ["Salaries", "Supplies", "Maintenance", "Utilities", "Others"],
        datasets: [{ data: [72000000, 32000000, 14000000, 4800000, 8000000], backgroundColor: ['#2878b5', '#f9b428', '#e74c3c', '#27ae60', '#9b59b6'] }]
    };
    const paymentMethodBarData = {
        labels: ['Mobile Money', 'Insurance', 'Cash'],
        datasets: [{ label: "Transactions", data: [420, 220, 140], backgroundColor: ['#f9b428', '#2878b5', '#27ae60'] }]
    };
    const yearlyRevenueBarData = {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{ label: "Revenue (Million UGX)", data: [720, 1000, 1280, 1640, 1785], backgroundColor: ['#27ae60', '#f9b428', '#2878b5', '#9b59b6', '#e74c3c'] }]
    };
    
    return (
        <div className="admin-billing-container">
            <header className="page-local-header">
                <h1>Admin Billing & Finances</h1>
                <button className="export-btn" onClick={handleExportPDF}>Export PDF</button>
            </header>
            
            <main className="billing-content" ref={billingContentRef}>
                

                <div className="filters">
                    <label>View:
                        <select name="period" value={filters.period} onChange={handleFilterChange}>
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </label>
                    <label>From:
                        <input type="date" name="start" value={filters.start} onChange={handleFilterChange} />
                    </label>
                    <label>To:
                        <input type="date" name="end" value={filters.end} onChange={handleFilterChange} />
                    </label>
                    <label>Department:
                        <select name="department" value={filters.department} onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="general">General</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="dental">Dental</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="pharmacy">Pharmacy</option>
                        </select>
                    </label>
                </div>

                <div className="stats-cards">
                    <StatCard title="Total Revenue" value="178,500,000 UGX" trend="+8% this month" trendDirection="up" />
                    <StatCard title="Outstanding Payments" value="15,200,000 UGX" trend="-12% this month" trendDirection="down" />
                    <StatCard title="Bills Paid" value="560" trend="+4% this month" trendDirection="up" />
                    <StatCard title="Payment Methods" value="3 Types" trend="Mobile Money, Insurance, Cash" />
                </div>
                <div className="section-title">Recent Billing Activities</div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Amount (UGX)</th>
                            <th>Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBillingData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.patient}</td>
                                <td>{item.amount}</td>
                                <td>{item.method}</td>
                                <td><span className={`status status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="charts-section">
                    <div className="grid">
                        <ChartCard title="Revenue Over Time"><Line data={revenueLineData} options={{...chartOptions, plugins: { legend: { display: true }}}} /></ChartCard>
                        <ChartCard title="Expenses Breakdown"><Pie data={expensesPieData} options={chartOptions} /></ChartCard>
                        <ChartCard title="Payment Methods Usage"><Bar data={paymentMethodBarData} options={{...chartOptions, plugins: { legend: { display: false }}}} /></ChartCard>
                    </div>
                    <div className="grid">
                        {/* More charts can be added here following the same pattern */}
                        <ChartCard title="Yearly Revenue Comparison"><Bar data={yearlyRevenueBarData} options={{...chartOptions, plugins: { legend: { display: false }}}} /></ChartCard>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminBilling;