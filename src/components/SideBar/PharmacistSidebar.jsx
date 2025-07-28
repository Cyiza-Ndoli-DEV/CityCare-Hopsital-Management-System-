import React from 'react';
import { FaTachometerAlt, FaBoxes, FaChartBar, FaComments } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; // 1. Use NavLink instead of Link
import './PharmacistSidebar.css';

const PharmacistSidebar = () => {
  return (
    <aside className="pharmacist-sidebar">
      <div className="sidebar-header">
        <h3>Pharmacist</h3>
      </div>
      <nav>
        <ul className="sidebar-menu">
          <li>
            {/* 2. Use NavLink and a function for the className */}
            <NavLink 
              to="/pharmacist" 
              end // This `end` prop is crucial - it means "only be active on this exact path"
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <FaTachometerAlt className="menu-icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/pharmacist/inventory" 
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <FaBoxes className="menu-icon" />
              <span>Inventory</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/pharmacist/reports" 
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <FaChartBar className="menu-icon" />
              <span>Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/pharmacist/messages" 
              className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
              <FaComments className="menu-icon" />
              <span>Doctor Messages</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default PharmacistSidebar;