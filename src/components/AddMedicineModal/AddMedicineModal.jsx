// src/components/AddMedicineModal/AddMedicineModal.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaCapsules, FaExclamationTriangle } from 'react-icons/fa';
import './AddMedicineModal.css';

const AddMedicineModal = ({ onAdd, onClose, initialData }) => {
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    manufacturer: '',
    expiry: '',
    batch: '',
    stock: '',
    price: '',
    lowThreshold: 10 // Default low stock threshold
  });

  useEffect(() => {
    if (initialData) {
      setNewMedicine({
        name: initialData.name || '',
        manufacturer: initialData.manufacturer || '',
        expiry: initialData.expiry || '',
        batch: initialData.batch || '',
        stock: initialData.stock || '',
        price: initialData.price || '',
        lowThreshold: 10
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const medicineWithPrice = {
      ...newMedicine,
      price: parseInt(newMedicine.price) || 0,
      stock: parseInt(newMedicine.stock) || 0
    };
    onAdd(medicineWithPrice);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="modal-icon-container">
            <FaCapsules className="modal-icon" />
          </div>
          <h2>{initialData ? 'Edit Medicine' : 'Add New Medicine'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Medicine Name *</label>
              <input
                type="text"
                name="name"
                value={newMedicine.name}
                onChange={handleInputChange}
                placeholder="e.g. Paracetamol 500mg"
                required
              />
            </div>

            <div className="form-group">
              <label>Manufacturer *</label>
              <input
                type="text"
                name="manufacturer"
                value={newMedicine.manufacturer}
                onChange={handleInputChange}
                placeholder="e.g. Cipla"
                required
              />
            </div>

            <div className="form-group">
              <label>Batch Number *</label>
              <input
                type="text"
                name="batch"
                value={newMedicine.batch}
                onChange={handleInputChange}
                placeholder="e.g. PCT2023A"
                required
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={newMedicine.stock}
                onChange={handleInputChange}
                min="0"
                placeholder="e.g. 50"
                required
              />
              {newMedicine.stock <= newMedicine.lowThreshold && newMedicine.stock !== '' && (
                <div className="stock-warning">
                  <FaExclamationTriangle /> This will be marked as low stock
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Price (UGX) *</label>
              <div className="price-input-container">
                <span className="currency-symbol">UGX</span>
                <input
                  type="number"
                  name="price"
                  value={newMedicine.price}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g. 1500"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Expiry Date *</label>
              <input
                type="date"
                name="expiry"
                value={newMedicine.expiry}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Low Stock Threshold</label>
              <input
                type="number"
                name="lowThreshold"
                value={newMedicine.lowThreshold}
                onChange={handleInputChange}
                min="1"
                placeholder="Default: 10"
              />
              <div className="threshold-info">
                Items will be marked as low stock when quantity reaches this level
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {initialData ? 'Update Medicine' : 'Add Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;