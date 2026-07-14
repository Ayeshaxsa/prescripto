import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialty, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (!name || !email || !password || !specialty || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    // check if doctor email already exists
    const doctorExists = await doctorModel.findOne({ email });
    if (doctorExists) {
      return res.json({ success: false, message: "Doctor already exists with this email" });
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Upload Doctor Image" });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary or fallback to local storage
    let imageUrl = "";
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_SECRET_KEY && process.env.CLOUDINARY_NAME) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        imageUrl = imageUpload.secure_url;
        // Clean up local file after uploading to Cloudinary
        fs.unlink(imageFile.path, (err) => {
          if (err) console.error("Error deleting local file after Cloudinary upload:", err);
        });
      } catch (cloudinaryErr) {
        console.warn("Cloudinary upload failed, falling back to local file path.", cloudinaryErr);
        imageUrl = `${req.protocol}://${req.get("host")}/uploads/${imageFile.filename}`;
      }
    }
    //  else {
    //   // Local storage fallback URL
    //   imageUrl = `${req.protocol}://${req.get("host")}/uploads/${imageFile.filename}`;
    // }

    // parse address
    let parsedAddress = address;
    if (typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        // use raw string as line1 if parsing fails
        parsedAddress = { line1: address, line2: "" };
      }
    }

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      specialty,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: parsedAddress,
      date: Date.now(),
      slots_booked: {},
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment from admin panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Update cancellation status
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release slot from doctor's booked slots list
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);

    if (docData && docData.slots_booked && docData.slots_booked[slotDate]) {
      let slots_booked = docData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, changeAvailability };

