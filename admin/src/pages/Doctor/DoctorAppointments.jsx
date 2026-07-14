import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Consultations</h2>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white border border-gray-100 rounded-2xl">
          <svg className="w-14 h-14 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-800 font-semibold text-lg mb-1">No Appointments Booked</p>
          <p className="text-sm text-gray-500 max-w-sm">
            You don't have any patient appointments booked yet.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Fee</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {appointments.reverse().map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/30 transition-smooth">
                    <td className="px-6 py-4 text-gray-400 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden border border-gray-100/50">
                          {item.userData.image ? (
                            <img className="w-full h-full object-cover" src={item.userData.image} alt="" />
                          ) : (
                            <div className="text-primary font-bold text-sm">
                              {item.userData.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-gray-800">{item.userData.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                        item.payment 
                          ? "text-green-500 border-green-200 bg-green-50/30" 
                          : "text-amber-500 border-amber-200 bg-amber-50/30"
                      }`}>
                        {item.payment ? "Paid (Online)" : "Cash / Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{calculateAge(item.userData.dob)}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {slotDateFormat(item.slotDate)} <br />
                      <span className="text-xs text-gray-400 font-normal">{item.slotTime.toLowerCase()}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">${item.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        {item.cancelled ? (
                          <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-3 py-1 rounded-lg">
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className="text-xs font-semibold text-green-500 bg-green-50 border border-green-100 px-3 py-1 rounded-lg">
                            Completed
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => cancelAppointment(item._id)}
                              className="border border-gray-150 hover:bg-red-50 hover:text-red-500 hover:border-red-100 text-gray-500 text-xs font-semibold uppercase px-4 py-2 rounded-lg transition-smooth"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => completeAppointment(item._id)}
                              className="bg-primary hover:bg-opacity-95 text-white text-xs font-semibold uppercase px-4.5 py-2 rounded-lg shadow-md shadow-primary/10 transition-smooth"
                            >
                              Complete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
