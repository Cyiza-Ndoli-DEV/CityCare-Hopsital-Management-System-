import React, { useState } from 'react';
import './AdminSettings.css';
import Toast from '../../components/Toast/Toast';
import { 
  BiUserCircle, 
  BiLockAlt,
  BiPalette, 
  BiBell, 
  BiGroup,
  BiCheckShield, 
  BiErrorCircle, 
  BiSave, 
  BiCamera, 
  BiTrash, 
  BiPlusCircle, 
  BiDownload,
  BiCard,
  BiEdit
} from 'react-icons/bi';

// --- Profile Section ---
const ProfileSection = () => {
    const [formData, setFormData] = useState({
        name: 'John Cyiza Ndoli',
        email: 'admin@citycare.ug',
        phone: '+256 770 123456',
    });
    const [profilePic, setProfilePic] = useState('https://randomuser.me/api/portraits/men/59.jpg');
    const [showToast, setShowToast] = useState(false);

    const handleChange = e => setFormData({...formData, [e.target.id]: e.target.value});
    const handleFileChange = e => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section className="settings-section">
            {showToast && <Toast message="Profile updated successfully!" type="success" />}
            <div className="section-title">Admin Profile</div>
            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="profile-pic-section">
                    <img src={profilePic} alt="Profile" />
                    <label htmlFor="profilePicUpload" className="profile-pic-label"><BiCamera /> Change Photo</label>
                    <input type="file" id="profilePicUpload" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                </div>
                <label htmlFor="adminName">Full Name</label>
                <input type="text" id="adminName" value={formData.name} onChange={handleChange} />
                <label htmlFor="adminEmail">Email Address</label>
                <input type="email" id="adminEmail" value={formData.email} onChange={handleChange} />
                <label htmlFor="adminPhone">Phone Number</label>
                <input type="text" id="adminPhone" value={formData.phone} onChange={handleChange} />
                <button type="submit" className="btn"><BiSave /> Save Changes</button>
            </form>
        </section>
    );
};

// --- Security Section ---
const SecuritySection = () => {
    const [twoFactor, setTwoFactor] = useState(true);
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section className="settings-section">
            {showToast && <Toast message="Security settings updated successfully!" type="success" />}
            <div className="section-title">Security Settings</div>
            <form className="settings-form" onSubmit={handleSubmit}>
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" />
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" />
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" />
                <div>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                        <span className="slider"></span>
                    </label>
                    <span className="toggle-label">Two-Factor Authentication is <b>{twoFactor ? 'ON' : 'OFF'}</b></span>
                </div>
                <br />
                <button type="submit" className="btn"><BiCheckShield /> Update Security</button>
            </form>
        </section>
    );
};

// --- Preferences Section ---
const PreferencesSection = () => {
    const [theme, setTheme] = useState('light');
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section className="settings-section">
            {showToast && <Toast message="Preferences saved successfully!" type="success" />}
            <div className="section-title">Appearance & Preferences</div>
            <form className="settings-form" onSubmit={handleSubmit}>
                <label>Theme</label>
                <div className="theme-preview">
                    <div className={`theme-box light ${theme === 'light' ? 'selected' : ''}`} onClick={() => setTheme('light')}>Light</div>
                    <div className={`theme-box dark ${theme === 'dark' ? 'selected' : ''}`} onClick={() => setTheme('dark')}>Dark</div>
                    <div className={`theme-box ${theme === 'custom' ? 'selected' : ''}`} style={{background:'#b4872eff',color:'#2878b5'}} onClick={() => setTheme('custom')}>Custom</div>
                </div>
                <label htmlFor="language">Language</label>
                <select id="language" defaultValue="en">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="sw">Swahili</option>
                </select>
                <label htmlFor="timezone">Timezone</label>
                <select id="timezone" defaultValue="Africa/Kampala">
                    <option value="Africa/Kampala">(GMT+3) Africa/Kampala</option>
                    <option value="Africa/Nairobi">(GMT+3) Africa/Nairobi</option>
                    <option value="Africa/Johannesburg">(GMT+2) Africa/Johannesburg</option>
                </select>
                <br/>
                <button type="submit" className="btn"><BiSave /> Save Preferences</button>
            </form>
        </section>
    );
};

// --- Notifications Section ---
const NotificationsSection = () => {
    const [notifications, setNotifications] = useState({
        appointments: true, payments: true, updates: false, staff: false, stock: true
    });
    const [showToast, setShowToast] = useState(false);

    const handleToggle = (key) => setNotifications(prev => ({...prev, [key]: !prev[key]}));
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };
    
    return (
        <section className="settings-section">
            {showToast && <Toast message="Notification settings updated!" type="success" />}
            <div className="section-title">Notification Settings</div>
            <form className="settings-form" onSubmit={handleSubmit}>
                 <ul className="notification-list">
                    <li>Appointment Requests <label className="toggle-switch"><input type="checkbox" checked={notifications.appointments} onChange={() => handleToggle('appointments')} /><span className="slider"></span></label></li>
                    <li>Payment Confirmations <label className="toggle-switch"><input type="checkbox" checked={notifications.payments} onChange={() => handleToggle('payments')} /><span className="slider"></span></label></li>
                    <li>System Updates <label className="toggle-switch"><input type="checkbox" checked={notifications.updates} onChange={() => handleToggle('updates')} /><span className="slider"></span></label></li>
                    <li>Staff Activity Alerts <label className="toggle-switch"><input type="checkbox" checked={notifications.staff} onChange={() => handleToggle('staff')} /><span className="slider"></span></label></li>
                    <li>Medicine Stock Alerts <label className="toggle-switch"><input type="checkbox" checked={notifications.stock} onChange={() => handleToggle('stock')} /><span className="slider"></span></label></li>
                </ul>
                <br/>
                <button type="submit" className="btn"><BiSave /> Update Notifications</button>
            </form>
        </section>
    );
};

// --- Members Section ---
const MembersSection = () => {
    const [members, setMembers] = useState([
        { id: 1, name: 'Alice Johnson', role: 'Doctor', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', role: 'Nurse', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', role: 'Receptionist', email: 'charlie@example.com' }
    ]);
    const [editingMember, setEditingMember] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleEdit = (member) => {
        setEditingMember(member);
    };

    const handleDelete = (id) => {
        setShowDeleteConfirm(id);
    };

    const confirmDelete = (id) => {
        setMembers(members.filter(member => member.id !== id));
        setShowDeleteConfirm(null);
        setToastMessage('Member deleted successfully');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const saveEdit = () => {
        setToastMessage('Member updated successfully');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setEditingMember(null);
    };

    return (
        <section className="settings-section">
            {showToast && <Toast message={toastMessage} type="success" />}
            <div className="section-title">Members Management</div>
            <div className="settings-form">
                <h3>Team Members</h3>
                <table className="members-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id}>
                                <td>
                                    {editingMember?.id === member.id ? (
                                        <input 
                                            type="text" 
                                            value={editingMember.name} 
                                            onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                                        />
                                    ) : member.name}
                                </td>
                                <td>
                                    {editingMember?.id === member.id ? (
                                        <select 
                                            value={editingMember.role}
                                            onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                                        >
                                            <option value="Doctor">Doctor</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Receptionist">Receptionist</option>
                                        </select>
                                    ) : member.role}
                                </td>
                                <td>
                                    {editingMember?.id === member.id ? (
                                        <input 
                                            type="email" 
                                            value={editingMember.email} 
                                            onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                                        />
                                    ) : member.email}
                                </td>
                                <td>
                                    {editingMember?.id === member.id ? (
                                        <>
                                            <button className="btn-icon" onClick={saveEdit}>
                                                <BiSave />
                                            </button>
                                            <button className="btn-icon danger" onClick={() => setEditingMember(null)}>
                                                <BiErrorCircle />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn-icon" onClick={() => handleEdit(member)}>
                                                <BiEdit />
                                            </button>
                                            <button className="btn-icon danger" onClick={() => handleDelete(member.id)}>
                                                <BiTrash />
                                            </button>
                                        </>
                                    )}
                                    {showDeleteConfirm === member.id && (
                                        <div className="delete-confirm">
                                            <p>Are you sure?</p>
                                            <button onClick={() => confirmDelete(member.id)}>Yes</button>
                                            <button onClick={() => setShowDeleteConfirm(null)}>No</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

// --- Payment Methods Section ---
const PaymentMethodsSection = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/25' },
        { id: 2, type: 'Mobile Money', provider: 'MTN Uganda' },
        { id: 3, type: 'Airtel Money', provider: 'Airtel Money Uganda' }
    ]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMethod, setNewMethod] = useState({ type: '', provider: '', last4: '', expiry: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleAddMethod = () => {
        setShowAddModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMethod(prev => ({ ...prev, [name]: value }));
    };

    const submitAddMethod = () => {
        setPaymentMethods([...paymentMethods, { ...newMethod, id: Date.now() }]);
        setShowAddModal(false);
        setNewMethod({ type: '', provider: '', last4: '', expiry: '' });
        setToastMessage('Payment method added successfully');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleDelete = (id) => {
        setShowDeleteConfirm(id);
    };

    const confirmDelete = (id) => {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
        setShowDeleteConfirm(null);
        setToastMessage('Payment method deleted successfully');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section className="settings-section">
            {showToast && <Toast message={toastMessage} type="success" />}
            <div className="section-title">Payment Methods</div>
            <div className="settings-form">
                <div className="payment-methods-header">
                    <h3>Saved Payment Methods</h3>
                    <button className="btn" onClick={handleAddMethod}>
                        <BiPlusCircle /> Add Payment Method
                    </button>
                </div>
                <div className="payment-methods-list">
                    {paymentMethods.map(method => (
                        <div key={method.id} className="payment-method">
                            <div className="payment-method-info">
                                <BiCard size={24} />
                                <div>
                                    <h4>{method.type}</h4>
                                    <p>
                                        {method.last4 ? `•••• •••• •••• ${method.last4}` : ''}
                                        {method.expiry ? ` - Expires ${method.expiry}` : ''}
                                        {method.provider ? ` - ${method.provider}` : ''}
                                    </p>
                                </div>
                            </div>
                            <button 
                                className="btn-icon danger" 
                                onClick={() => handleDelete(method.id)}
                            >
                                <BiTrash />
                            </button>
                            {showDeleteConfirm === method.id && (
                                <div className="delete-confirm">
                                    <p>Are you sure you want to delete this payment method?</p>
                                    <button onClick={() => confirmDelete(method.id)}>Yes</button>
                                    <button onClick={() => setShowDeleteConfirm(null)}>No</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Payment Method Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Payment Method</h3>
                        <div className="form-group">
                            <label>Type</label>
                            <select 
                                name="type" 
                                value={newMethod.type} 
                                onChange={handleInputChange}
                            >
                                <option value="">Select type</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Mobile Money">Mobile Money</option>
                            </select>
                        </div>
                        {newMethod.type === 'Credit Card' && (
                            <>
                                <div className="form-group">
                                    <label>Last 4 Digits</label>
                                    <input 
                                        type="text" 
                                        name="last4" 
                                        value={newMethod.last4} 
                                        onChange={handleInputChange}
                                        placeholder="Last 4 digits"
                                        maxLength="4"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input 
                                        type="text" 
                                        name="expiry" 
                                        value={newMethod.expiry} 
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                    />
                                </div>
                            </>
                        )}
                        {newMethod.type === 'Mobile Money' && (
                            <div className="form-group">
                                <label>Provider</label>
                                <select 
                                    name="provider" 
                                    value={newMethod.provider} 
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select provider</option>
                                    <option value="MTN Uganda">MTN Uganda</option>
                                    <option value="Airtel Money Uganda">Airtel Money Uganda</option>
                                </select>
                            </div>
                        )}
                        <div className="modal-actions">
                            <button className="btn" onClick={submitAddMethod}>
                                Add Method
                            </button>
                            <button className="btn cancel" onClick={() => setShowAddModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

// --- Privacy Section ---
const PrivacySection = () => {
    const [showToast, setShowToast] = useState(false);

    const handleExport = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section className="settings-section">
            {showToast && <Toast message="Data export started. You'll receive an email when it's ready." type="success" />}
            <div className="section-title">Data & Privacy</div>
            <div className="settings-form">
                <h3>Export Data</h3>
                <p>Download all your account and activity data.</p>
                <button className="btn" onClick={handleExport}>
                    <BiDownload /> Export My Data
                </button>
            </div>
            <div className="settings-form">
                <h3>Request Data Deletion</h3>
                <p>Request permanent deletion of your account and all associated data.</p>
                <button className="btn delete-btn" style={{backgroundColor: 'var(--danger)'}}>
                    <BiTrash/> Request Deletion
                </button>
            </div>
        </section>
    );
};

// --- Danger Zone Section ---
const DangerZoneSection = () => {
    const [showToast, setShowToast] = useState(false);

    const handleReset = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleLock = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section className="settings-section">
            {showToast && <Toast message="Action completed successfully" type="success" />}
            <div className="section-title">Danger Zone</div>
            <div className="danger-zone">
                <h3><BiErrorCircle size={24}/> Critical Actions</h3>
                <p><b>Reset All System Settings:</b> Restores default configurations. This action cannot be undone.</p>
                <button className="btn-danger" onClick={handleReset}>
                    <BiLockAlt/> Reset All Settings
                </button>
                <br/><br/>
                <p><b>Lock System for Maintenance:</b> Temporarily restricts access for all non-admin users.</p>
                <button className="btn-danger" onClick={handleLock}>
                    <BiLockAlt/> Lock System
                </button>
            </div>
        </section>
    );
};

// --- Main AdminSettings Component ---
function AdminSettings() {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSection />;
            case 'security': return <SecuritySection />;
            case 'preferences': return <PreferencesSection />;
            case 'notifications': return <NotificationsSection />;
            case 'members': return <MembersSection />;
            case 'paymentmethods': return <PaymentMethodsSection />;
            case 'privacy': return <PrivacySection />;
            case 'dangerzone': return <DangerZoneSection />;
            default: return <ProfileSection />;
        }
    };

    const NavButton = ({ tabName, icon, children }) => (
        <button
            className={activeTab === tabName ? 'active' : ''}
            onClick={() => setActiveTab(tabName)}
        >
            {icon} {children}
        </button>
    );

    return (
        <div className="admin-settings-container">
            <header className="page-local-header">
                <h1>Admin Settings</h1>
            </header>

            <nav className="settings-nav">
                <NavButton tabName="profile" icon={<BiUserCircle />}>Profile</NavButton>
                <NavButton tabName="security" icon={<BiLockAlt />}>Security</NavButton>
                <NavButton tabName="preferences" icon={<BiPalette />}>Preferences</NavButton>
                <NavButton tabName="notifications" icon={<BiBell />}>Notifications</NavButton>
                <NavButton tabName="members" icon={<BiGroup />}>Members</NavButton>
                <NavButton tabName="paymentmethods" icon={<BiCard />}>Payment Methods</NavButton>
                <NavButton tabName="privacy" icon={<BiCheckShield />}>Data & Privacy</NavButton>
                <NavButton tabName="dangerzone" icon={<BiErrorCircle />}>Danger Zone</NavButton>
            </nav>

            <main>
                {renderContent()}
            </main>
        </div>
    );
}

export default AdminSettings;