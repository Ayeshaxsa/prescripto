import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, backendUrl } = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [fees, setFees] = useState("");
  const [available, setAvailable] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const updateProfile = async () => {
    try {
      const updateData = {
        fees: Number(fees),
        address: JSON.stringify({ line1: address1, line2: address2 }),
        available,
      };

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
        headers: { dToken },
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees);
      setAvailable(profileData.available);
      setAddress1(profileData.address.line1);
      setAddress2(profileData.address.line2 || "");
    }
  }, [profileData]);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white border border-gray-100 p-8 rounded-2xl shadow-sm mx-auto">
      {/* Doctor Meta Info */}
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 border-b border-gray-50 pb-6 mb-6">
        <div className="w-24 h-24 rounded-2xl bg-blue-50/50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100/50">
          {profileData.image ? (
            <img className="w-full h-full object-cover" src={profileData.image} alt={profileData.name} />
          ) : (
            <div className="text-primary font-bold text-3xl">{profileData.name.charAt(0).toUpperCase()}</div>
          )}
        </div>

        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
            <span className="bg-primary/10 text-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider w-fit mx-auto sm:mx-0">
              {profileData.specialty}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">{profileData.degree} • {profileData.experience} Experience</p>
          <p className="text-xs text-gray-400 font-light">{profileData.email}</p>
        </div>
      </div>

      {/* Editable details */}
      <div className="space-y-6 text-sm">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Professional Bio</h3>
          <p className="text-gray-600 leading-relaxed font-light">{profileData.about}</p>
        </div>

        <div className="border-t border-gray-50 pt-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Consultation Parameters</h3>

          <div className="grid grid-cols-[1.5fr_3.5fr] gap-y-4 items-center">
            <p className="font-semibold text-gray-500">Consultation Fee:</p>
            {isEdit ? (
              <input
                className="border border-gray-150 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary transition-smooth max-w-xs"
                type="number"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            ) : (
              <p className="text-gray-900 font-bold">${fees}</p>
            )}

            <p className="font-semibold text-gray-500">Clinic Location:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2 max-w-sm">
                <input
                  className="border border-gray-150 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary transition-smooth"
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  type="text"
                  placeholder="Street Line 1"
                />
                <input
                  className="border border-gray-150 rounded-xl px-3 py-1.5 focus:outline-none focus:border-primary transition-smooth"
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  type="text"
                  placeholder="Suite/Apartment Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {address1} {address2 && <><br />{address2}</>}
              </p>
            )}

            <p className="font-semibold text-gray-500">Availability:</p>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => (isEdit ? setAvailable(e.target.checked) : null)}
                type="checkbox"
                checked={available}
                disabled={!isEdit}
                id="profile-avail"
                className="rounded text-primary focus:ring-primary w-4.5 h-4.5 accent-primary cursor-pointer disabled:cursor-not-allowed"
              />
              <label htmlFor="profile-avail" className="text-xs font-semibold text-gray-600 cursor-pointer select-none">
                {available ? "Accepting Patient Appointments" : "Temporarily Offline / Closed"}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger Buttons */}
      <div className="flex justify-center mt-10">
        {isEdit ? (
          <button
            onClick={updateProfile}
            className="bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-opacity-95 transition-smooth shadow-md shadow-primary/20"
          >
            Save Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-smooth shadow-sm"
          >
            Modify Settings
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
