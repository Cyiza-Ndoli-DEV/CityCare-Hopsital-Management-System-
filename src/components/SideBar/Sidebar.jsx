// src/components/Sidebar/Sidebar.jsx

import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserCog, FaUserPlus, FaCalendarAlt, FaChartBar, FaFileInvoiceDollar, FaCog,  FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import { FaUserCheck, FaUserGroup, FaUserShield } from 'react-icons/fa6';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-section-header">
                Admin
            </div>
            <nav className="sidebar-nav">
                <h3>MAIN</h3>
                <ul>
                    <li>
                        <NavLink to="/admin" className="nav-link" end> {/* this end etegeza nti the active status will shift if some other part is clicked */}
                            <FaTachometerAlt className="nav-icon" /> <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/staff" className="nav-link" end>
                            <FaUserCog className="nav-icon" /> <span>Staff management</span>
                        </NavLink>
                    </li>
                    <li>
                     <NavLink to="/admin/roles" className="nav-link" end>
                            <FaUserShield className="nav-icon" /> <span>Role management</span>
                        </NavLink>
                    </li>
                    {/* I will add these routes later */}
                    <li><NavLink to="/admin/patients" className="nav-link" end><FaUserGroup className="nav-icon" /> <span>Patient records</span></NavLink></li>
                    <li><NavLink to="/admin/appointments" className="nav-link " end><FaCalendarAlt className="nav-icon" /> <span>Appointments</span></NavLink></li>
                    <li><NavLink to="/admin/reports" className="nav-link" end><FaChartBar className="nav-icon" /> <span>Report & Analytics</span></NavLink></li>
                    <li><NavLink to="/admin/billing" className="nav-link" end><FaFileInvoiceDollar className="nav-icon" /> <span>Billing & Finance</span></NavLink></li>
                    <li><NavLink to="/admin/settings" className="nav-link" end><FaCog className="nav-icon" /> <span>System Settings</span></NavLink></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                    <a href="/" className="nav-link logout-link">
                      <FaSignOutAlt /> <span>Logout</span>
                    </a>
                  </div>
        </aside>
    );
}

export default Sidebar;