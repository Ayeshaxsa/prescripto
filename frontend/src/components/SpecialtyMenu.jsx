import React from "react";
import { Link } from "react-router-dom";

const specialtyData = [
  {
    specialty: "General physician",
    color: "bg-blue-50 text-blue-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9.5M12 4v16m-8-8h16" />
      </svg>
    ),
  },
  {
    specialty: "Gynecologist",
    color: "bg-pink-50 text-pink-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a5 5 0 100 10 5 5 0 000-10zM12 14v8M9 18h6" />
      </svg>
    ),
  },
  {
    specialty: "Dermatologist",
    color: "bg-purple-50 text-purple-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    specialty: "Pediatrician",
    color: "bg-green-50 text-green-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    specialty: "Neurologist",
    color: "bg-amber-50 text-amber-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    specialty: "Gastroenterologist",
    color: "bg-red-50 text-red-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const SpecialtyMenu = () => {
  return (
    <div id="specialty" className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold">Find by Specialty</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-500 font-light leading-relaxed">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-6 pt-5 w-full overflow-scroll scrollbar-hide">
        {specialtyData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.specialty}`}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-smooth group"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md shadow-black/5 group-hover:shadow-lg transition-smooth ${item.color}`}>
              {item.icon}
            </div>
            <p className="text-center font-medium mt-3 text-gray-700 group-hover:text-primary transition-smooth">
              {item.specialty}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyMenu;
