import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%] min-h-screen flex flex-col justify-between">
      <div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} theme="light" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:specialty" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<DoctorDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
