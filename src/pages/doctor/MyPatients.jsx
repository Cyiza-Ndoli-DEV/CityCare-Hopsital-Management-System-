// // src/pages/doctor/MyPatients.jsx

// import React from 'react';
// import { FaUserInjured, FaSearch, FaCalendarAlt, FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';
// import './MyPatients.css'; // We will update this CSS file next

// const MyPatients = () => {
//   // Sample patient data (no changes here)
//   const patients = [
//     {
//       id: '2023-04',
//       name: 'Rwaga',
//       age: 55,
//       gender: 'MALE',
//       condition: 'Ulcers',
//       lastVisit: 'Today 08:30 AM',
//       status: 'Inpatient'
//     },
//     {
//       id: '2023-05',
//       name: 'Alain',
//       age: 12,
//       gender: 'FEMALE',
//       condition: 'Hypertension',
//       lastVisit: 'June 23 07:00 AM',
//       status: 'Discharged'
//     },
//     {
//       id: '2023-06',
//       name: 'Bob',
//       age: 22,
//       gender: 'MALE',
//       condition: 'Pneumonia',
//       lastVisit: 'Yesterday 15:56',
//       status: 'Outpatient'
//     },
//     {
//       id: '2023-07',
//       name: 'Sarah Johnson',
//       age: 34,
//       gender: 'FEMALE',
//       condition: 'Migraine',
//       lastVisit: 'June 29 11:00 AM',
//       status: 'Outpatient'
//     }
//   ];

//   return (
//     <div className="my-patients-page">
//       <h1 className="page-title">
//         <FaUserInjured /> My Patients
//       </h1>

//       <div className="patients-list-card">
//         <div className="card-header">
//           <h2 className="card-title">All Assigned Patients(346)</h2>
//           <div className="card-controls">
//             <div className="search-bar">
//               <FaSearch className="search-icon" />
//               <input type="text" placeholder="Search patient by name or ID..." />
//             </div>
           
//           </div>
//         </div>

//         <div className="table-wrapper">
//           <table className="patients-table">
//             <thead>
//               <tr>
//                 <th>Patient ID & Name</th>
//                 <th>Age/Gender</th>
//                 <th>Condition</th>
//                 <th>Last Visit</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.map((patient) => (
//                 <tr key={patient.id}>
//                   <td>
//                     <div className="patient-name">{patient.name}</div>
//                     <div className="patient-id">ID: {patient.id}</div>
//                   </td>
//                   <td>{patient.age}/{patient.gender}</td>
//                   <td>{patient.condition}</td>
//                   <td>
//                     <div className="last-visit">
//                       <FaCalendarAlt className="calendar-icon" />
//                       {patient.lastVisit}
//                     </div>
//                   </td>
//                   <td>
//                     <span className={`status-badge status-${patient.status.toLowerCase()}`}>
//                       {patient.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button className="action-icon-btn view-btn" title="View Details">
//                         <FaPencilAlt />
//                       </button>
//                       <button className="action-icon-btn delete-btn" title="Remove Patient">
//                         <FaTrashAlt />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="pagination-container">
//           {/* We can make this dynamic later */}
//           <span className="page-number active">1</span>
//           <span className="page-number">2</span>
//           <span className="page-number">3</span>
//           <span className="page-number">4</span>
//           <span className="page-number">5</span>
//           <span className="page-number">6</span>
//           <span className="page-arrow"></span>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default MyPatients;

import React, { useState } from 'react';
import { FaUserInjured, FaSearch, FaCalendarAlt, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Modal from '../../components/Modal/Modal';
import PatientProfile from '../../components/PatientProfile/PatientProfile';
import './MyPatients.css';

const MyPatients = () => {
  // State management remains the same
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Patient data remains the same
  const patients = [
    {
      id: '2023-04',
      name: 'Rwaga',
      age: 25,
      gender: 'MALE',
      condition: 'Ulcers',
      lastVisit: 'Today 08:30 AM',
      status: 'Inpatient'
    },
    {
      id: '2023-05',
      name: 'Alain',
      age: 12,
      gender: 'FEMALE',
      condition: 'Hypertension',
      lastVisit: 'June 23 07:00 AM',
      status: 'Discharged'
    },
    {
      id: '2023-06',
      name: 'Bob',
      age: 22,
      gender: 'MALE',
      condition: 'Pneumonia',
      lastVisit: 'Yesterday 15:56',
      status: 'Outpatient'
    },
    {
      id: '2023-07',
      name: 'Sarah Johnson',
      age: 34,
      gender: 'FEMALE',
      condition: 'Migraine',
      lastVisit: 'June 29 11:00 AM',
      status: 'Outpatient'
    }
  ];

  // Handler functions remain the same
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="my-patients-page">
      <h1 className="page-title">
        <FaUserInjured /> My Patients
      </h1>

      <div className="patients-list-card">
        <div className="card-header">
          <h2 className="card-title">All Assigned Patients</h2>
          <div className="card-controls">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search patient by name or ID..." />
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient ID & Name</th>
                <th>Age/Gender</th>
                <th>Condition</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => {
                // --- THIS IS THE NEW LOGIC ---
                // 1. We create a variable that is true only if the patient's name is "Rwaga"
                const isClickable = patient.name === 'Rwaga';

                return (
                  <tr 
                    key={patient.id} 
                    // 2. The onClick handler is only applied if isClickable is true
                    onClick={isClickable ? () => handleViewPatient(patient) : null} 
                    // 3. The 'patient-row' class (for hover effect and pointer) is also only applied if isClickable is true
                    className={isClickable ? 'patient-row' : ''}
                  >
                    <td>
                      <div className="patient-name">{patient.name}</div>
                      <div className="patient-id">ID: {patient.id}</div>
                    </td>
                    <td>{patient.age}/{patient.gender}</td>
                    <td>{patient.condition}</td>
                    <td>
                      <div className="last-visit">
                        <FaCalendarAlt className="calendar-icon" />
                        {patient.lastVisit}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          // 4. The button's onClick is also made conditional
                          onClick={isClickable ? (e) => { e.stopPropagation(); handleViewPatient(patient); } : (e) => e.stopPropagation()} 
                          className="action-icon-btn view-btn" 
                          title="View Details"
                          // 5. The button is visually disabled for all other patients
                          disabled={!isClickable}
                        >
                          <FaPencilAlt />
                        </button>
                        <button onClick={(e) => e.stopPropagation()} className="action-icon-btn delete-btn" title="Remove Patient">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* The modal rendering logic remains the same */}
      <Modal 
        title="Patient Profile" 
        isOpen={isModalOpen} 
        onClose={closeModal}
      >
        <PatientProfile patient={selectedPatient} />
      </Modal>
    </div>
  );
};

export default MyPatients;