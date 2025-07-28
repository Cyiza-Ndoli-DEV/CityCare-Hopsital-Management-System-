import React, { useState, useMemo, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Toast from '../../components/Toast/Toast'; // 1. IMPORT THE TOAST COMPONENT
import './DoctorPrescriptions.css';

// --- MOCK DATA GENERATION ---
const DOCTOR = "Dr. Ssekamatte";
const STATUS = ["Active", "Completed", "Stopped"];
const PATIENTS = ["Jane Doe", "John Smith", "Alice Brown", "Bob White", "Charlie Black", "Diana Green"];
const MEDICATIONS = ["Lisinopril", "Metformin", "Albuterol", "Ibuprofen", "Sertraline", "Zoloft", "Amoxicillin"];
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (from, to) => new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime())).toISOString().slice(0, 10);

const generatePrescriptions = (n) => Array.from({ length: n }, (_, i) => ({
  id: String(i + 1),
  patient: randomItem(PATIENTS),
  medication: randomItem(MEDICATIONS),
  dosage: `${Math.ceil(Math.random() * 2) * 250} mg`,
  status: randomItem(STATUS),
  datePrescribed: randomDate(new Date(2024, 1, 1), new Date()),
  notes: "Take with food. Monitor side effects.",
  doctor: DOCTOR,
  duration: `${3 + Math.floor(Math.random() * 8)} days`,
  frequency: `${1 + Math.floor(Math.random() * 2)}x/day`
}));

// --- Add/Edit Modal Component ---
const AddEditModal = ({ prescription, onSave, onCancel }) => {
  const [formData, setFormData] = useState(prescription || {
    patient: '', medication: '', dosage: '', frequency: '', duration: '', status: 'Active', datePrescribed: new Date().toISOString().slice(0, 10), notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, doctor: DOCTOR });
  };
  
  return (
    <div className="modal-bg">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <h3>{prescription ? 'Edit' : 'Add'} Prescription</h3>
          <div className="form-group"><label>Patient Name</label><input name="patient" required value={formData.patient} onChange={handleChange} list="patients-list" /><datalist id="patients-list">{PATIENTS.map(p => <option key={p}>{p}</option>)}</datalist></div>
          <div className="form-group"><label>Medication</label><input name="medication" required value={formData.medication} onChange={handleChange} list="med-list" /><datalist id="med-list">{MEDICATIONS.map(m => <option key={m}>{m}</option>)}</datalist></div>
          <div className="form-group"><label>Dosage</label><input name="dosage" required value={formData.dosage} onChange={handleChange} /></div>
          <div className="form-group"><label>Frequency</label><input name="frequency" value={formData.frequency} onChange={handleChange} /></div>
          <div className="form-group"><label>Duration</label><input name="duration" value={formData.duration} onChange={handleChange} /></div>
          <div className="form-group"><label>Status</label><select name="status" required value={formData.status} onChange={handleChange}>{STATUS.map(s => <option key={s}>{s}</option>)}</select></div>
          <div className="form-group"><label>Date Prescribed</label><input name="datePrescribed" type="date" required value={formData.datePrescribed} onChange={handleChange} /></div>
          <div className="form-group"><label>Notes</label><textarea name="notes" value={formData.notes} onChange={handleChange}></textarea></div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="save-btn">{prescription ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Delete Confirmation Modal Component ---
const ConfirmDeleteModal = ({ prescription, onDelete, onCancel }) => (
  <div className="modal-bg">
    <div className="modal-dialog">
      <h3>Delete Prescription</h3>
      <p>Are you sure you want to delete this prescription for <strong>{prescription.patient}</strong>?</p>
      <div className="modal-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button type="button" className="delete-confirm-btn" onClick={() => onDelete(prescription.id)}>Delete</button>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---
const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState(generatePrescriptions(14));
  const [selectedId, setSelectedId] = useState(null);
  const [filters, setFilters] = useState({ patient: '', medication: '', status: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [prescriptionToEdit, setPrescriptionToEdit] = useState(null);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState(null);
  
  // 2. ADD STATE FOR THE TOAST NOTIFICATION
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    if (!selectedId && prescriptions.length > 0) {
      setSelectedId(prescriptions[0].id);
    }
  }, [prescriptions, selectedId]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(p =>
      (!filters.patient || p.patient.toLowerCase().includes(filters.patient.toLowerCase())) &&
      (!filters.medication || p.medication.toLowerCase().includes(filters.medication.toLowerCase())) &&
      (!filters.status || p.status === filters.status)
    ).sort((a, b) => new Date(b.datePrescribed) - new Date(a.datePrescribed));
  }, [prescriptions, filters]);

  const selectedPrescription = useMemo(() => {
    return prescriptions.find(p => p.id === selectedId);
  }, [prescriptions, selectedId]);
  
  const statCardsData = useMemo(() => {
    const total = prescriptions.length;
    const active = prescriptions.filter(p=>p.status==="Active").length;
    const medCount = {};
    prescriptions.forEach(p => medCount[p.medication]=(medCount[p.medication]||0)+1);
    let topMed = Object.entries(medCount).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—';
    return [
      { label: "Total Prescriptions", value: total },
      { label: "Active", value: active },
      { label: "Top Medication", value: topMed, isSmall: true },
    ];
  }, [prescriptions]);

  const handleSave = (data) => {
    if (data.id) {
      setPrescriptions(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      const newPrescription = { ...data, id: String(Date.now()) };
      setPrescriptions(prev => [newPrescription, ...prev]);
      setSelectedId(newPrescription.id);
    }
    setIsModalOpen(false);
    setPrescriptionToEdit(null);
    // 3. SHOW THE TOAST
    setToast({ show: true, message: "Prescription sent to pharmacist!" });
  };

  const handleDelete = (id) => {
    setPrescriptions(prev => prev.filter(p => p.id !== id));
    if (selectedId === id) setSelectedId(null);
    setIsDeleteModalOpen(false);
    setPrescriptionToDelete(null);
  };

  return (
    <>
      <div className="prescriptions-page">
        <div className="cards-row">
          {statCardsData.map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value" style={stat.isSmall ? {fontSize: '1.5rem'} : {}}>{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="dashboard-content">
          <div className="prescriptions-table-wrap">
            <div className="prescriptions-table-title">
              <span>All Prescriptions</span>
              <button onClick={() => { setPrescriptionToEdit(null); setIsModalOpen(true); }} className="add-prescription-btn"><FaPlus /> Add Prescription</button>
            </div>
            <div className="prescriptions-table-filter">
              <input name="patient" placeholder="Patient Name" value={filters.patient} onChange={handleFilterChange} />
              <input name="medication" placeholder="Medication" value={filters.medication} onChange={handleFilterChange} />
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Statuses</option>
                {STATUS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <table className="prescriptions-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Medication</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrescriptions.length > 0 ? (
                  filteredPrescriptions.map(p => (
                    <tr key={p.id} className={selectedId === p.id ? 'selected' : ''} onClick={() => setSelectedId(p.id)}>
                      <td>{p.patient}</td>
                      <td>{p.medication}</td>
                      <td>{p.status}</td>
                      <td>{p.datePrescribed}</td>
                      <td className="prescription-actions">
                        <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setPrescriptionToEdit(p); setIsModalOpen(true); }}><FaEdit /></button>
                        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); setPrescriptionToDelete(p); setIsDeleteModalOpen(true); }}><FaTrash /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td className="no-prescriptions-row" colSpan="5">No prescriptions found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="details-panel-wrap">
            {selectedPrescription ? (
              <div className="detail-panel">
                <h3>Prescription Details</h3>
                <div className="detail-row"><span className="detail-label">Patient:</span> {selectedPrescription.patient}</div>
                <div className="detail-row"><span className="detail-label">Medication:</span> {selectedPrescription.medication}</div>
                <div className="detail-row"><span className="detail-label">Dosage:</span> {selectedPrescription.dosage}</div>
                <div className="detail-row"><span className="detail-label">Frequency:</span> {selectedPrescription.frequency}</div>
                <div className="detail-row"><span className="detail-label">Duration:</span> {selectedPrescription.duration}</div>
                <div className="detail-row"><span className="detail-label">Prescribed By:</span> {selectedPrescription.doctor}</div>
                <div className="detail-row"><span className="detail-label">Status:</span> {selectedPrescription.status}</div>
                <div className="detail-row"><span className="detail-label">Date Prescribed:</span> {selectedPrescription.datePrescribed}</div>
                <div className="detail-row"><b>Notes:</b><div className="detail-notes">{selectedPrescription.notes || "—"}</div></div>
              </div>
            ) : (
              <div className="detail-panel placeholder">Select a prescription to view details</div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && <AddEditModal prescription={prescriptionToEdit} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />}
      {isDeleteModalOpen && <ConfirmDeleteModal prescription={prescriptionToDelete} onDelete={handleDelete} onCancel={() => setIsDeleteModalOpen(false)} />}
      
      {/* 4. RENDER THE TOAST WRAPPER AND THE TOAST COMPONENT */}
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

export default DoctorPrescriptions;