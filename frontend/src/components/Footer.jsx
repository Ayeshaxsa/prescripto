import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div id="footer" className="md:mx-10 border-t border-gray-100 pt-16 pb-12 mt-20 text-sm">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10">
        {/* Left Section */}
        <div>
          <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer mb-5">
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
          <p className="w-full md:w-2/3 text-gray-500 leading-relaxed font-light">
            Prescripto is a modern, full-stack doctor appointment booking platform designed to connect patients with
            licensed healthcare providers instantly. Browse profiles, check schedules, and book slots in under a minute.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-gray-900 font-semibold mb-5 text-base">COMPANY</p>
          <ul className="flex flex-col gap-2.5 text-gray-500 font-light">
            <li onClick={() => { navigate("/"); window.scrollTo(0,0); }} className="hover:text-primary cursor-pointer transition-smooth">Home</li>
            <li onClick={() => { navigate("/doctors"); window.scrollTo(0,0); }} className="hover:text-primary cursor-pointer transition-smooth">All Doctors</li>
            <li className="hover:text-primary cursor-pointer transition-smooth">About Us</li>
            <li className="hover:text-primary cursor-pointer transition-smooth">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-gray-900 font-semibold mb-5 text-base">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2.5 text-gray-500 font-light">
            <li className="hover:text-primary cursor-pointer transition-smooth">+1-212-456-7890</li>
            <li className="hover:text-primary cursor-pointer transition-smooth">support@prescripto.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div>
        <hr className="border-gray-100" />
        <p className="py-5 text-center text-xs text-gray-400 font-light">
          Copyright © 2026 Prescripto - All Rights Reserved. Built as a high-performance web experience.
        </p>
      </div>
    </div>
  );
};

export default Footer;
