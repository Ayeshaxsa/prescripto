import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-150">
      {/* Dynamic inline SVG Logo */}
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
        <span className="text-xl font-bold tracking-tight text-gray-800">
          Prescript<span className="text-primary">o</span>
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-start gap-8 font-medium">
        <NavLink to="/">
          <li className="py-1 uppercase text-xs tracking-wider">Home</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 uppercase text-xs tracking-wider">All Doctors</li>
        </NavLink>
        <a href="#footer" className="py-1 uppercase text-xs tracking-wider text-gray-600 hover:text-gray-900 transition-smooth">
          About
        </a>
        <a href="#footer" className="py-1 uppercase text-xs tracking-wider text-gray-600 hover:text-gray-900 transition-smooth">
          Contact
        </a>
      </ul>

      {/* Profile/Login actions */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            {userData.image ? (
              <img className="w-8 h-8 rounded-full object-cover border border-primary/20" src={userData.image} alt="" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            {/* Dropdown Menu */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded border border-gray-100 shadow-lg flex flex-col gap-2 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-primary cursor-pointer text-sm">
                  My Profile
                </p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-primary cursor-pointer text-sm">
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-red-500 cursor-pointer text-sm border-t border-gray-100 pt-2">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hidden md:block hover:bg-opacity-95 transition-smooth shadow-sm shadow-primary/20"
          >
            Create account
          </button>
        )}

        {/* Mobile Hamburger Icon */}
        <button onClick={() => setShowMenu(true)} className="w-6 md:hidden text-gray-700">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Mobile Menu Side Drawer */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-30 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12H15M12 9V15M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight text-gray-800">Prescripto</span>
            </div>
            <button onClick={() => setShowMenu(false)} className="w-7 text-gray-600">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-4 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <span className="px-4 py-2 rounded inline-block">HOME</span>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <span className="px-4 py-2 rounded inline-block">ALL DOCTORS</span>
            </NavLink>
            <a onClick={() => setShowMenu(false)} href="#footer" className="px-4 py-2 rounded inline-block text-gray-600">
              ABOUT
            </a>
            <a onClick={() => setShowMenu(false)} href="#footer" className="px-4 py-2 rounded inline-block text-gray-600">
              CONTACT
            </a>
            {!token && (
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/login");
                }}
                className="bg-primary text-white px-5 py-3 rounded-full mt-4 w-full text-center"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
