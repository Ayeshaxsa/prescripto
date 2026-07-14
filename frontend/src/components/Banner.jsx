import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  return (
    <div className="flex bg-primary rounded-2xl px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10 relative overflow-hidden shadow-xl shadow-primary/10">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-2xl -ml-20 -mt-20 pointer-events-none"></div>

      {/* Left Side Content */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 z-10">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          <p>Book Appointment</p>
          <p className="mt-2">With 100+ Trusted Doctors</p>
        </div>
        {!token ? (
          <button
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0);
            }}
            className="bg-white text-sm text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-smooth font-medium shadow-md shadow-black/10"
          >
            Create account
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/doctors");
              window.scrollTo(0, 0);
            }}
            className="bg-white text-sm text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-smooth font-medium shadow-md shadow-black/10"
          >
            Browse Doctors
          </button>
        )}
      </div>

      {/* Right Side Vector Calendar */}
      <div className="hidden md:block md:w-1/3 lg:w-[370px] relative flex items-center justify-center py-6">
        <svg className="w-full max-w-[200px] h-auto drop-shadow-lg opacity-90" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base paper */}
          <rect x="30" y="50" width="140" height="120" rx="16" fill="white" />
          {/* Header red strip */}
          <path d="M30 66C30 57.1634 37.1634 50 46 50H154C162.837 50 170 57.1634 170 66V80H30V66Z" fill="#EF4444" />
          {/* Ring bindings */}
          <rect x="60" y="38" width="12" height="20" rx="6" fill="#D1D5DB" />
          <rect x="128" y="38" width="12" height="20" rx="6" fill="#D1D5DB" />
          {/* Grid check dots */}
          <circle cx="65" cy="110" r="10" fill="#E5E7EB" />
          <circle cx="100" cy="110" r="10" fill="#E5E7EB" />
          <circle cx="135" cy="110" r="10" fill="#E5E7EB" />
          <circle cx="65" cy="140" r="10" fill="#E5E7EB" />
          {/* Selected Booking Date (Green Check) */}
          <circle cx="100" cy="140" r="12" fill="#10B981" />
          <path d="M95 140L98 143L105 136" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="135" cy="140" r="10" fill="#E5E7EB" />
        </svg>
      </div>
    </div>
  );
};

export default Banner;
