import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const specialtiesList = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const { specialty } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (specialty) {
      setFilterDoc(doctors.filter((doc) => doc.specialty.toLowerCase() === specialty.toLowerCase()));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialty]);

  return (
    <div className="py-6">
      <p className="text-gray-600 text-sm mb-6">Book appointments with our medical professionals:</p>
      <div className="flex flex-col sm:flex-row items-start gap-8 mt-5">
        {/* Filter Sidebar */}
        <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-60 overflow-scroll sm:overflow-auto scrollbar-hide shrink-0 pb-3 sm:pb-0">
          <p
            onClick={() => (specialty ? navigate("/doctors") : null)}
            className={`px-4 py-2 border border-gray-100 rounded-xl cursor-pointer text-xs font-semibold uppercase tracking-wider text-center sm:text-left transition-smooth ${
              !specialty ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Doctors
          </p>
          {specialtiesList.map((item, index) => {
            const isActive = specialty && specialty.toLowerCase() === item.toLowerCase();
            return (
              <p
                key={index}
                onClick={() => (isActive ? navigate("/doctors") : navigate(`/doctors/${item}`))}
                className={`px-4 py-2.5 border border-gray-100 rounded-xl cursor-pointer text-xs font-semibold uppercase tracking-wider text-center sm:text-left whitespace-nowrap transition-smooth ${
                  isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </p>
            );
          })}
        </div>

        {/* Doctor Grid List */}
        <div className="flex-1 w-full">
          {filterDoc.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-gray-200 rounded-2xl w-full">
              <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7.5v9M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-800 font-semibold text-lg mb-1">No Doctors Found</p>
              <p className="text-sm text-gray-500 max-w-sm">
                No specialists listed in "{specialty}" are registered or currently online.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((item, index) => (
                <div
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-smooth bg-white hover:shadow-lg"
                  key={index}
                >
                  <div className="bg-blue-50/50 h-48 w-full flex items-center justify-center overflow-hidden relative">
                    {item.image ? (
                      <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold">
                      {item.specialty}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-center">
                      <p className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"}`}></p>
                      <p className={item.available ? "text-green-500 font-medium" : "text-gray-500 font-medium"}>
                        {item.available ? "Available" : "Not Available"}
                      </p>
                    </div>
                    <p className="text-gray-900 font-semibold text-lg mt-1">{item.name}</p>
                    <p className="text-gray-500 text-sm">{item.degree} • {item.experience} Exp</p>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400">Consultation Fee</span>
                      <span className="text-primary font-bold">${item.fees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
