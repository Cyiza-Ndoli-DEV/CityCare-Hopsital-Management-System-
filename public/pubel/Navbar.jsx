// src/components/Navbar/Navbar.jsx
import React from 'react';
import { FaRegBell, FaChevronDown } from 'react-icons/fa6';
import './Navbar.css';

// We now accept props: userRole and userName
function Navbar({ userRole, userName, avatarSrc }) {
  // Determine avatar text from name, e.g., "Receptionist Jennifer" -> "RJ"
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-icon">H</div>
        <h1 className="logo-text">CityCare Hospital</h1>
      </div>
      <div className="navbar-right">
        <button className="notification-button">
          <FaRegBell />
          {/* A little red dot for notifications */}
          <span className="notification-dot"></span> 
        </button>
        <div className="user-profile">
          <div className="user-avatar">
             {/* If an image src is provided, use it, otherwise show initials */}
            {avatarSrc ? <img src={avatarSrc} alt="User Avatar" /> : <span>{getInitials(userName)}</span>}
          </div>
          <div className="user-name-role">
            <span className="user-role">{userRole}</span>
            <span className="user-name">{userName}</span>
          </div>
          <FaChevronDown className="arrow-down" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

// // src/components/Navbar/Navbar.jsx
// import React from 'react';
// import { FaHospitalSymbol, FaBell, FaAngleDown } from 'react-icons/fa';
// import './Navbar.css';

// // We'll add the avatar image to the assets folder next
// // import Avatar from '../../assets/avatar.png';

// function Navbar() {
//     return (
//         <header className="navbar">
//             <div className="navbar-logo">
//                 <FaHospitalSymbol className="logo-icon" />
//                 <h1 className="hospital-name-color">CityCare Hospital</h1>
//             </div>
//             <div className="navbar-profile">
//                 <FaBell className="profile-icon" />
//                 <span>Admin Cyiza</span>
//                 {/*<img src={Avatar} alt="User Avatar" className="profile-avatar" />*/}
//                 <FaAngleDown className="profile-icon" />
//             </div>
//         </header>
//     );
// }

// export default Navbar;



// // src/pages/receptionist/PatientManagement.jsx
// import React, { useState } from 'react';
// import { FaPlus, FaEye, FaEnvelope, FaPenToSquare } from 'react-icons/fa6';
// import { FaSearch } from "react-icons/fa";
// import AddPatientModal from '../../components/AddPatientModal';
// import './PatientManagement.css';

// // Mock Data for our table
// const mockPatients = [
//   { id: '2023-04', name: 'Rwaga', avatar: 'R', age: '55/MALE', condition: 'Ulcers', lastVisit: 'Today 08:30 AM', status: 'Pending' },
//   { id: '2023-04', name: 'Alain', avatar: 'A', age: '12/FEMALE', condition: 'Hypertension', lastVisit: 'Yesterday 15:56', status: 'Paid' },
//   { id: '2023-04', name: 'Bob', avatar: 'B', age: '22/MALE', condition: 'Pneumonia', lastVisit: 'June 23 07:00 AM', status: 'Paid' },
//   { id: '2023-04', name: 'Alain', avatar: 'A', age: '12/FEMALE', condition: 'Hypertension', lastVisit: 'Yesterday 15:56', status: 'Paid' },
//   { id: '2023-04', name: 'Bob', avatar: 'B', age: '22/MALE', condition: 'Pneumonia', lastVisit: 'June 23 07:00 AM', status: 'Paid' },
//   { id: '2023-04', name: 'Alain', avatar: 'A', age: '12/FEMALE', condition: 'Hypertension', lastVisit: 'Yesterday 15:56', status: 'Paid' },
//   { id: '2023-04', name: 'Bob', avatar: 'B', age: '22/MALE', condition: 'Pneumonia', lastVisit: 'June 23 07:00 AM', status: 'Insurance' },
// ];

// function PatientManagement() {
//   const [activeTab, setActiveTab] = useState('inpatients'); // State for radio buttons
//   const [isModalOpen, setIsModalOpen] = useState(false);   // State for our new modal

//   return (
//     // Use a React Fragment <> to wrap the page and the modal
//     <>
//       <div className="patient-management-page">
//         <div className="page-header">
//           <div className="header-actions">
//             <button className="action-button add-patient-btn" onClick={() => setIsModalOpen(true)}>
//               <FaPlus /> Add Patient
//             </button>
//             {/* <button className="action-button view-patients-btn"><FaEye /> View Patients</button> */}
//           </div>
//         </div>

//         <div className="patient-type-toggle">
//           <label className={`toggle-label ${activeTab === 'inpatients' ? 'active' : ''}`}>
//             <input type="radio" name="patient-type" value="inpatients" checked={activeTab === 'inpatients'} onChange={() => setActiveTab('inpatients')} />
//             Inpatients
//           </label>
//           <label className={`toggle-label ${activeTab === 'outpatients' ? 'active' : ''}`}>
//             <input type="radio" name="patient-type" value="outpatients" checked={activeTab === 'outpatients'} onChange={() => setActiveTab('outpatients')} />
//             Outpatients
//           </label>
//         </div>

//         <div className="table-container-card">
//           <div className="table-controls">
//             <span className="patient-count">All patients(3000)</span>
//             <div className="search-and-filter">
//               <div className="search-bar">
//                 <input type="text" placeholder="search patient or patient ID" />
//                 <FaSearch className="search-icon"/>
//               </div>
//               <select className="status-filter">
//                 <option>All statuses</option>
//                 <option>Pending</option>
//                 <option>Paid</option>
//                 <option>Insurance</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="table-wrapper">
//             <table className="patients-table">
//               <thead>
//                 <tr>
//                   <th>Patient ID & Name</th>
//                   <th>Age/Gender</th>
//                   <th>Condition</th>
//                   <th>Last Visit</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {mockPatients.map((patient, index) => (
//                   <tr key={index}>
//                     <td className="patient-cell">
//                       <div className="patient-avatar">{patient.avatar}</div>
//                       <div>
//                         <span className="patient-name">{patient.name}</span>
//                         <span className="patient-id">ID: {patient.id}</span>
//                       </div>
//                     </td>
//                     <td>{patient.age}</td>
//                     <td>{patient.condition}</td>
//                     <td>{patient.lastVisit}</td>
//                     <td>
//                       <span className={`status-pill status-${patient.status.toLowerCase()}`}>
//                         {patient.status}
//                       </span>
//                     </td>
//                     <td className="actions-cell">
//                       <FaEye className="action-icon"/>
//                       <FaPenToSquare className="action-icon"/>
//                       <FaEnvelope className="action-icon"/>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Add the Modal component here, outside the main page div */}
//       <AddPatientModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </>
//   );
// }

// export default PatientManagement;