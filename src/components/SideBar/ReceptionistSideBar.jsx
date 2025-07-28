// src/components/Sidebar/ReceptionistSidebar.jsx
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserEdit, FaCalendarAlt, FaFileInvoiceDollar, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; // We will re-use the same CSS file

function ReceptionistSidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-header">
        Receptionist
      </div>
      <br />
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/receptionist" className="nav-link" end>
              <FaTachometerAlt /> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/receptionist/patients" className="nav-link">
  <FaUserEdit /> <span>Patient management</span>
</NavLink>
          </li>
          <li>
            <NavLink to="/receptionist/appointments" className="nav-link">
              <FaCalendarAlt /> <span>Appointments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/receptionist/billing" className="nav-link">
              <FaFileInvoiceDollar /> <span>Billing</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout button at the bottom */}
      <div className="sidebar-footer">
        <a href="/login" className="nav-link logout-link">
          <FaSignOutAlt /> <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}

export default ReceptionistSidebar;