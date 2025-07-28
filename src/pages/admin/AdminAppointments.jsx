import React, { useState, useMemo, useEffect } from 'react';
import { mockAppointments, mockDoctors } from '../../data/mockAppointments';
import './AdminAppointments.css';
import { FaEdit, FaTrashAlt, FaCalendarCheck, FaCalendarDay, FaCalendarWeek, FaHourglassHalf } from 'react-icons/fa';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import AppointmentDetailModal from '../../components/AppointmentDetailModal/AppointmentDetailModal';
import Modal from '../../components/Modal/Modal';

// Helper Functions
const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.split('T')[0];
};

const isToday = (dateStr) => {
  if (!dateStr) return false;
  return new Date(dateStr).toDateString() === new Date().toDateString();
};

const isThisWeek = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  const date = new Date(dateStr);
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

// StatCard Component
const StatCard = ({ title, value, icon, onClick, isActive }) => (
  <div className={`stat-card-appointments ${isActive ? 'active' : ''}`} onClick={onClick}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <span className="stat-title">{title}</span>
      <span className="stat-value">{value}</span>
    </div>
  </div>
);

// DeleteConfirmationDialog Component
const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, appointment }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-confirmation-dialog">
      <div className="delete-confirmation-content">
        <h3>Delete Appointment</h3>
        <p>Are you sure you want to delete appointment {appointment?.id} for {appointment?.patientName}?</p>
        <div className="delete-confirmation-buttons">
          <button className="button-cancel" onClick={onClose}>Cancel</button>
          <button className="button-confirm" onClick={() => onConfirm(appointment.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// EditAppointmentModal Component
const EditAppointmentModal = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    time: '',
    status: 'Pending',
    doctorName: mockDoctors[0] || '',
    patientName: '',
    notes: ''
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        id: appointment.id || '',
        date: appointment.date || '',
        time: appointment.time || '',
        status: appointment.status || 'Pending',
        doctorName: appointment.doctorName || mockDoctors[0] || '',
        patientName: appointment.patientName || '',
        notes: appointment.notes || ''
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!appointment) return null;

  return (
    <Modal 
      title={`Edit Appointment (ID: ${appointment.id})`}
      isOpen={!!appointment}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="edit-appointment-form">
        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            name="date" 
            value={formatDateForInput(formData.date)} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input 
            type="time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="form-group">
          <label>Doctor</label>
          <select name="doctorName" value={formData.doctorName} onChange={handleChange} required>
            {mockDoctors.map(doc => (
              <option key={doc} value={doc}>{doc}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="form-actions">
          <button type="button" className="button-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button-save">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Main Component
function AdminAppointments() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [appointmentToView, setAppointmentToView] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const stats = useMemo(() => ({
    today: appointments.filter(a => isToday(a.date)).length,
    thisWeek: appointments.filter(a => isThisWeek(a.date)).length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    all: appointments.length
  }), [appointments]);

  const filteredAppointments = useMemo(() => {
    let filtered = [...appointments];

    switch (activeFilter) {
      case 'today': 
        filtered = filtered.filter(a => isToday(a.date));
        break;
      case 'week':
        filtered = filtered.filter(a => isThisWeek(a.date));
        break;
      case 'pending':
        filtered = filtered.filter(a => a.status === 'Pending');
        break;
      default:
        break;
    }

    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.patientName?.toLowerCase().includes(lowercasedFilter) ||
        app.doctorName?.toLowerCase().includes(lowercasedFilter) ||
        app.id?.toLowerCase().includes(lowercasedFilter)
      );
    }
    return filtered;
  }, [searchTerm, appointments, activeFilter]);

  const handleDelete = (id) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    setAppointmentToDelete(null);
    setSuccessMsg('Appointment deleted successfully!');
  };
  
  const handleSaveEdit = (updatedAppointment) => {
    setAppointments(prev => prev.map(app => 
      app.id === updatedAppointment.id ? updatedAppointment : app
    ));
    setAppointmentToEdit(null);
    setSuccessMsg('Appointment updated successfully!');
  };

  return (
    <div className="appointments-container">
      {successMsg && <SuccessMessage message={successMsg} />}

      <h1 className="page-header">
        Appointments Management
      </h1>

      <div className="appointments-stats-grid">
        <StatCard 
          title="Today's Appointments" 
          value={stats.today} 
          icon={<FaCalendarDay />} 
          onClick={() => setActiveFilter('today')} 
          isActive={activeFilter === 'today'} 
        />
        <StatCard 
          title="This Week's Appointments" 
          value={stats.thisWeek} 
          icon={<FaCalendarWeek />} 
          onClick={() => setActiveFilter('week')} 
          isActive={activeFilter === 'week'} 
        />
        <StatCard 
          title="Pending Confirmation" 
          value={stats.pending} 
          icon={<FaHourglassHalf />} 
          onClick={() => setActiveFilter('pending')} 
          isActive={activeFilter === 'pending'} 
        />
        <StatCard 
          title="All Appointments" 
          value={stats.all} 
          icon={<FaCalendarCheck />} 
          onClick={() => setActiveFilter('all')} 
          isActive={activeFilter === 'all'} 
        />
      </div>

      <div className="controls-container">
        <input
          type="text"
          placeholder="Search by Patient, Doctor, or ID..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appt ID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(app => (
                <tr key={app.id}>
                  <td onClick={() => setAppointmentToView(app)}>{app.id}</td>
                  <td onClick={() => setAppointmentToView(app)}>{app.patientName}</td>
                  <td onClick={() => setAppointmentToView(app)}>{app.doctorName}</td>
                  <td onClick={() => setAppointmentToView(app)}>
                    {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'} - {app.time || 'N/A'}
                  </td>
                  <td>
                    <span className={`status-badge status-${app.status?.toLowerCase()}`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="action-buttons-wrapper">
                      <button 
                        className="action-icon-button edit-button" 
                        title="Edit" 
                        onClick={() => setAppointmentToEdit(app)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-icon-button delete-button" 
                        title="Delete" 
                        onClick={() => setAppointmentToDelete(app)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data-cell">
                  No appointments match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Appointment Detail Modal */}
      <AppointmentDetailModal 
        appointment={appointmentToView}
        isOpen={!!appointmentToView}
        onClose={() => setAppointmentToView(null)}
      />

      {/* Edit Appointment Modal */}
      <EditAppointmentModal 
        appointment={appointmentToEdit}
        onClose={() => setAppointmentToEdit(null)}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={!!appointmentToDelete}
        onClose={() => setAppointmentToDelete(null)}
        onConfirm={handleDelete}
        appointment={appointmentToDelete}
      />
    </div>
  );
}

export default AdminAppointments;