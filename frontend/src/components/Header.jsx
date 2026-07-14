import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-2xl px-6 md:px-10 lg:px-20 py-10 md:py-16 text-white relative overflow-hidden shadow-xl shadow-primary/10">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>

      {/* Left Side Content */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[8vw] md:mb-[-30px] z-10">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white/90 text-sm font-light mt-2">
          {/* Avatar stack placeholders in SVG */}
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-primary bg-blue-100 flex items-center justify-center text-xs font-semibold text-primary"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-center md:text-left leading-snug">
            Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" /> schedule your
            appointment hassle-free.
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2 bg-white text-gray-800 px-8 py-3 rounded-full text-sm font-medium mt-6 hover:scale-105 transition-smooth shadow-lg shadow-black/10"
        >
          Book appointment
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>

      {/* Right Side Illustration */}
      <div className="md:w-1/2 relative flex items-center justify-center mt-10 md:mt-0 z-10">
        <svg className="w-full max-w-[400px] h-auto drop-shadow-xl" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base circle grid */}
          <circle cx="200" cy="200" r="160" fill="white" fillOpacity="0.08" />
          <circle cx="200" cy="200" r="120" fill="white" fillOpacity="0.08" />

          {/* Abstract Doctor and Heartbeat */}
          <path
            d="M80 200C120 200 130 140 150 140C170 140 180 260 200 260C220 260 230 200 250 200H320"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 1"
          />

          {/* Glowing Plus Icon */}
          <rect x="180" y="70" width="40" height="40" rx="10" fill="white" fillOpacity="0.15" />
          <path d="M200 80V100M190 90H210" stroke="white" strokeWidth="3" strokeLinecap="round" />

          {/* Mock Dashboard Card */}
          <rect x="230" y="240" width="120" height="70" rx="12" fill="white" fillOpacity="0.12" />
          <rect x="245" y="255" width="50" height="8" rx="4" fill="white" fillOpacity="0.8" />
          <rect x="245" y="270" width="90" height="6" rx="3" fill="white" fillOpacity="0.5" />
          <circle cx="245" cy="290" r="5" fill="#10B981" />
          <rect x="255" y="287" width="40" height="6" rx="3" fill="white" fillOpacity="0.5" />

          {/* Stetho/Medical Cross Vector */}
          <g transform="translate(110, 100)">
            <circle cx="40" cy="40" r="30" fill="white" />
            <path
              d="M32 40H48M40 32V48"
              stroke="#5F6FFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Header;
