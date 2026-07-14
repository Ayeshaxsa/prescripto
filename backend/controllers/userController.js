import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import fs from "fs";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    // check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists with this email" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, gender, dob } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let parsedAddress = address;
    if (typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        parsedAddress = { line1: address, line2: "" };
      }
    }

    // update details
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      gender,
      dob,
    });

    if (imageFile) {
      // upload image to cloudinary or local static serving fallback
      let imageUrl = "";
      if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_SECRET_KEY && process.env.CLOUDINARY_NAME) {
        try {
          const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
          imageUrl = imageUpload.secure_url;
          // Clean up local temp file
          fs.unlink(imageFile.path, (err) => {
            if (err) console.error("Error deleting local file:", err);
          });
        } catch (cloudinaryErr) {
          console.warn("Cloudinary upload failed, falling back to local file path.", cloudinaryErr);
          imageUrl = `${req.protocol}://${req.get("host")}/uploads/${imageFile.filename}`;
        }
      } else {
        imageUrl = `${req.protocol}://${req.get("host")}/uploads/${imageFile.filename}`;
      }

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    console.log("USER ID:", userId);
    console.log("DOC ID:", docId);
    console.log("DATE:", slotDate);
    console.log("TIME:", slotTime);

    if (!userId) {
      return res.json({
        success: false,
        message: "User ID missing",
      });
    }

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available currently" });
    }

    let slots_booked = docData.slots_booked || {};

    // check if slot is already booked
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res.json({
        success: false,
        message: "User data not found",
      });
    }

    // Clear password from docData before snapshotting
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      payment: false,
      status: "pending",
      date: Date.now(),
    };

    // const newAppointment = new appointmentModel(appointmentData);
    // await newAppointment.save();

    // // update doctor's booked slots
    // await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // res.json({ success: true, message: "Appointment Booked" });

    console.log("USER ID:", userId);
    console.log("USER DATA:", userData);
    console.log("DOC ID:", docId);

    const newAppointment = new appointmentModel(appointmentData);
    const appointment = await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment Created",
      appointmentId: appointment._id,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.payment) {
      return res.json({
        success: false,
        message:
          "This appointment has already been paid for. Please contact the admin to cancel it.",
      });
    }

    // verify authorization
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      status: "cancelled",
      razorpayPaymentId: razorpay_payment_id,
    });

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

// API to simulate online payment
// const paymentSimulation = async (req, res) => {
//   try {
//     const { userId, appointmentId } = req.body;

//     const appointmentData = await appointmentModel.findById(appointmentId);

//     if (!appointmentData) {
//       return res.json({ success: false, message: "Appointment not found" });
//     }

//     if (appointmentData.userId !== userId) {
//       return res.json({ success: false, message: "Unauthorized Action" });
//     }

//     // Here, you would integrate Stripe or Razorpay SDKs
//     // Example Stripe implementation hook:
//     // const paymentIntent = await stripe.paymentIntents.create({ amount: appointmentData.amount * 100, currency: 'usd' });
//     // For now, we perform a simulated success transaction updating the database directly.
//     await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });

//     res.json({ success: true, message: "Payment Successful (Simulated)" });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  // paymentSimulation,
};
