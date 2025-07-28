// src/App.jsx
import React from 'react';
// 1. Import the necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components and pages
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import StaffManagement from './pages/admin/StaffManagement.jsx'; // Import our new page
import './App.css';

function App() {
    return (
        // 2. Wrap the entire application in the Router component
        <Router>
            <div className="app-container">
                <Navbar />
                <Sidebar />
                <main className="main-content">
                    <div className="content-area">
                        {/* 3. Use the Routes and Route components to define your pages */}
                        <Routes>
                            {/* This route is for the main page (e.g., http://localhost:5173/) */}
                            <Route path="/" element={<AdminDashboard />} />

                            {/* This is the new route for the staff management page */}
                            <Route path="/staff" element={<StaffManagement />} />

                            {/* We will add more routes here for other pages later */}
                            {/* <Route path="/patients" element={<PatientRecords />} /> */}
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;



src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Import your components and pages
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import StaffManagement from './pages/admin/StaffManagement.jsx';

// --- THIS IS THE LINE TO ADD OR FIX ---
import LoginPage from './pages/LoginPage/LoginPage.jsx'; // Make sure this path is correct

import './App.css';

// The rest of the file is the same as before
function MainLayout() {
  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <div className="content-area">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page - NO sidebar/navbar */}
        <Route path="/login" element={<LoginPage />} />

        {/* Routes for the main application layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/staff" element={<StaffManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
