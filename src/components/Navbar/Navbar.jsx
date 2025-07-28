
// src/components/Navbar/Navbar.jsx
import React from 'react';
import { FaRegBell, FaChevronDown } from 'react-icons/fa6';
import './Navbar.css';


function Navbar({ userRole, userName, avatarSrc }) {
  // Determine avatar text from name, e.g., "Receptionist Jennifer" -> "RJ"
  function getInitials(name) {
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