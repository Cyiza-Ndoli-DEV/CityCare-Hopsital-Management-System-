import React, { useState } from 'react';
import './AddPatientModal.css';

const AddPatientModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    insuranceNumber: '',
    nextOfKinAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-patient-modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Add New Patient</h2>
            <button className="modal-close-button" onClick={onClose}>×</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Column 1: Personal Information */}
              <div className="form-column">
                <h3 className="section-title">
                  <span className="title-icon">👤</span>
                  Personal Information
                </h3>
                
                <div className="form-group">
                  <label>First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date Of Birth*</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="dob-input"
                  />
                </div>
                <div className="form-group">
                  <label>Insurance Number</label>
                  <input
                    type="text"
                    name="insuranceNumber"
                    value={formData.insuranceNumber}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD-XXXX"
                  />
                </div>
              </div>

              {/* Column 2: Contact Information */}
              <div className="form-column">
                <h3 className="section-title">
                  <span className="title-icon">📱</span>
                  Contact Information
                </h3>
                
                <div className="form-group">
                  <label>Gender*</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number*</label>
                  <div className="phone-input">
                    <span className="country-code">+256</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="700123456"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, City"
                  />
                </div>
              </div>

              {/* Column 3: Next of Kin */}
              <div className="form-column">
                <h3 className="section-title">
                  <span className="title-icon">👪</span>
                  Next Of Kin
                </h3>
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="nextOfKinName"
                    value={formData.nextOfKinName}
                    onChange={handleChange}
                    placeholder="Relative's name"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="nextOfKinAddress"
                    value={formData.nextOfKinAddress}
                    onChange={handleChange}
                    placeholder="Street, City"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="phone-input">
                    <span className="country-code">+256</span>
                    <input
                      type="tel"
                      name="nextOfKinPhone"
                      value={formData.nextOfKinPhone}
                      onChange={handleChange}
                      placeholder="700123456"
                    />
                  </div>
                </div>

                
              </div>
            </div>

            <div className="form-footer">
              <div className="required-hint">* Required fields</div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Register Patient
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;