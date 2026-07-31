import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

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

const EditDoctor = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { doctors, backendUrl, aToken, getAllDoctors } =
    useContext(AdminContext);

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const doc = doctors.find((item) => item._id === id);

    if (doc) {
      setDoctor(doc);
    }
  }, [id, doctors]);

  const updateDoctor = async () => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-doctor`,
        {
          docId: doctor._id,
          name: doctor.name,
          specialty: doctor.specialty,
          degree: doctor.degree,
          experience: doctor.experience,
          about: doctor.about,
          fees: doctor.fees,
          address: doctor.address,
        },
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        getAllDoctors();

        navigate("/doctor-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  if (!doctor) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl bg-white rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold mb-8">Edit Doctor Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-semibold">Doctor Name</label>

          <input
            className="border p-3 rounded-xl w-full mt-2"
            value={doctor.name}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                name: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Email</label>

          <input
            className="border p-3 rounded-xl w-full mt-2 bg-gray-100"
            value={doctor.email}
            disabled
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Specialty</label>

          <select
            className="border p-3 rounded-xl w-full mt-2 bg-white"
            value={doctor.specialty}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                specialty: e.target.value,
              })
            }
          >
            {specialtiesList.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">Experience</label>

          <select
            className="border p-3 rounded-xl w-full mt-2 bg-white"
            value={doctor.experience}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                experience: e.target.value,
              })
            }
          >
            {experienceOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Degree</label>

          <input
            className="border p-3 rounded-xl w-full mt-2"
            value={doctor.degree}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                degree: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Consultation Fees</label>

          <input
            type="number"
            className="border p-3 rounded-xl w-full mt-2"
            value={doctor.fees}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                fees: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="mt-5">
        <label>Address Line 1</label>

        <input
          className="border p-3 rounded-xl w-full mt-2"
          value={doctor.address?.line1 || ""}
          onChange={(e) =>
            setDoctor({
              ...doctor,

              address: {
                ...doctor.address,
                line1: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="mt-5">
        <label>Address Line 2</label>

        <input
          className="border p-3 rounded-xl w-full mt-2"
          value={doctor.address?.line2 || ""}
          onChange={(e) =>
            setDoctor({
              ...doctor,

              address: {
                ...doctor.address,
                line2: e.target.value,
              },
            })
          }
        />
      </div>

      <div className="mt-5">
        <label>About Doctor</label>

        <textarea
          className="border p-3 rounded-xl w-full mt-2 h-32"
          value={doctor.about}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              about: e.target.value,
            })
          }
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={updateDoctor}
          className="bg-primary text-white px-8 py-3 rounded-full"
        >
          Save Changes
        </button>

        <button
          onClick={() => navigate("/doctor-list")}
          className="border px-8 py-3 rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditDoctor;