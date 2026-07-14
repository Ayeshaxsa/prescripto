import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-bold">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-500 font-light leading-relaxed">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl w-full max-w-lg mt-8">
          <svg className="w-12 h-12 text-gray-400 mb-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-700 font-semibold mb-1">No Doctors Available</p>
          <p className="text-xs text-gray-500 max-w-xs">
            There are currently no doctors registered on the platform. Use the Admin Panel to register new doctors!
          </p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 gap-y-8 px-3 sm:px-0">
          {doctors.slice(0, 8).map((item, index) => (
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
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold">
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

      {doctors.length > 0 && (
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          className="bg-blue-50 text-primary px-12 py-3.5 rounded-full mt-10 hover:bg-primary hover:text-white transition-smooth font-medium shadow-sm"
        >
          more
        </button>
      )}
    </div>
  );
};

export default TopDoctors;
