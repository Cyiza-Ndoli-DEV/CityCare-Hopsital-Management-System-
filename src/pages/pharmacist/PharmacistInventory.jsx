// src/pages/pharmacist/PharmacistInventory.jsx
import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCapsules, FaExclamationTriangle, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import AddMedicineModal from "../../components/AddMedicineModal/AddMedicineModal";
import "./PharmacistInventory.css";

const initialInventory = [
  { id: 1, name: "Amoxicillin 500mg", stock: 25, expiry: "2025-09-01", manufacturer: "GSK", batch: "AMX23A", price: 5000, low: false },
  { id: 2, name: "Lisinopril 10mg", stock: 5, expiry: "2025-05-15", manufacturer: "Pfizer", batch: "LSN12C", price: 3500, low: true },
  { id: 3, name: "Paracetamol 30mg", stock: 40, expiry: "2026-02-10", manufacturer: "Cipla", batch: "PCM77B", price: 1500, low: false },
  { id: 4, name: "Coartem 20/120mg", stock: 18, expiry: "2025-11-30", manufacturer: "Novartis", batch: "CRT45D", price: 12000, low: false },
  { id: 5, name: "Metformin 500mg", stock: 8, expiry: "2025-07-20", manufacturer: "Sanofi", batch: "MTF67E", price: 2500, low: true },
];

export default function PharmacistInventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [medicineToDelete, setMedicineToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddMedicine = (med) => {
    const low = parseInt(med.stock) <= 10;
    if (editingMedicine) {
      // Update existing medicine
      setInventory(inv => inv.map(item => 
        item.id === editingMedicine.id ? { ...med, id: editingMedicine.id, low } : item
      ));
      setEditingMedicine(null);
    } else {
      // Add new medicine
      setInventory(inv => [
        ...inv,
        { ...med, id: inv.length ? inv[inv.length - 1].id + 1 : 1, low }
      ]);
    }
    setShowAddModal(false);
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setShowAddModal(true);
  };

  const confirmDelete = (id) => {
    setMedicineToDelete(id);
  };

  const handleDelete = () => {
    setInventory(inv => inv.filter(med => med.id !== medicineToDelete));
    setMedicineToDelete(null);
  };

  const cancelDelete = () => {
    setMedicineToDelete(null);
  };

  const filteredInventory = inventory.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatUGX = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="pharmacist-inventory-page">
      <div className="inventory-header">
        <div className="inventory-header-title">
          <FaCapsules className="inventory-logo" />
          <h1>Medicine Inventory</h1>
        </div>
        <div className="inventory-header-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="add-btn-modern" onClick={() => {
            setEditingMedicine(null);
            setShowAddModal(true);
          }}>
            <FaPlus className="add-btn-icon" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      <div className="inventory-table-card-wide">
        <table className="inventory-table-modern-wide">
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch No.</th>
              <th>Manufacturer</th>
              <th>Stock</th>
              <th>Price (UGX)</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(med => (
              <tr key={med.id} className={med.low ? "low-stock-row-modern" : ""}>
                <td>{med.name}</td>
                <td>{med.batch}</td>
                <td>{med.manufacturer}</td>
                <td>{med.stock}</td>
                <td>{formatUGX(med.price)}</td>
                <td>{new Date(med.expiry).toLocaleDateString('en-GB')}</td>
                <td>
                  {med.low ? (
                    <span className="low-stock-alert-modern">
                      <FaExclamationTriangle /> Low Stock
                    </span>
                  ) : (
                    <span className="in-stock-modern">
                      <FaCheck /> In Stock
                    </span>
                  )}
                </td>
                <td className="actions-cell">
                  <button 
                    className="edit-btn-modern" 
                    onClick={() => handleEdit(med)}
                    title="Edit medicine"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-btn-modern" 
                    onClick={() => confirmDelete(med.id)}
                    title="Delete medicine"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>No medicines found matching your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddMedicineModal
          onAdd={handleAddMedicine}
          onClose={() => {
            setShowAddModal(false);
            setEditingMedicine(null);
          }}
          initialData={editingMedicine}
        />
      )}

      {medicineToDelete && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this medicine? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button className="confirm-delete-btn" onClick={handleDelete}>
                <FaCheck /> Delete
              </button>
              <button className="cancel-delete-btn" onClick={cancelDelete}>
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}