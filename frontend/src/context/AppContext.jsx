import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  // Fetch all doctors from public API
  const getDoctorsData = async () => {
    try {
      // const { data } = await axios.get(`${backendUrl}/api/user/all-doctors`);
      const { data } = await axios.get(`${backendUrl}/api/doctor/all-doctors`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Load User Profile Data
  const loadUserProfileData = async () => {
    try {
      // const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token },
      });
      console.log("PROFILE DATA:", data.userData); // add this
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Update User Profile
  const updateUserProfile = async (formData) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        loadUserProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
