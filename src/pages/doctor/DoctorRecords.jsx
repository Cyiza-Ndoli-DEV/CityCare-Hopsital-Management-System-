import React, { useState, useMemo } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import './DoctorRecords.css';

// --- MOCK DATA AND HELPERS (from your HTML) ---
const DOCTOR = "Dr. Ssekamatte";
const DIAGNOSES = ["Hypertension", "Type 2 Diabetes", "Asthma", "COPD", "Migraine", "Osteoarthritis"];
const PATIENTS = ["Jane Doe", "John Smith", "Alice Brown", "Bob White", "Charlie Black", "Diana Green"];
const generateRecords = (n) => Array.from({ length: n }, (_, i) => ({
  id: String(i + 1),
  patientName: PATIENTS[i % PATIENTS.length],
  dob: `${1945 + Math.floor(Math.random() * 60)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, "0")}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, "0")}`,
  recordDate: new Date(new Date(2023,0,1).getTime() + Math.random() * (new Date().getTime() - new Date(2023,0,1).getTime())).toISOString().slice(0, 10),
  diagnosis: DIAGNOSES[i % DIAGNOSES.length],
  doctor: DOCTOR,
  summary: `Visit summary for ${PATIENTS[i % PATIENTS.length]} with ${DIAGNOSES[i % DIAGNOSES.length]}.`,
  notes: `Clinical notes for ${PATIENTS[i % PATIENTS.length]}.`
}));

// --- MODAL SUB-COMPONENTS ---
const DetailModal = ({ record, onClose }) => {
  // Print only this record's details
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=700,height=900');
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Record for ${record.patientName}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 36px; }
          h2 { margin-top: 0; }
          .detail-label { font-weight: 600; color: #1976d2; margin-right: 4px; }
          .detail-summary, .detail-notes { background: #f7fafd; border-radius: 7px; padding: 12px 20px; margin-top: 3px; font-size: 15px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <h2>Medical Record Details</h2>
        <div><span class="detail-label">Patient:</span> ${record.patientName}</div>
        <div><span class="detail-label">DOB:</span> ${record.dob}</div>
        <div><span class="detail-label">Date:</span> ${record.recordDate}</div>
        <div><span class="detail-label">Doctor:</span> ${record.doctor}</div>
        <div><span class="detail-label">Diagnosis:</span> ${record.diagnosis}</div>
        <div><b>Summary:</b><div class="detail-summary">${record.summary}</div></div>
        <div><b>Clinical Notes:</b><div class="detail-notes">${record.notes || "—"}</div></div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    // Optionally, close after print
    // printWindow.close();
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>Medical Record Details</h3>
          <button
            className="print-btn"
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "7px 18px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px"
            }}
            onClick={handlePrint}
            type="button"
            title="Print"
          >
            <FaPrint /> Print
          </button>
        </div>
        <div className="detail-row"><span className="detail-label">Patient:</span> {record.patientName}</div>
        <div className="detail-row"><span className="detail-label">DOB:</span> {record.dob}</div>
        <div className="detail-row"><span className="detail-label">Date:</span> {record.recordDate}</div>
        <div className="detail-row"><span className="detail-label">Doctor:</span> {record.doctor}</div>
        <div className="detail-row"><span className="detail-label">Diagnosis:</span> {record.diagnosis}</div>
        <div className="detail-row"><b>Summary:</b><div className="detail-summary">{record.summary}</div></div>
        <div className="detail-row"><b>Clinical Notes:</b><div className="detail-notes">{record.notes || "—"}</div></div>
        <div className="modal-actions"><button className="cancel-btn" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
};

const EditModal = ({ record, onClose, onSave }) => {
  const [form, setForm] = useState({ ...record });
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <h3>Edit Medical Record</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(form);
          }}
        >
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              value={form.patientName}
              onChange={e => setForm(f => ({ ...f, patientName: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={form.dob}
              onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Record</label>
            <input
              type="date"
              value={form.recordDate}
              onChange={e => setForm(f => ({ ...f, recordDate: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Diagnosis</label>
            <input
              type="text"
              value={form.diagnosis}
              onChange={e => setForm(f => ({ ...f, diagnosis: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Summary</label>
            <textarea
              value={form.summary}
              onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Clinical Notes</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
          </div>
          <div className="modal-actions">
            <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
            <button className="save-btn" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ConfirmDeleteModal = ({ record, onCancel, onConfirm }) => (
  <div className="modal-bg" onClick={onCancel}>
    <div className="modal-dialog" onClick={e => e.stopPropagation()}>
      <h3>Delete Medical Record</h3>
      <div>
        Are you sure you want to delete the record for <b>{record.patientName}</b>?
      </div>
      <div className="modal-actions" style={{marginTop: 24}}>
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button className="save-btn" style={{background:'#e53935'}} onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---
const DoctorRecords = () => {
  const [records, setRecords] = useState(generateRecords(14));
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ type: null, record: null });

  const filteredRecords = useMemo(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    return records.filter(r =>
      !lowercasedSearch || JSON.stringify(r).toLowerCase().includes(lowercasedSearch)
    ).sort((a, b) => new Date(b.recordDate) - new Date(a.recordDate));
  }, [records, searchTerm]);

  // Modal handlers
  const openDetailModal = record => setModal({ type: 'detail', record });
  const openEditModal = record => setModal({ type: 'edit', record });
  const openDeleteModal = record => setModal({ type: 'delete', record });
  const closeModal = () => setModal({ type: null, record: null });

  const handleEditSave = updated => {
    setRecords(rs => rs.map(r => r.id === updated.id ? updated : r));
    closeModal();
  };
  const handleDelete = id => {
    setRecords(rs => rs.filter(r => r.id !== id));
    closeModal();
  };

  return (
    <>
      <div className="records-page-container">
        <div className="top-bar">
          <label htmlFor="main-search">Search:</label>
          <input
            id="main-search"
            type="text"
            placeholder="Search all records..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="records-table-container">
          <table className="records-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map(record => (
                  <tr key={record.id} onClick={() => openDetailModal(record)}>
                    <td>{record.patientName}</td>
                    <td>{record.diagnosis}</td>
                    <td>{record.recordDate}</td>
                    <td className="record-actions" onClick={e => e.stopPropagation()}>
                      <button className="edit-btn" onClick={() => openEditModal(record)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="delete-btn" onClick={() => openDeleteModal(record)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="no-records-row" colSpan="4">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modal.type === 'detail' && (
        <DetailModal
          record={modal.record}
          onClose={closeModal}
        />
      )}
      {modal.type === 'edit' && (
        <EditModal
          record={modal.record}
          onClose={closeModal}
          onSave={handleEditSave}
        />
      )}
      {modal.type === 'delete' && (
        <ConfirmDeleteModal
          record={modal.record}
          onCancel={closeModal}
          onConfirm={() => handleDelete(modal.record.id)}
        />
      )}
    </>
  );
};

export default DoctorRecords;