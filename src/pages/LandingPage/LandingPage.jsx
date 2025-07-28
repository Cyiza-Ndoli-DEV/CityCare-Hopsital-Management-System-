// src/pages/LandingPage/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHospitalUser, 
  FaCalendarCheck, 
  FaFileMedical, 
  FaUserMd,
  FaPhoneAlt,
  FaClinicMedical,
  FaProcedures,
  FaAmbulance,
  FaRegHospital
} from 'react-icons/fa';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState(null);

  function goToLogin() {
    navigate('/login');
  };

  const services = [
    {
      icon: <FaCalendarCheck className="service-icon" />,
      title: "Book Appointments",
      description: "Easily schedule and manage your appointments with our specialists online.",
      modalContent: (
        <div className="modal-content">
          <h3>Online Appointment Booking</h3>
          <p>Our system allows you to:</p>
          <ul>
            <li>Book appointments 24/7 from any device</li>
            <li>Select your preferred doctor</li>
            <li>Choose convenient time slots</li>
            <li>Receive instant confirmation</li>
            <li>Get reminders via email/SMS</li>
          </ul>
          <button className="modal-close" onClick={() => setActiveModal(null)}>Close</button>
        </div>
      )
    },
    {
      icon: <FaFileMedical className="service-icon" />,
      title: "Medical Records",
      description: "Securely view your lab results, prescription history, and visit summaries.",
      modalContent: (
        <div className="modal-content">
          <h3>Digital Medical Records</h3>
          <p>Access your complete health history including:</p>
          <ul>
            <li>Lab test results</li>
            <li>Doctor's notes</li>
            <li>Prescription history</li>
            <li>Vaccination records</li>
            <li>Allergy information</li>
          </ul>
          <p>All data is encrypted and HIPAA compliant.</p>
          <button className="modal-close" onClick={() => setActiveModal(null)}>Close</button>
        </div>
      )
    },
    {
      icon: <FaProcedures className="service-icon" />,
      title: "Emergency Services",
      description: "Immediate care when you need it most with our 24/7 emergency department.",
      modalContent: (
        <div className="modal-content">
          <h3>Emergency Care</h3>
          <p>Our emergency department features:</p>
          <ul>
            <li>Board-certified emergency physicians</li>
            <li>Level II trauma center</li>
            <li>24/7 availability</li>
            <li>Average wait time under 15 minutes</li>
            <li>Pediatric emergency specialists</li>
          </ul>
          <div className="emergency-contact">
            <FaPhoneAlt /> <span>Emergency: +2567700846807</span>
          </div>
          <button className="modal-close" onClick={() => setActiveModal(null)}>Close</button>
        </div>
      )
    }
  ];

  const navItems = [
    {
      name: "Services",
      content: (
        <div className="dropdown-content">
          <h4>Our Specialized Services</h4>
          <div className="service-list">
            <div className="service-item">
              <FaClinicMedical /> Primary Care
            </div>
            <div className="service-item">
              <FaUserMd /> Specialty Care
            </div>
            <div className="service-item">
              <FaProcedures /> Surgical Services
            </div>
            <div className="service-item">
              <FaAmbulance /> Emergency Care
            </div>
            <div className="service-item">
              <FaRegHospital /> Diagnostic Imaging
            </div>
          </div>
        </div>
      )
    },
    {
      name: "Find a doctor",
      content: (
        <div className="dropdown-content">
          <h4>Find Your Specialist</h4>
          <p>Search our network of over 200 board-certified physicians across 30 specialties.</p>
          <div className="search-box">
            <input type="text" placeholder="Search by specialty, name, or location" />
            <button>Search</button>
          </div>
        </div>
      )
    },
    {
      name: "Contact Us",
      content: (
        <div className="dropdown-content contact-info">
          <h4>Contact Information</h4>
          <p><strong>Main Hospital:</strong> 123 Medical Center Drive, Cityville</p>
          <p><strong>Phone:</strong> +2567700846807</p>
          <p><strong>Email:</strong> info@citycarehospital.com</p>
          <p><strong>Hours:</strong> 24/7 Emergency,  Main Desk: 8am-8pm</p>
          <div className="map-placeholder">
            <div style={{ width: '300px', height: '200px', overflow: 'hidden', borderRadius: '10px' }}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7979.495655952074!2d32.57396686086729!3d0.3405906777007434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sug!4v1753244288884!5m2!1sen!2sug"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

          </div>
        </div>
      )
    }
  ];

  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="navbar-container container">
            <div className="logo">
                <FaHospitalUser className="logo-icon" />
                <span>CityCare Hospital</span>
            </div>
            <div className="nav-links">
              {navItems.map((item, index) => (
                <div 
                  key={index}
                  className="nav-item-container"
                  onMouseEnter={() => setActiveNavItem(index)}
                  onMouseLeave={() => setActiveNavItem(null)}
                >
                  <span className="nav-item">{item.name}</span>
                  {activeNavItem === index && (
                    <div className="nav-dropdown">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
                <button onClick={goToLogin} className="login-button">Admin Login</button>
            </div>
        </div>
      </header>

      <main>
          <section className="hero-section">
              <div className="container">
                  <h1>Health, managed with clarity and efficiency. Access your portal below.</h1>
                  <button onClick={goToLogin} className="hero-cta">Staff & Doctor Portal</button>
              </div>
          </section>

          <section className="services-section">
              <div className="container">
                  <h2 className="section-title">A Seamless Healthcare Experience</h2>
                  <div className="services-grid">
                    {services.map((service, index) => (
                      <div 
                        key={index} 
                        className="service-card"
                        onClick={() => setActiveModal(index)}
                      >
                        {service.icon}
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                      </div>
                    ))}
                  </div>
              </div>
          </section>
      </main>

      {activeModal !== null && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {services[activeModal].modalContent}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;