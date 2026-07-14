import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const DoctorDetails = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();

    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // slots till 9 PM

      // Set booking starting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;

        // Check if slot booked
        const isBooked =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30); // 30 mins interval
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login is required to book appointments.");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData(); // Reload doctor availability map
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  // Find related doctors of the same specialty
  const relatedDocs = doctors.filter((doc) => doc.specialty === docInfo.specialty && doc._id !== docId);

  return (
    <div className="py-6">
      {/* Doctor Cards */}
      <div className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
        {/* Photo Container */}
        <div className="w-full sm:w-72 h-72 rounded-2xl bg-blue-50/50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100/50">
          {docInfo.image ? (
            <img className="w-full h-full object-cover" src={docInfo.image} alt={docInfo.name} />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-4xl">
              {docInfo.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-3xl font-bold text-gray-800">{docInfo.name}</h2>
              <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-semibold">
                {docInfo.specialty}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-gray-500 font-medium">
              <p>{docInfo.degree}</p>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <p>{docInfo.experience} Experience</p>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">About Bio</h3>
              <p className="text-gray-600 leading-relaxed font-light text-sm">{docInfo.about}</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-6 sm:mt-0">
            <div>
              <p className="text-xs text-gray-400">Consultation Fee</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {currencySymbol}
                {docInfo.fees}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${docInfo.available ? "bg-green-500" : "bg-gray-300"}`}></span>
              <span className="font-semibold text-sm text-gray-600">
                {docInfo.available ? "Accepting Patients" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Scheduling Selection */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Select Appointment Slot</h3>
        {docSlots.length === 0 ? (
          <p className="text-gray-400">Calculating schedules...</p>
        ) : (
          <div className="space-y-6">
            {/* Days Slider */}
            <div className="flex gap-3 overflow-scroll scrollbar-hide pb-3">
              {docSlots.map((item, index) => {
                if (item.length === 0) return null;
                const isSelected = slotIndex === index;
                const dateVal = item[0].datetime;
                return (
                  <div
                    onClick={() => {
                      setSlotIndex(index);
                      setSlotTime(""); // Clear slot time when changing date
                    }}
                    key={index}
                    className={`flex flex-col items-center justify-center p-4 min-w-20 rounded-2xl cursor-pointer border transition-smooth ${
                      isSelected
                        ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                        : "bg-white border-gray-100 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase">{daysOfWeek[dateVal.getDay()]}</p>
                    <p className="text-lg font-bold mt-1">{dateVal.getDate()}</p>
                  </div>
                );
              })}
            </div>

            {/* Time Slots grid */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Available Times</h4>
              {docSlots[slotIndex] && docSlots[slotIndex].length === 0 ? (
                <p className="text-sm text-gray-400 py-2">No slots available for this day. Try another date.</p>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {docSlots[slotIndex]?.map((item, index) => {
                    const isSelected = slotTime === item.time;
                    return (
                      <p
                        onClick={() => setSlotTime(item.time)}
                        key={index}
                        className={`text-sm px-5 py-2.5 rounded-xl cursor-pointer border transition-smooth font-medium ${
                          isSelected
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                            : "bg-white border-gray-100 hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        {item.time.toLowerCase()}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submit Button */}
            {docInfo.available && (
              <button
                disabled={!slotTime}
                onClick={bookAppointment}
                className="bg-primary text-white px-10 py-3.5 rounded-full text-sm font-medium hover:bg-opacity-95 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/25 mt-4"
              >
                Confirm Booking
              </button>
            )}
          </div>
        )}
      </div>

      {/* Related Doctors List */}
      {relatedDocs.length > 0 && (
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Specialists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedDocs.slice(0, 4).map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  window.scrollTo(0, 0);
                }}
                className="border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-smooth bg-white hover:shadow-lg"
                key={index}
              >
                <div className="bg-blue-50/50 h-40 w-full flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center">
                    <p className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-400"}`}></p>
                    <p className={item.available ? "text-green-500 font-medium" : "text-gray-500 font-medium"}>
                      {item.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold text-base mt-1 truncate">{item.name}</p>
                  <p className="text-gray-500 text-xs truncate">{item.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
