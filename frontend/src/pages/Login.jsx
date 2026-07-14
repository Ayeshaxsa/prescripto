import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account Created Successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login Successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border border-gray-100 rounded-2xl shadow-lg bg-white relative overflow-hidden">
        {/* Top Gradient Decorative Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>

        <p className="text-2xl font-bold text-gray-800">{state === "Sign Up" ? "Create Account" : "Welcome Back"}</p>
        <p className="text-gray-400 text-xs font-light leading-relaxed">
          Please {state === "Sign Up" ? "sign up" : "login"} to book an appointment with our specialists.
        </p>

        {state === "Sign Up" && (
          <div className="w-full mt-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
            <input
              className="border border-gray-150 rounded-xl p-3 w-full mt-1.5 focus:outline-none focus:border-primary text-sm transition-smooth"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="John Doe"
              required
            />
          </div>
        )}

        <div className="w-full">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
          <input
            className="border border-gray-150 rounded-xl p-3 w-full mt-1.5 focus:outline-none focus:border-primary text-sm transition-smooth"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="johndoe@example.com"
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
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-sm text-gray-500 text-center mt-2">
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer font-semibold">
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-500 text-center mt-2">
            New to Prescripto?{" "}
            <span onClick={() => setState("Sign Up")} className="text-primary underline cursor-pointer font-semibold">
              Create one now
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
