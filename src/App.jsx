import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/Navbar/Navbar.jsx';
import AdminSidebar from './components/SideBar/Sidebar.jsx';
import ReceptionistSidebar from './components/SideBar/ReceptionistSideBar.jsx';
import DoctorSidebar from './components/SideBar/DoctorSideBar.jsx';
import PharmacistSidebar from './components/SideBar/PharmacistSidebar.jsx';

// Page Components
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import StaffManagement from './pages/admin/StaffManagement.jsx';
import RoleManagement from './pages/admin/RoleManagement.jsx';
import AdminPatientRecords from './pages/admin/AdminPatientRecords.jsx';
import AdminAppointments from './pages/admin/AdminAppointments.jsx';
import AdminReports from './pages/admin/AdminReports.jsx';
import AdminBilling from './pages/admin/AdminBilling.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';

// Receptionist Pages
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard.jsx';
import PatientManagement from './pages/receptionist/PatientManagement.jsx';
import PatientProfile from './pages/receptionist/PatientProfile.jsx';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import MyPatients from './pages/doctor/MyPatients.jsx';
import DoctorAppointments from './pages/doctor/DoctorAppointments.jsx';
import DoctorMedicalRecords from './pages/doctor/DoctorMedicalRecords.jsx';
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions.jsx';
import DoctorRecords from './pages/doctor/DoctorRecords.jsx';

// Pharmacist Pages
import PharmacistDashboard from './pages/pharmacist/PharmacistDashboard.jsx';
import PharmacistInventory from './pages/pharmacist/PharmacistInventory.jsx';

// Layout Components
function AdminLayout() {
  return (
    <>
      <Navbar userRole="Admin" userName="Admin User" />
      <div className="app-container">
        <AdminSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

function ReceptionistLayout() {
  return (
    <>
      <Navbar 
        userRole="Receptionist" 
        userName="Receptionist User"
        avatarSrc="https://randomuser.me/api/portraits/women/92.jpg" 
      />
      <div className="app-container">
        <ReceptionistSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

function DoctorLayout() {
  return (
    <>
      <Navbar 
        userRole="Doctor" 
        userName="Doctor User"
        avatarSrc="https://randomuser.me/api/portraits/men/59.jpg" 
      />
      <div className="app-container">
        <DoctorSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

function PharmacistLayout() {
  return (
    <>
      <Navbar 
        userRole="Pharmacist" 
        userName="Pharmacist User"
        avatarSrc="https://randomuser.me/api/portraits/women/68.jpg" 
      />
      <div className="app-container">
        <PharmacistSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="patients" element={<AdminPatientRecords />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="billing" element={<AdminBilling />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Receptionist Routes */}
        <Route path="/receptionist" element={<ReceptionistLayout />}>
          <Route index element={<ReceptionistDashboard />} />
          <Route path="patients" element={<PatientManagement />} />
          <Route path="patient-profile" element={<PatientProfile/>} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="my-patients" element={<MyPatients />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="medical-records" element={<DoctorMedicalRecords />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          <Route path="records" element={<DoctorRecords />} />
        </Route>

        {/* Pharmacist Routes */}
        <Route path="/pharmacist" element={<PharmacistLayout />}>
          <Route index element={<PharmacistDashboard />} />
          <Route path="inventory" element={<PharmacistInventory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;