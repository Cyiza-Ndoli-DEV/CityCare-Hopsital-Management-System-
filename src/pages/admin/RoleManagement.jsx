import { useState } from 'react';
import { FaUserShield, FaFloppyDisk, FaCheck } from 'react-icons/fa6';
import './RoleManagement.css';

const roles = ['doctor', 'receptionist', 'pharmacist'];

const rolePermissions = {
  doctor: [
    {
      title: 'Patient Records',
      permissions: [
        { label: 'View Patient Chart', checked: true },
        { label: 'Edit Clinical Notes', checked: true },
        { label: 'Delete Patient Records', checked: false },
      ],
    },
    {
      title: 'Orders',
      permissions: [
        { label: 'Place Prescriptions', checked: true },
        { label: 'Place Lab Orders', checked: true },
      ],
    },
    {
      title: 'Appointments',
      permissions: [
        { label: 'View Own Schedule', checked: true },
        { label: 'Edit Own Schedule', checked: false },
      ],
    },
  ],
  receptionist: [
    {
      title: 'Patient Management',
      permissions: [
        { label: 'Register New Patient', checked: true },
        { label: 'Edit Patient Demographics', checked: true },
        { label: 'View Clinical Notes', checked: false },
      ],
    },
    {
      title: 'Scheduling',
      permissions: [
        { label: 'Book Appointments', checked: true },
        { label: 'Reschedule/Cancel', checked: true },
        { label: 'View All Doctor Schedules', checked: true },
      ],
    },
    {
      title: 'Billing',
      permissions: [
        { label: 'Process Co-Payments', checked: true },
      ],
    },
  ],
  pharmacist: [
    {
      title: 'Prescription Workflow',
      permissions: [
        { label: 'View Prescription Queue', checked: true },
        { label: 'Verify & Fill Prescriptions', checked: true },
        { label: 'Dispense Medications', checked: true },
      ],
    },
    {
      title: 'Inventory',
      permissions: [
        { label: 'View Inventory', checked: true },
        { label: 'Add New Drugs', checked: true },
        { label: 'Adjust Stock Levels', checked: true },
      ],
    },
  ],
};

function RoleManagement() {
  const [activeRole, setActiveRole] = useState('doctor');
  const [permissions, setPermissions] = useState(rolePermissions);

  const handleToggle = (role, groupIdx, permIdx) => {
    const updated = { ...permissions };
    const permission = updated[role][groupIdx].permissions[permIdx];
    permission.checked = !permission.checked;
    setPermissions(updated);
  };

  return (
    <div className="role-management-page">
      <div className="role-management-header">
        <FaUserShield />
        <h1>Role & Permission Management</h1>
      </div>
        
      <div className="card">
        <div className="tabs-container">
          {roles.map(role => (
            <button
              key={role}
              className={`tab-button ${activeRole === role ? 'active' : ''}`}
              onClick={() => setActiveRole(role)}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content active">
          <div className="permissions-grid">
            {permissions[activeRole].map((group, groupIdx) => (
              <div className="permission-group" key={groupIdx}>
                <h3>{group.title}</h3>
                {group.permissions.map((perm, permIdx) => (
                  <div className="permission-item" key={permIdx}>
                    <label>
                      <input
                        type="checkbox"
                        checked={perm.checked}
                        onChange={() => handleToggle(activeRole, groupIdx, permIdx)}
                      />
                      <span className="checkbox-custom">
                        <FaCheck className="check-icon" />
                      </span>
                      {perm.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="card-footer">
            <button className="btn-primary">
              <FaFloppyDisk /> Save {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;
