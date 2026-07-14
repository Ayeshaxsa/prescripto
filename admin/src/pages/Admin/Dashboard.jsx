import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.doctors}</p>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings panel */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Latest Bookings
          </h3>
        </div>

        {dashData.latestAppointments.length === 0 ? (
          <p className="p-8 text-center text-gray-400 text-sm">No bookings recorded yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-5 hover:bg-gray-50/30 transition-smooth">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 overflow-hidden border border-gray-100/50">
                    {item.userData.image ? (
                      <img className="w-full h-full object-cover" src={item.userData.image} alt="" />
                    ) : (
                      <div className="text-primary font-bold text-lg">{item.userData.name.charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{item.userData.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Doctor: <span className="font-semibold text-gray-600">{item.docData.name}</span> • {slotDateFormat(item.slotDate)} | {item.slotTime.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Cancel Trigger */}
                {item.cancelled ? (
                  <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-3 py-1 rounded-lg">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-xs font-semibold text-green-500 bg-green-50 border border-green-100 px-3 py-1 rounded-lg">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 h-8 rounded-full border border-gray-100 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-smooth"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
