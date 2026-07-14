import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import appointmentModel from "../models/appointmentModel.js";

// Create Razorpay Order
const createPaymentOrder = async (req, res) => {
  try {
    const { appointmentId, userId } = req.body;

    // Find appointment
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check appointment belongs to user
    if (appointment.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Prevent duplicate payments
    if (appointment.payment) {
      return res.json({
        success: false,
        message: "Appointment already paid",
      });
    }

    // Create Razorpay Order
    const options = {
      amount: appointment.amount * 100, // Razorpay accepts paise
      currency: "INR",
      receipt: appointment._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    // Save Razorpay Order ID
    appointment.razorpayOrderId = order.id;
    await appointment.save();

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Razorpay Payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
    } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Ensure the order belongs to this appointment
    if (appointment.razorpayOrderId !== razorpay_order_id) {
      return res.json({
        success: false,
        message: "Order mismatch",
      });
    }

    // Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Update appointment after successful payment
    appointment.payment = true;
    appointment.status = "confirmed";
    appointment.razorpayPaymentId = razorpay_payment_id;

    await appointment.save();

    res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { createPaymentOrder, verifyPayment };