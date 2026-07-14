import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, token, setUserData, loadUserProfileData, backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-xl bg-white border border-gray-100 p-8 rounded-2xl shadow-sm mt-5 mx-auto">
      {/* Profile Picture */}
      <div className="flex flex-col items-center gap-4 border-b border-gray-50 pb-6 mb-6">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer group relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary relative flex items-center justify-center bg-gray-50">
              {image ? (
                <img className="w-full h-full object-cover" src={URL.createObjectURL(image)} alt="" />
              ) : userData.image ? (
                <img className="w-full h-full object-cover" src={userData.image} alt="" />
              ) : (
                <div className="text-gray-400 text-3xl font-bold">{userData.name.charAt(0).toUpperCase()}</div>
              )}
              {/* Overlay hover effect */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
          </label>
        ) : (
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-100 flex items-center justify-center bg-gray-50">
            {userData.image ? (
              <img className="w-full h-full object-cover" src={userData.image} alt="" />
            ) : (
              <div className="text-gray-400 text-3xl font-bold">{userData.name.charAt(0).toUpperCase()}</div>
            )}
          </div>
        )}

        {isEdit ? (
          <input
            className="text-2xl font-bold text-center border border-gray-150 rounded-xl p-2 max-w-sm focus:outline-none focus:border-primary transition-smooth"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-2xl font-bold text-gray-800">{userData.name}</p>
        )}
      </div>

      {/* Profile details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Contact Information</h3>
          <div className="grid grid-cols-[1fr_3fr] gap-y-3.5 text-sm">
            <p className="font-semibold text-gray-500">Email:</p>
            <p className="text-gray-700">{userData.email}</p>

            <p className="font-semibold text-gray-500">Phone:</p>
            {isEdit ? (
              <input
                className="border border-gray-150 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary transition-smooth"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}

            <p className="font-semibold text-gray-500">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  className="border border-gray-150 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary transition-smooth"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                  }
                  value={userData.address.line1}
                  type="text"
                  placeholder="Address Line 1"
                />
                <input
                  className="border border-gray-150 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary transition-smooth"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                  }
                  value={userData.address.line2}
                  type="text"
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Basic Information</h3>
          <div className="grid grid-cols-[1fr_3fr] gap-y-3.5 text-sm">
            <p className="font-semibold text-gray-500">Gender:</p>
            {isEdit ? (
              <select
                className="border border-gray-150 rounded-xl px-3 py-1.5 bg-white focus:outline-none focus:border-primary transition-smooth"
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}

            <p className="font-semibold text-gray-500">Birthday:</p>
            {isEdit ? (
              <input
                className="border border-gray-150 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary transition-smooth"
                type="date"
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        {isEdit ? (
          <button
            onClick={updateProfileData}
            className="bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-opacity-95 transition-smooth shadow-md shadow-primary/20"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-smooth shadow-sm"
          >
            Edit Settings
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
