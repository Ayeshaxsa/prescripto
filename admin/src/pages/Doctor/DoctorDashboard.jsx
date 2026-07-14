import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">${dashData.earnings}</p>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
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
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
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

      {/* Latest appointments list */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Latest Consultations
          </h3>
        </div>

        {dashData.latestAppointments.length === 0 ? (
          <p className="p-8 text-center text-gray-400 text-sm">No appointments booked yet.</p>
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
                      {slotDateFormat(item.slotDate)} | {item.slotTime.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Operations triggers */}
                <div className="flex items-center gap-2">
                  {item.cancelled ? (
                    <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-3 py-1 rounded-lg">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="text-xs font-semibold text-green-500 bg-green-50 border border-green-100 px-3 py-1 rounded-lg">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="w-8 h-8 rounded-full border border-gray-100 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-smooth"
                        title="Cancel Booking"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="w-8 h-8 rounded-full border border-gray-100 hover:border-green-200 hover:bg-green-50 text-gray-400 hover:text-green-500 flex items-center justify-center transition-smooth"
                        title="Complete Session"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
