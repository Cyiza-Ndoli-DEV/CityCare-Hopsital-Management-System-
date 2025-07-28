import React, { useState, useMemo } from 'react';
import { mockPatients } from '../../data/mockPatients';
import './AdminPatientRecords.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons

// PatientDetailModal remains the same
const PatientDetailModal = ({ patient, onClose }) => {
    if (!patient) return null;
    // We can reuse the modal overlay and basic structure from your global modal if available
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content patient-detail-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{patient.fullName}'s Details</h2>
                    <button onClick={onClose} className="modal-close-button">×</button>
                </div>
                <div className="modal-body">
                    <p><strong>Patient ID:</strong> {patient.id}</p>
                    <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Contact:</strong> {patient.contactNumber}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                    <p><strong>Allergies:</strong> {patient.allergies.join(', ')}</p>
                </div>
            </div>
        </div>
    );
};

// A simple Edit Modal for demonstration
const EditPatientModal = ({ patient, onClose, onSave }) => {
    if (!patient) return null;
    // In a real app, you'd have controlled form inputs
    return (
         <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Edit {patient.fullName}</h2>
                    <button onClick={onClose} className="modal-close-button">×</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" defaultValue={patient.fullName} />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="text" defaultValue={patient.contactNumber} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" defaultValue={patient.email} />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="button-cancel" onClick={onClose}>Cancel</button>
                            <button type="submit" className="button-save">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function AdminPatientRecords() {
    const [searchTerm, setSearchTerm] = useState('');
    const [patientList, setPatientList] = useState(mockPatients); // Use state for patient list to allow deletion
    const [patientToView, setPatientToView] = useState(null);
    const [patientToEdit, setPatientToEdit] = useState(null);

    const filteredPatients = useMemo(() => {
        if (!searchTerm) {
            return patientList;
        }
        return patientList.filter(patient =>
            patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, patientList]);

    const handleRowClick = (patient) => {
        setPatientToView(patient);
    };

    const handleEditClick = (patient) => {
        setPatientToEdit(patient);
    };
    
    const handleDeleteClick = (patientId) => {
        // Since this is for demo, we'll use a simple confirm dialog
        if (window.confirm('Are you sure you want to delete this patient record?')) {
            setPatientList(prevList => prevList.filter(p => p.id !== patientId));
            // In a real app, you would call an API here.
            console.log(`Deleted patient with ID: ${patientId}`);
        }
    };
    
    const handleSaveChanges = () => {
        // For demonstration, we just log and close the modal.
        // In a real app, you'd get the form data and call an API.
        console.log("Saving changes for patient:", patientToEdit.fullName);
        setPatientToEdit(null); // Close modal on save
    };

    return (
        <div className="patient-records-container">
            <h1 className="page-header">Patient Records(2800)</h1>
            <div className="controls-container">
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="patient-table-container">
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Contact Number</th>
                            <th>Last Visit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map(patient => (
                                <tr 
                                    key={patient.id} 
                                    className="clickable-row" 
                                    onClick={() => handleRowClick(patient)}
                                >
                                    <td>{patient.id}</td>
                                    <td>{patient.fullName}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.contactNumber}</td>
                                    <td>{patient.lastVisit}</td>
                                    <td onClick={(e) => e.stopPropagation()}> {/* Stop row click from firing when buttons are clicked */}
                                        <div className="action-buttons-wrapper">
                                            <button 
                                                className="action-icon-button edit-button"
                                                onClick={() => handleEditClick(patient)}
                                                title="Edit Patient"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                className="action-icon-button delete-button"
                                                onClick={() => handleDeleteClick(patient.id)}
                                                title="Delete Patient"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data-cell">No patients found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <PatientDetailModal patient={patientToView} onClose={() => setPatientToView(null)} />
            <EditPatientModal patient={patientToEdit} onClose={() => setPatientToEdit(null)} onSave={handleSaveChanges} />
        </div>
    );
}

export default AdminPatientRecords;