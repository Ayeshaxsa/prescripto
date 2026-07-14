import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // Utility to format date string e.g. "15_7_2026" -> "15 Jul 2026"
  const formatDate = (dateStr) => {
    try {
      const parts = dateStr.split("_");
      const day = parts[0];
      const monthIdx = Number(parts[1]);
      const year = parts[2];
      return `${day} ${months[monthIdx]} ${year}`;
    } catch (e) {
      return dateStr;
    }
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        // Reverse to show latest first
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData(); // Refresh slots booked mapping
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // const payAppointment = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(
  //       `${backendUrl}/api/user/payment`,
  //       { appointmentId },
  //       { headers: { token } }
  //     );
  //     if (data.success) {
  //       toast.success(data.message);
  //       getUserAppointments();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.message);
  //   }
  // };

  const payAppointment = async (appointmentId) => {
    try {
      // Step 1: Create Razorpay Order
      const { data } = await axios.post(
        `${backendUrl}/api/payment/create-order`,
        { appointmentId },
        { headers: { token } },
      );

      if (!data.success) {
        return toast.error(data.message);
      }

      const order = data.order;

      // Step 2: Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Prescripto",

        description: "Doctor Appointment",

        order_id: order.id,

        handler: async function (response) {
          // Step 3: Verify Payment

          const verify = await axios.post(
            `${backendUrl}/api/payment/verify`,
            {
              appointmentId,

              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: { token },
            },
          );

          if (verify.data.success) {
            toast.success("Payment Successful");

            getUserAppointments();
          } else {
            toast.error(verify.data.message);
          }
        },

        theme: {
          color: "#5F6FFF",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">
        My Appointments
      </h2>
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white border border-gray-100 rounded-2xl">
          <svg
            className="w-14 h-14 text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-800 font-semibold text-lg mb-1">
            No Appointments Booked
          </p>
          <p className="text-sm text-gray-500 max-w-sm">
            You don't have any appointments scheduled yet. Book your first
            consultation from our doctor directory!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-smooth relative overflow-hidden"
            >
              {/* Left Side Doctor Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-blue-50/50 flex items-center justify-center overflow-hidden border border-gray-50 shrink-0 mx-auto sm:mx-0">
                {item.docData.image ? (
                  <img
                    className="w-full h-full object-cover"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                ) : (
                  <div className="text-primary font-bold text-2xl">
                    {item.docData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Center Info Panel */}
              <div className="flex-1 text-center sm:text-left space-y-1">
                <p className="text-lg font-bold text-gray-800">
                  {item.docData.name}
                </p>
                <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                  {item.docData.specialty}
                </p>
                <div className="text-sm text-gray-500 mt-2">
                  <p className="font-medium text-gray-700">Clinic Address:</p>
                  <p className="font-light">
                    {item.docData.address.line1}
                    {item.docData.address.line2 &&
                      `, ${item.docData.address.line2}`}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-3 bg-gray-50/70 inline-block px-3 py-1 rounded-lg">
                  <span className="font-semibold text-gray-700">
                    Scheduled:
                  </span>{" "}
                  {formatDate(item.slotDate)} | {item.slotTime.toLowerCase()}
                </p>
              </div>

              {/* Right Side Status Actions */}
              <div className="flex sm:flex-col justify-center sm:justify-between items-center sm:items-end gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                <div>
                  <p className="text-xs text-gray-400 text-center sm:text-right">
                    Consultation Fee
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">
                    ${item.amount}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 w-full sm:w-44">
                  {/* Cancelled badge */}
                  {item.cancelled && (
                    <button className="sm:w-full border border-red-200 text-red-500 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase cursor-not-allowed bg-red-50/50">
                      Cancelled
                    </button>
                  )}

                  {/* Completed badge */}
                  {item.isCompleted && (
                    <button className="sm:w-full border border-green-200 text-green-500 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase cursor-not-allowed bg-green-50/50">
                      Completed
                    </button>
                  )}

                  {/* Active Booking Controls */}
                  {!item.cancelled && !item.isCompleted && (
                    <>
                      {item.payment ? (
                        <button className="sm:w-full border border-green-200 text-green-500 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase bg-green-50/30 cursor-not-allowed">
                          Paid
                        </button>
                      ) : (
                        <button
                          onClick={() => payAppointment(item._id)}
                          className="sm:w-full bg-primary hover:bg-opacity-95 text-white px-6 py-2.5 rounded-xl text-xs font-semibold uppercase shadow-md shadow-primary/10 transition-smooth"
                        >
                          Pay Online
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (item.payment) {
                            toast.info(
                              "This appointment has already been paid for. Please contact the clinic to cancel it.",
                            );
                          } else {
                            cancelAppointment(item._id);
                          }
                        }}
                      >
                        {item.payment ? "Contact Admin" : "Cancel Booking"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
