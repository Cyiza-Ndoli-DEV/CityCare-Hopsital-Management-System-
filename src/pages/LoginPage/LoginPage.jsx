// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHospitalUser, FaArrowRightToBracket } from 'react-icons/fa6';
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); 
    // Then I navigate to the admin dashboard.
    navigate('/admin'); 
  }

  return (
    <div className="login-page-container">
      <div className="login-box">
        <div className="login-header">
          <FaHospitalUser className="login-logo-icon" />
          <h1>CityCare staff Portal</h1>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Admin ID or email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="form-actions">
            <button type="submit" className="login-button">
              <FaArrowRightToBracket /> Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;