import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import AppointmentStats from '../../components/Appointments/AppointmentStats';
import AppointmentRequestCard from '../../components/Appointments/AppointmentRequestCard';
import TimelineItem from '../../components/Appointments/TimelineItem';
import Modal from '../../components/Modal/Modal';
import AddAppointmentModal from '../../components/AddAppointmentModal/AddAppointmentModal';
import AppointmentDetailModal from '../../components/AppointmentDetailModal/AppointmentDetailModal';
import Toast from '../../components/Toast/Toast';
import doctorsIllustration from '../../assets/doctors-illustration.jpg';
import './DoctorAppointments.css';

// --- CONSTANTS ---
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// --- Initial Mock Data ---
const initialAppointmentRequests = [
  { id: 1, name: 'Michael Kintu', details: 'Male, 38', treatment: 'Treatment - Regular chechup', time: '10.00am -11.00am', avatar: 'https://i.pravatar.cc/150?u=mickel' },
  { id: 2, name: 'Ssemwanga', details: 'Male, 38', treatment: 'Treatment - Regular chechup', time: '11.00am -12.00pm', avatar: 'https://i.pravatar.cc/150?u=sebastin' },
  { id: 3, name: 'Kiconco', details: 'Female, 24', treatment: 'Treatment - Root Cleaning', time: '1.00pm -2.00pm', avatar: 'https://i.pravatar.cc/150?u=nazra' },
  { id: 4, name: 'Mr. Wamala', details: 'Male, 48', treatment: 'Treatment - Teeth Removing', time: '2.00pm -3.00pm', avatar: 'https://i.pravatar.cc/150?u=kennedy' },
];
const initialTimelineEvents = [
  { id: 1, hour: '10.00 am', type: 'checkup', title: 'Patient Checkup', patientName: 'Naila Fernandaz', timeRange: '10.30 am - 11.00 am' },
  { id: 2, hour: '11.00 am', type: 'cleaning', title: 'Root Cleaning', patientName: 'Michel Jordan', timeRange: '10.30 am - 11.00 am' },
];

const DoctorAppointments = () => {
  // --- All State Management ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [calendarDays, setCalendarDays] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const [appointmentRequests, setAppointmentRequests] = useState(initialAppointmentRequests);
  const [timelineEvents, setTimelineEvents] = useState(initialTimelineEvents);
  
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 5; i++) { years.push(i); }

  useEffect(() => {
    const generateCalendarDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysArray = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        daysArray.push({ day: dayNames[date.getDay()], date: i, appointmentCount: (i === 11 || i === 14 || i === 18) ? Math.floor(Math.random() * 5) + 1 : 0, });
      }
      setCalendarDays(daysArray);
    };
    generateCalendarDays();
  }, [currentDate]);

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
    setSelectedDate(1);
  };
  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
    setSelectedDate(1);
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };
  const showToast = (message) => {
    setToast({ show: true, message: message });
  };
  const handleAcceptRequest = (requestId, patientData) => {
    const newTimelineEvent = { id: new Date().getTime(), hour: patientData.time.split('-')[0], type: 'checkup', title: patientData.treatment.split(' - ')[1], patientName: patientData.name, timeRange: patientData.time, };
    setTimelineEvents(prevEvents => [...prevEvents, newTimelineEvent]);
    setAppointmentRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
  };
  const handleRejectRequest = (requestId) => {
    setAppointmentRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
  };

  return (
    <>
      <div className="appointments-page">
        <div className="page-layout">
          <main className="main-column">
            <div className="add-appointment-banner">
              <div className="banner-content">
                <h2>Add appointment in your schedule now</h2>
                <button className="btn-add-appointment" onClick={() => setIsAddModalOpen(true)}>
                  <FaPlus /> Add Appointment
                </button>
              </div>
              <div className="banner-illustration">
                <img src={doctorsIllustration} alt="Doctors illustration" />
              </div>
            </div>
            <div className="calendar-card">
              <div className="card-header">
                <h3>Calender</h3>
                <div className="date-selectors">
                  <select className="month-selector" value={currentDate.getMonth()} onChange={handleMonthChange}>
                    {months.map((month, index) => (<option key={month} value={index}>{month}</option>))}
                  </select>
                  <select className="year-selector" value={currentDate.getFullYear()} onChange={handleYearChange}>
                    {years.map(year => (<option key={year} value={year}>{year}</option>))}
                  </select>
                </div>
              </div>
              <div className="horizontal-calendar">
                {calendarDays.map((item) => (
                  <div key={item.date} className="calendar-day-item" onClick={() => handleDateClick(item.date)}>
                    <span className="calendar-day-name">{item.day}</span>
                    <span className={`calendar-date-number ${item.date === selectedDate ? 'active-date' : ''}`}>
                      {item.date}
                      {item.appointmentCount > 0 && (<span className="appointment-count-badge">{item.appointmentCount}</span>)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="timeline-section">
              <h3>Day's Timeline</h3>
              <div className="timeline-list">
                {timelineEvents.map(event => (
                  <TimelineItem key={event.id} event={event} onViewDetails={handleViewDetails} />
                ))}
              </div>
            </div>
          </main>
          <aside className="sidebar-column">
            <AppointmentStats />
            <div className="requests-list-card">
              <div className="card-header">
                <h3>Appointment Requests</h3>
                <a href="#" className="view-all-link">View All</a>
              </div>
              <div className="requests-list">
                {appointmentRequests.map(patient => (
                  <AppointmentRequestCard 
                    key={patient.id} 
                    patient={patient}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Modal 
        title="Add New Appointment"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <AddAppointmentModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSaveSuccess={showToast} 
        />
      </Modal>
      <Modal
        title="Appointment Details"
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      >
        <AppointmentDetailModal event={selectedEvent} />
      </Modal>
      <div className="toast-wrapper">
        {toast.show && (
          <Toast 
            message={toast.message} 
            type="success" 
            onClose={() => setToast({ show: false, message: '' })} 
          />
        )}
      </div>
    </>
  );
};

export default DoctorAppointments;