// src/components/Sidebar/DoctorSideBar.jsx

import React from 'react';
// 👇 1. IMPORT NavLink from react-router-dom
import { NavLink } from 'react-router-dom'; 
import { FaUserDoctor, FaCheckToSlot, FaUsers, FaCalendarDays, FaNotesMedical, FaStar, FaBarsStaggered } from 'react-icons/fa6';
import './DoctorSideBar.css';

const DoctorSideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <FaUserDoctor /> Doctor
      </div>
      <nav>
        <div className="menu-header">MAIN</div>
        <ul className="nav-list">
          {/* 👇 2. REPLACE <a> with NavLink and href with to. Use a function for className. */}
          <li>
            <NavLink to="/doctor" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <FaCheckToSlot className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor/my-patients" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <FaUsers className="icon" /> My Patients
            </NavLink>
          </li>
          {/* Note: Added placeholder paths for other links so they can be implemented later */}
          <li>
            <NavLink to="/doctor/appointments" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <FaCalendarDays className="icon" /> Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor/medical-records" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <FaNotesMedical className="icon" /> Medical records
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor/prescriptions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <FaStar className="icon" /> Prescriptions
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctor/records" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <FaBarsStaggered className="icon" /> Records
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DoctorSideBar;