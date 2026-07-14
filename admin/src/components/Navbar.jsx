import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="flex items-center justify-between px-6 sm:px-10 py-3.5 border-b border-b-gray-150 bg-white sticky top-0 z-20 shadow-sm">
      {/* Brand logo */}
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12H15M12 9V15M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="text-lg font-bold tracking-tight text-gray-800">
            Prescript<span className="text-primary">o</span>
          </span>
          <span className="text-[10px] font-semibold text-primary uppercase border border-primary/30 px-2 py-0.5 rounded-full bg-primary/5 text-center w-fit">
            {aToken ? "Admin Panel" : "Doctor Portal"}
          </span>
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={logout}
        className="border border-gray-250 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-smooth text-gray-600 px-6 py-2 rounded-full text-xs font-semibold uppercase shadow-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
