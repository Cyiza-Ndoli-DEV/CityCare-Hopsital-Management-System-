// src/pages/admin/StaffManagement.jsx
import { useState } from 'react';
import { FaUserGear, FaPlus, FaBars, FaEye, FaPen, FaToggleOff, FaUserGraduate, FaCircleCheck } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Modal from '../../components/Modal/Modal';
import './StaffManagement.css';

const mockStaffData = [
    { id: 'EMP-001', name: 'Dr Byaruhanga', role: 'Cardiologist', department: 'Cardiology', contact: 'Byar@gmail.com', status: 'Active' },
    { id: 'EMP-002', name: 'Susan Mills', role: 'Receptionist', department: 'Administration', contact: 'smills@city.care', status: 'Active' },
    { id: 'EMP-003', name: 'Dr Robert Davis', role: 'Orthopedics', department: 'Orthopedics', contact: 'rdavis@city.care', status: 'onLeave' },
    { id: 'EMP-004', name: 'Tom Spencer', role: 'Pharmacist', department: 'Pharmacy', contact: 'tspencer@city.care', status: 'Active' },
];

function StaffManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    // new state for the success modal
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // 3. Create a function to handle the form submission
    const handleAddStaffSubmit = (e) => {
        e.preventDefault(); // This stops the browser from reloading the page

        setIsAddModalOpen(false);       // Close the add form modal
        setIsSuccessModalOpen(true);    // Open the success modal
    };

    return (
        <>
            <div className="staff-management-page">
                <div className="page-header">
                    <div className="title-container">
                        <FaUserGear />
                        <h2>Staff Management</h2>
                    </div>
                    <button className="add-staff-btn" onClick={() => setIsAddModalOpen(true)}>
                        <FaPlus /> Add Staff
                    </button>
                </div>

                <div className="table-card">
                    <div className="table-controls">
                        <div className="search-input-container">
                            <FaBars className="search-prefix-icon" />
                            <input type="text" placeholder="search by name or ID" />
                            <FaSearch className="search-suffix-icon" />
                        </div>
                        <select className="department-filter">
                            <option>All departments</option>
                            <option>Cardiology</option>
                            <option>Administration</option>
                            <option>Orthopedics</option>
                        </select>
                    </div>
                    <table className="staff-table">
                        <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mockStaffData.map(staff => (
                            <tr key={staff.id}>
                                <td>{staff.id}</td>
                                <td>{staff.name}</td>
                                <td>{staff.role}</td>
                                <td>{staff.department}</td>
                                <td>{staff.contact}</td>
                                <td>
                                    <span className={`status-tag status-${staff.status.toLowerCase()}`}>{staff.status}</span>
                                </td>
                                <td className="actions-cell">
                                    <FaEye className="action-icon" />
                                    <FaPen className="action-icon" />
                                    <FaToggleOff className="action-icon" />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* The "Add Staff" Modal */}
            
            <Modal
                title="Add new staff member"
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            >
                {/* 4. Attach the submit handler to the form */}
                <form className="add-staff-form" onSubmit={handleAddStaffSubmit}>
  <div className="form-section">
    <h3 className="section-title">Employment & Role</h3>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="staff-id">Staff ID</label>
        <input type="text" id="staff-id" placeholder="e.g. EMP-005" />
      </div>
      <div className="form-group">
        <label htmlFor="hire-date">Date of Hire</label>
        <input type="date" id="hire-date" />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <select id="department">
          <option>Select department</option>
          <option>Cardiology</option>
          <option>Pharmacy</option>
          <option>Administration</option>
          <option>Orthopedics</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="role">Role / Position</label>
        <select id="role">
          <option>Select role</option>
          <option>Cardiologist</option>
          <option>Receptionist</option>
          <option>Pharmacist</option>
          <option>Orthopedic Specialist</option>
        </select>
      </div>
    </div>
  </div>

  <div className="form-section">
    <h3 className="section-title">Personal Details</h3>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" placeholder="e.g. Jean" />
      </div>
      <div className="form-group">
        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" placeholder="e.g. Cyiza" />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="phone">Phone Contact</label>
        <input type="tel" id="phone" placeholder="+256 700 000000" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="e.g. staff@example.com" />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group" style={{ flexGrow: 0.48 }}>
        <label htmlFor="password">Initial Password</label>
        <input type="password" id="password" placeholder="e.g. Staff@123" />
      </div>
    </div>
  </div>

  <div className="form-actions">
    <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
    <button type="submit" className="btn-add-staff">
      <FaUserGraduate /> Add Staff
    </button>
  </div>
</form>

            </Modal>

            {/*  The Success Modal */}
            <Modal
                title="Successful registration" // Success modal has no title in the header
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            >
                <div className="success-modal-content">
                    <div className="success-icon-container">
                        <FaCircleCheck className="success-icon" />
                    </div>
                    <h2 className="success-title">Staff Registered Successfully!</h2>
                    <p className="success-message">
                        An email with login credentials and system instructions has been sent to cyndoli34@gmail.com.
                    </p>
                    <div className="staff-summary-box">
                        <p><strong>Name:</strong> CYIZA JEAN DE DIEU</p>
                        <p><strong>Staff ID:</strong> EMP-005</p>
                        <p><strong>Role:</strong> Cardiologist</p>
                    </div>
                    <button className="btn-ok" onClick={() => setIsSuccessModalOpen(false)}>OK</button>
                </div>
            </Modal>
        </>
    );
}

export default StaffManagement;