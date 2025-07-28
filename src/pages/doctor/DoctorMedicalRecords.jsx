import React, { useState, useMemo } from 'react';
import { FaPrint, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Toast from '../../components/Toast/Toast'; // 1. IMPORT THE TOAST COMPONENT
import './DoctorMedicalRecords.css';

// --- MOCK DATA GENERATION ---
const NAMES = ["Jane Doe", "John Smith", "Alice Brown", "Bob White", "Charlie Black", "Diana Green", "Ethan Hunt", "Fiona Glenanne"];
const DIAGNOSES = ["Hypertension", "Type 2 Diabetes", "Asthma", "COPD", "Migraine", "Osteoarthritis", "Anxiety", "Depression"];
const DOCTORS = ["Dr. Smith", "Dr. Jones", "Dr. Patel", "Dr. Kim", "Dr. Lee", "Dr. Chen"];
const generateRecords = (n) => {
  const recs = [];
  for (let i = 0; i < n; i++) {
    recs.push({
      id: String(i + 1),
      patientName: NAMES[i % NAMES.length],
      dob: `${1945 + Math.floor(Math.random() * 60)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, "0")}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, "0")}`,
      recordDate: new Date(new Date(2023,0,1).getTime() + Math.random() * (new Date().getTime() - new Date(2023,0,1).getTime())).toISOString().slice(0, 10),
      diagnosis: DIAGNOSES[i % DIAGNOSES.length],
      doctor: DOCTORS[i % DOCTORS.length],
      summary: `Visit summary for ${NAMES[i % NAMES.length]} with ${DIAGNOSES[i % DIAGNOSES.length]}.`,
      notes: `Clinical notes for ${NAMES[i % NAMES.length]}.`
    });
  }
  return recs;
};

// --- Add/Edit Modal Component ---
const AddEditModal = ({ record, onSave, onCancel }) => {
  const [formData, setFormData] = useState(record || {
    patientName: '', dob: '', recordDate: '', diagnosis: '', summary: '', notes: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, doctor: "Dr. Ssekamatte" });
  };

  return (
    <div className="modal-bg">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <h3>{record ? 'Edit' : 'Add'} Medical Record</h3>
          <div className="form-group"><label>Patient Name</label><input name="patientName" required value={formData.patientName} onChange={handleChange} /></div>
          <div className="form-group"><label>Date of Birth</label><input name="dob" type="date" required value={formData.dob} onChange={handleChange} /></div>
          <div className="form-group"><label>Date of Record</label><input name="recordDate" type="date" required value={formData.recordDate} onChange={handleChange} /></div>
          <div className="form-group"><label>Diagnosis</label><input name="diagnosis" value={formData.diagnosis} onChange={handleChange} /></div>
          <div className="form-group"><label>Summary</label><textarea name="summary" value={formData.summary} onChange={handleChange}></textarea></div>
          <div className="form-group"><label>Clinical Notes</label><textarea name="notes" value={formData.notes} onChange={handleChange}></textarea></div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="save-btn">{record ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Delete Confirmation Modal Component ---
const ConfirmDeleteModal = ({ record, onDelete, onCancel }) => (
  <div className="modal-bg">
    <div className="modal-dialog">
      <h3>Delete Medical Record</h3>
      <p>Are you sure you want to delete the record for <strong>{record.patientName}</strong>?</p>
      <div className="modal-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button type="button" className="delete-confirm-btn" onClick={() => onDelete(record.id)}>Delete</button>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
const DoctorMedicalRecords = () => {
  const [records, setRecords] = useState(generateRecords(25));
  const [selectedId, setSelectedId] = useState('1');
  const [filters, setFilters] = useState({ patientName: '', diagnosis: '', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. ADD STATE FOR THE TOAST NOTIFICATION
  const [toast, setToast] = useState({ show: false, message: '' });

  const PAGE_SIZE = 10;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const filteredRecords = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return records.filter(r => {
      const matchesSearch = searchTerm ? JSON.stringify(r).toLowerCase().includes(lowercasedSearchTerm) : true;
      const matchesFilters = 
        (!filters.patientName || r.patientName.toLowerCase().includes(filters.patientName.toLowerCase())) &&
        (!filters.diagnosis || r.diagnosis.toLowerCase().includes(filters.diagnosis.toLowerCase())) &&
        (!filters.dateFrom || r.recordDate >= filters.dateFrom) &&
        (!filters.dateTo || r.recordDate <= filters.dateTo);
      return matchesSearch && matchesFilters;
    });
  }, [records, filters, searchTerm]);

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, currentPage]);
  
  const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);
  const selectedRecord = useMemo(() => records.find(r => r.id === selectedId), [records, selectedId]);

  const handlePrint = () => window.print();

  const handleSaveRecord = (recordData) => {
    if (recordData.id) {
      setRecords(prev => prev.map(r => r.id === recordData.id ? recordData : r));
    } else {
      const newRecord = { ...recordData, id: String(Date.now()) };
      setRecords(prev => [newRecord, ...prev]);
      setSelectedId(newRecord.id);
    }
    setIsModalOpen(false);
    setRecordToEdit(null);
    // 3. SHOW THE TOAST
    setToast({ show: true, message: "Medical record saved successfully!" });
  };

  const handleDeleteRecord = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };
  
  return (
    <>
      <div className="medical-records-container">
        <aside className="records-sidebar">
          <div className="main-search-bar">
            <FaSearch className="main-search-icon" />
            <input
              type="text"
              placeholder="Search all records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h2>Medical Records</h2>
          <div className="filter-bar">
            <input name="patientName" placeholder="Patient Name" value={filters.patientName} onChange={handleFilterChange} />
            <input name="diagnosis" placeholder="Diagnosis" value={filters.diagnosis} onChange={handleFilterChange} />
            <div className="date-row">
              <input name="dateFrom" type="date" value={filters.dateFrom} onChange={handleFilterChange} />
              <input name="dateTo" type="date" value={filters.dateTo} onChange={handleFilterChange} />
            </div>
          </div>
          <button className="add-btn" onClick={() => { setRecordToEdit(null); setIsModalOpen(true); }}><FaPlus /> Add Record</button>
          <div className="record-list">
            {paginatedRecords.length > 0 ? (
              paginatedRecords.map(rec => (
                <div key={rec.id} className={`record-item ${selectedId === rec.id ? 'selected' : ''}`} onClick={() => setSelectedId(rec.id)}>
                  <div className="record-title">{rec.patientName}</div>
                  <div className="record-info"><b>{rec.diagnosis}</b> — {rec.recordDate}</div>
                  <div className="record-doctor">By: {rec.doctor}</div>
                </div>
              ))
            ) : <div className="no-records-found">No records found</div>}
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage <= 1}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}>Next</button>
          </div>
        </aside>

        <main className="detail-main-panel">
          {selectedRecord ? (
            <div className="detail-panel" id="printable-section">
              <div className="detail-header">
                <div>
                  <div className="detail-patient">{selectedRecord.patientName}</div>
                  <div className="detail-dob">DOB: {selectedRecord.dob}</div>
                </div>
                <div className="detail-actions">
                  <button className="print-btn" onClick={handlePrint}><FaPrint /> Print</button>
                  <button onClick={() => { setRecordToEdit(selectedRecord); setIsModalOpen(true); }}><FaEdit /> Edit</button>
                  <button className="delete-btn" onClick={() => { setRecordToDelete(selectedRecord); setIsDeleteModalOpen(true); }}><FaTrash /> Delete</button>
                </div>
              </div>
              <div className="detail-row"><span className="detail-label">Date:</span> {selectedRecord.recordDate} | <span className="detail-label">Doctor:</span> {selectedRecord.doctor}</div>
              <div className="detail-row"><span className="detail-label">Diagnosis:</span> {selectedRecord.diagnosis}</div>
              <div className="detail-row"><b>Summary:</b><div className="detail-summary">{selectedRecord.summary}</div></div>
              <div className="detail-row"><b>Clinical Notes:</b><div className="detail-notes">{selectedRecord.notes}</div></div>
            </div>
          ) : <div className="select-record-prompt">Select a record to view details</div>}
        </main>
      </div>

      {isModalOpen && <AddEditModal record={recordToEdit} onSave={handleSaveRecord} onCancel={() => setIsModalOpen(false)} />}
      {isDeleteModalOpen && <ConfirmDeleteModal record={recordToDelete} onDelete={handleDeleteRecord} onCancel={() => setIsDeleteModalOpen(false)} />}
      
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

export default DoctorMedicalRecords;