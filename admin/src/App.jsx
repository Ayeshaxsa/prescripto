import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";
import { AdminContext } from "./context/AdminContext.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={4000} theme="light" />
        <Login />
      </>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <ToastContainer position="top-right" autoClose={4000} theme="light" />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 p-6 sm:p-10 min-h-[calc(100vh-70px)] bg-gray-50/30">
          <Routes>
            {/* Admin Routes */}
            {aToken && (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />
              </>
            )}

            {/* Doctor Routes */}
            {dToken && (
              <>
                <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
              </>
            )}

            {/* Fallback Catch */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
