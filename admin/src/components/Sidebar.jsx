import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const activeStyle = "flex items-center gap-3.5 py-4 px-6 md:px-9 border-r-4 border-primary bg-primary/5 text-primary font-semibold transition-smooth";
  const inactiveStyle = "flex items-center gap-3.5 py-4 px-6 md:px-9 text-gray-500 hover:text-gray-900 border-r-4 border-transparent hover:bg-gray-50/50 transition-smooth font-medium";

  return (
    <div className="w-[70px] md:w-64 min-h-[calc(100vh-70px)] bg-white border-r border-r-gray-150 py-6 text-sm flex flex-col gap-2 sticky top-[70px] shrink-0">
      {/* Admin navigation list */}
      {aToken && (
        <>
          <NavLink to="/admin-dashboard" className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-wider font-semibold">Dashboard</span>
          </NavLink>

          <NavLink to="/all-appointments" className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-wider font-semibold">Appointments</span>
          </NavLink>

          <NavLink to="/add-doctor" className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-wider font-semibold">Add Doctor</span>
          </NavLink>

          <NavLink to="/doctor-list" className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-wider font-semibold">Doctors List</span>
          </NavLink>
        </>
      )}

      {/* Doctor navigation list */}
      {dToken && (
        <>
          <NavLink to="/doctor-dashboard" className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-wider font-semibold">Dashboard</span>
          </NavLink>

          <NavLink to="/doctor-appointments" className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-wider font-semibold">Appointments</span>
          </NavLink>

          <NavLink to="/doctor-profile" className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}>
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden md:block text-xs uppercase tracking-wider font-semibold">Profile Settings</span>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
