import { createContext } from "react";

export const AppContext = createContext();

const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AppContextProvider = (props) => {
  const currency = "$";

  // Format slot date "15_7_2026" -> "15 Jul 2026"
  const slotDateFormat = (slotDate) => {
    try {
      const dateArray = slotDate.split("_");
      return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    } catch (e) {
      return slotDate;
    }
  };

  // Calculate age from date string (YYYY-MM-DD)
  const calculateAge = (dob) => {
    try {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return isNaN(age) ? "N/A" : age;
    } catch (e) {
      return "N/A";
    }
  };

  const value = {
    currency,
    slotDateFormat,
    calculateAge,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
