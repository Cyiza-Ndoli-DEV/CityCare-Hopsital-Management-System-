// src/pages/pharmacist/PharmacistDashboard.jsx

import React, { useState } from "react";
import StatCard from '../../components/StatCard/StatCard';
import { FaFilePrescription, FaCalendarPlus, FaTriangleExclamation, FaRegMessage, FaAlignLeft, FaCheck, } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import PrescriptionDetailModal from "../../components/PrescriptionDetailModal/PrescriptionDetailModal";
import './PharmacistDashboard.css';

// --- Mock Data ---
const initialQueue = [
    { rx: '#2301', patient: 'Rwaga', id: '2023-04', med: 'Amoxicilin 500 MG', doctor: 'Dr Byaruhanga', status: 'pending', issueDate: '2025-07-21', pickupCode: 'A7XZ', allergies: 'None', notes: 'Take after meals', age: 41, gender: 'Male' },
    { rx: '#2300', patient: 'Alain', id: '2023-04', med: 'Lisinopril 10mg', doctor: 'Dr Betty', status: 'picked', issueDate: '2025-07-21', pickupCode: 'B9QY', allergies: 'Penicillin', notes: 'Monitor blood pressure', age: 54, gender: 'Male' },
    { rx: '#2299', patient: 'Bob', id: '2023-04', med: 'Paracetamol 30mg', doctor: 'Dr Yasumin', status: 'ready', issueDate: '2025-07-20', pickupCode: 'C3JW', allergies: 'Aspirin', notes: 'Avoid alcohol', age: 29, gender: 'Male' },
];

const recentlyDispensed = [
    { name: 'Robert Kyagulanyi', med: 'Loratadine 10mg - Dispensed at 10:32 AM' },
    { name: 'Mbabazi Micheal', med: 'Albuterol Inhaler - Dispensed at 10:15 AM' },
    { name: 'Mwebaze Frank', med: 'Ibuprofen 800mg - Dispensed at 09:58 AM' },
];

function PharmacistDashboard() {
    const [prescriptionQueue, setPrescriptionQueue] = useState(initialQueue);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const iconStyles = { fontSize: '1.5rem' };

    // Handle actions for prescription status change
    const handleAction = (rx, action) => {
        setPrescriptionQueue(queue => queue.map(item => {
            if (item.rx !== rx) return item;
            if (action === "dispense" && item.status === "ready") {
                return { ...item, status: "picked" };
            }
            if (action === "viewfill" && item.status === "pending") {
                return { ...item, status: "ready" };
            }
            return item;
        }));
    };

    return (
        <div className="pharmacist-dashboard-page">
            <h1 className="page-title">Pharmacist Dashboard</h1>

            <div className="phar-stats-grid">
                <StatCard 
                    icon={<FaFilePrescription style={{...iconStyles, color: '#3b82f6'}} />}
                    value="30" label="Today's Prescriptions" accentColor="#3b82f6"
                />
                <StatCard 
                    icon={<FaCalendarPlus style={{...iconStyles, color: '#ef4444'}} />}
                    value="30" label="Today's new Patients" accentColor="#ef4444"
                />
                <StatCard 
                    icon={<FaTriangleExclamation style={{...iconStyles, color: '#f59e0b'}} />}
                    value="5" label="Low stocks Alerts" accentColor="#f59e0b"
                />
                <StatCard 
                    icon={<FaRegMessage style={{...iconStyles, color: '#8b5cf6'}} />}
                    value="3" label="Doctor Clarifications" accentColor="#8b5cf6"
                />
            </div>

            <div className="main-content-grid">
                <div className="queue-card card">
                    <div className="card-header">
                        <h2 className="card-title">Prescription Queue</h2>
                        <div className="queue-controls">
                            <div className="search-bar">
                                <FaAlignLeft />
                                <input type="text" placeholder="search patient"/>
                                <FaSearch />
                            </div>
                            <a href="#" className="view-full-queue-link">View Full Queue</a>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <table className="rx-table">
                            <thead>
                                <tr>
                                    <th>RX Number</th>
                                    <th>Patient ID & Name</th>
                                    <th>Medication</th>
                                    <th>Doctor</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptionQueue.map(item => (
                                    <tr key={item.rx} className="clickable-row">
                                        <td className="rx-number" onClick={() => setSelectedPrescription(item)} style={{ cursor: "pointer" }}>{item.rx}</td>
                                        <td onClick={() => setSelectedPrescription(item)} style={{ cursor: "pointer" }}>
                                            <div className="patient-name">{item.patient}</div>
                                            <div className="patient-id">ID: {item.id}</div>
                                        </td>
                                        <td onClick={() => setSelectedPrescription(item)} style={{ cursor: "pointer" }}>{item.med}</td>
                                        <td onClick={() => setSelectedPrescription(item)} style={{ cursor: "pointer" }}>{item.doctor}</td>
                                        <td onClick={() => setSelectedPrescription(item)} style={{ cursor: "pointer" }}>
                                            <span className={`status-pill status-${item.status}`}>{item.status}</span>
                                        </td>
                                        <td>
                                            {item.status === 'pending' && (
                                                <button
                                                    className="action-btn view-fill-btn"
                                                    onClick={e => { e.stopPropagation(); handleAction(item.rx, "viewfill"); }}
                                                >
                                                    View&Fill
                                                </button>
                                            )}
                                            {item.status === 'ready' && (
                                                <button
                                                    className="action-btn dispense-btn"
                                                    onClick={e => { e.stopPropagation(); handleAction(item.rx, "dispense"); }}
                                                >
                                                    Dispense
                                                </button>
                                            )}
                                            {item.status === 'picked' && (
                                                <button
                                                    className="action-btn picked-btn"
                                                    onClick={e => e.stopPropagation()}
                                                    disabled
                                                >
                                                    <FaCheck/> Picked
                                                </button>
                                            )}
                                            {/* For ready after filling */}
                                            {item.status === 'ready' && (
                                                <span className="ready-text">Ready for Pick Up</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dispensed-card card">
                    <div className="card-header">
                        <h2 className="card-title">Recently Dispensed</h2>
                        <a href="#" className="view-all-link">View all</a>
                    </div>
                    <ul className="dispensed-list">
                        {recentlyDispensed.map((item, index) => (
                            <li key={index}>
                                <div className="dispensed-icon"><FaCheck /></div>
                                <div className="dispensed-info">
                                    <div className="patient-name">{item.name}</div>
                                    <div className="med-info">{item.med}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {selectedPrescription && (
                <PrescriptionDetailModal
                    prescription={selectedPrescription}
                    onClose={() => setSelectedPrescription(null)}
                />
            )}
        </div>
    );
}

export default PharmacistDashboard;