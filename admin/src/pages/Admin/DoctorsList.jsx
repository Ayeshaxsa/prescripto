import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">All Registered Doctors</h2>

      {doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white border border-gray-100 rounded-2xl">
          <svg className="w-14 h-14 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-800 font-semibold text-lg mb-1">No Doctors Listed</p>
          <p className="text-sm text-gray-500 max-w-sm">
            There are currently no doctors registered on the platform. Click "Add Doctor" in the sidebar to add a profile.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {doctors.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:translate-y-[-5px] transition-smooth flex flex-col justify-between"
            >
              <div>
                <div className="bg-blue-50/50 h-44 w-full flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <p className="text-gray-900 font-bold text-base truncate">{item.name}</p>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider">{item.specialty}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.degree} • {item.experience} Exp</p>
                </div>
              </div>

              {/* Status toggles */}
              <div className="px-4 pb-4 pt-3 border-t border-gray-50 flex items-center gap-2">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  id={`avail-${item._id}`}
                  className="rounded text-primary focus:ring-primary w-4.5 h-4.5 cursor-pointer accent-primary"
                />
                <label htmlFor={`avail-${item._id}`} className="text-xs font-semibold text-gray-600 cursor-pointer">
                  {item.available ? "Accepting Patients" : "Offline"}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
