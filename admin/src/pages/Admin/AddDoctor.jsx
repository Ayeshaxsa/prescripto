import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const specialtiesList = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Gastroenterologist",
];

const experienceOptions = [
  "1 Year",
  "2 Years",
  "3 Years",
  "4 Years",
  "5 Years",
  "6 Years",
  "7 Years",
  "8 Years",
  "9 Years",
  "10+ Years",
];

const AddDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [specialty, setSpecialty] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) {
      return toast.warning("Please upload a doctor profile photo.");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("specialty", specialty);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);
      formData.append("image", docImg);

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset state
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm mx-auto">
      <h2 className="text-xl font-bold text-gray-800 border-b border-gray-50 pb-4 mb-6">Add New Doctor Profile</h2>

      <div className="flex flex-col gap-8">
        {/* Photo Upload */}
        <div className="flex items-center gap-4">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-primary bg-gray-50/50 flex flex-col items-center justify-center overflow-hidden transition-smooth text-gray-400">
              {docImg ? (
                <img className="w-full h-full object-cover" src={URL.createObjectURL(docImg)} alt="" />
              ) : (
                <>
                  <svg className="w-8 h-8 group-hover:text-primary transition-smooth" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] font-semibold uppercase mt-1">Upload</span>
                </>
              )}
            </div>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
          </label>
          <div>
            <p className="text-sm font-bold text-gray-700">Doctor Photo</p>
            <p className="text-xs text-gray-400 mt-1 font-light">Supported formats: JPG, PNG. Max size 2MB.</p>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-gray-150 rounded-xl p-3 w-full focus:outline-none focus:border-primary transition-smooth"
                type="text"
                placeholder="Dr. John Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Doctor Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-gray-150 rounded-xl p-3 w-full focus:outline-none focus:border-primary transition-smooth"
                type="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Account Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-gray-150 rounded-xl p-3 w-full focus:outline-none focus:border-primary transition-smooth"
                type="password"
                placeholder="Minimum 8 characters"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Years Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border border-gray-150 rounded-xl p-3 bg-white w-full focus:outline-none focus:border-primary transition-smooth"
              >
                {experienceOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Consultation Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border border-gray-150 rounded-xl p-3 w-full focus:outline-none focus:border-primary transition-smooth"
                type="number"
                placeholder="Consultation pricing"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Specialization</label>
              <select
                onChange={(e) => setSpecialty(e.target.value)}
                value={specialty}
                className="border border-gray-150 rounded-xl p-3 bg-white w-full focus:outline-none focus:border-primary transition-smooth"
              >
                {specialtiesList.map((spec, i) => (
                  <option key={i} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Education Degrees</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border border-gray-150 rounded-xl p-3 w-full focus:outline-none focus:border-primary transition-smooth"
                type="text"
                placeholder="e.g. MBBS, MD, PhD"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-gray-600">Clinic Address</label>
              <div className="flex flex-col gap-2">
                <input
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  className="border border-gray-150 rounded-xl p-3 w-full focus:outline-none focus:border-primary transition-smooth"
                  type="text"
                  placeholder="Street Line 1"
                  required
                />
                <input
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  className="border border-gray-150 rounded-xl p-3 w-full focus:outline-none focus:border-primary transition-smooth"
                  type="text"
                  placeholder="Suite/Apartment Line 2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bio description */}
        <div className="flex flex-col gap-1.5 text-sm">
          <label className="font-semibold text-gray-600">Biography / About</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="border border-gray-150 rounded-xl p-3 w-full h-32 focus:outline-none focus:border-primary transition-smooth resize-none"
            placeholder="A brief introduction highlighting experience, skills, and background details..."
            required
          />
        </div>

        {/* Register Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-primary hover:bg-opacity-95 text-white px-10 py-3.5 rounded-full text-sm font-semibold transition-smooth shadow-md shadow-primary/20"
          >
            Register Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
