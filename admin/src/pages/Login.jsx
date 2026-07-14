import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin Authentication Successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor Login Successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="flex flex-col gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border border-gray-150 rounded-2xl shadow-xl bg-white relative overflow-hidden">
        {/* Dynamic header highlights */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>

        {/* State Toggle Tabs */}
        <div className="flex border-b border-gray-100 mb-2">
          <button
            type="button"
            onClick={() => {
              setState("Admin");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 pb-3 text-sm font-semibold uppercase tracking-wider transition-smooth ${
              state === "Admin" ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => {
              setState("Doctor");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 pb-3 text-sm font-semibold uppercase tracking-wider transition-smooth ${
              state === "Doctor" ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Doctor
          </button>
        </div>

        <p className="text-xl font-bold text-gray-800 text-center mt-2">
          {state === "Admin" ? "Admin Portal Access" : "Doctor Workspace"}
        </p>

        <div className="w-full mt-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
          <input
            className="border border-gray-150 rounded-xl p-3 w-full mt-1.5 focus:outline-none focus:border-primary text-sm transition-smooth"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="workspace@prescripto.com"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
          <input
            className="border border-gray-150 rounded-xl p-3 w-full mt-1.5 focus:outline-none focus:border-primary text-sm transition-smooth"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-3 rounded-full text-sm font-semibold hover:bg-opacity-95 transition-smooth shadow-md shadow-primary/20 mt-4"
        >
          Login Account
        </button>
      </div>
    </form>
  );
};

export default Login;
