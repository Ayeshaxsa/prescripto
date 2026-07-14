import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Global Bookings Ledger</h2>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white border border-gray-100 rounded-2xl">
          <svg className="w-14 h-14 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-800 font-semibold text-lg mb-1">No Bookings Recorded</p>
          <p className="text-sm text-gray-500 max-w-sm">
            There are currently no patient appointment bookings recorded in the database.
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
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Fee</th>
                  <th className="px-6 py-4 text-right">Status / Actions</th>
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
                    <td className="px-6 py-4 text-gray-500">{calculateAge(item.userData.dob)}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {slotDateFormat(item.slotDate)} <br />
                      <span className="text-xs text-gray-400 font-normal">{item.slotTime.toLowerCase()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden border border-gray-100/50">
                          {item.docData.image ? (
                            <img className="w-full h-full object-cover" src={item.docData.image} alt="" />
                          ) : (
                            <div className="text-primary font-bold text-sm">
                              {item.docData.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{item.docData.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{item.docData.specialty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">${item.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        {item.payment && !item.cancelled && (
                          <span className="text-[10px] font-bold text-green-500 border border-green-200 bg-green-50/50 px-2 py-0.5 rounded uppercase">
                            Paid
                          </span>
                        )}

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
                            className="bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 transition-smooth text-red-500 text-xs font-semibold uppercase px-4.5 py-1.5 rounded-lg shadow-sm"
                          >
                            Cancel
                          </button>
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

export default AllAppointments;
