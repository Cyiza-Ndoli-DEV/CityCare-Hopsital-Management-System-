// src/components/BookAppointmentModal/BookAppointmentModal.jsx
import React, { useState } from 'react'; // 1. Import useState
import Modal from '../Modal/Modal';
import { FaCalendarCheck, FaCalendarPlus, FaCalendarDays } from 'react-icons/fa6'; // Corrected icon imports
import BookingSuccessModal from '../BookingSuccessModal/BookingSuccessModal'; // Import the new success modal
import './BookAppointmentModal.css';

// It now receives an 'onSuccess' function from the parent
function BookAppointmentModal({ isOpen, onClose, patientName }) {
  // 2. Add state to track if the booking was successful
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Booked!");
    // 3. Set the success state to true instead of just closing
    setIsBookingSuccessful(true);
  };

  // 4. Create a function to fully close and reset everything
  const handleFinalClose = () => {
    setIsBookingSuccessful(false); // Reset for next time
    onClose(); // Call the original close function from the parent
  };

  return (
    <>
        <Modal 
            isOpen={isOpen && !isBookingSuccessful} // Show only if isOpen is true AND booking is not successful
            onClose={onClose}
            title="" 
            className="book-appointment-modal"
        >
            <form onSubmit={handleSubmit} className="book-appointment-form">
                <div className="form-header">
                    <span className="header-icon-wrapper"><FaCalendarPlus /></span>
                    <h2 className="header-title">Book appointment</h2>
                </div>
                
                <div className="form-content">
                    <div className="form-group"><label htmlFor="patientName">Patient Name</label><input type="text" id="patientName" value={patientName} readOnly disabled /></div>
                    <div className="form-group">
                        <label htmlFor="department">Select department</label>
                        <input type="text" id="department" list="department-list" placeholder="cardiology" />
                        <datalist id="department-list">
                            <option value="Cardiology" />
                            <option value="Orthopedics" />
                            <option value="Dermatology" />
                            <option value="Neurology" />
                            <option value="General medicine" />
                        </datalist>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Select doctor</label>
                        <select id="doctor"><option value="" disabled>Select a doctor</option><option value="dr-aline">Dr. Aline</option><option value="dr-kabingo">Dr. Kabingo</option></select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Choose a date</label>
                        <div className="date-input-container">
                            <input type="date" id="date" />
                            <FaCalendarDays className="date-icon" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="time-slots-label">Select from these Available Time Slots</label>
                        <div className="time-slots">
                            <div className="time-slot"><input type="radio" name="time" id="time1" defaultChecked /><label htmlFor="time1">09:00 AM</label></div>
                            <div className="time-slot"><input type="radio" name="time" id="time2" /><label htmlFor="time2">09:30 AM</label></div>
                            <div className="time-slot"><input type="radio" name="time" id="time3" /><label htmlFor="time3">10:00 AM</label></div>
                            <div className="time-slot"><input type="radio" name="time" id="time4" /><label htmlFor="time4">10:30 AM</label></div>
                            <div className="time-slot"><input type="radio" name="time" id="time5" /><label htmlFor="time5">11:00 AM</label></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason">Reason for visit/symptoms</label>
                        <textarea id="reason" rows="4"></textarea>
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="book-btn"><FaCalendarCheck /> Book</button>
                </div>
            </form>
        </Modal>

        {/* 5. The success modal is now controlled by this component */}
        <BookingSuccessModal 
            isOpen={isBookingSuccessful}
            onClose={handleFinalClose}
        />
    </>
  );
}

export default BookAppointmentModal;