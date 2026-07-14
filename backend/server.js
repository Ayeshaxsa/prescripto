import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
// import fs from "fs";
// import path from "path";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Ensure local uploads directory exists
// const uploadsDir = "./uploads";
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// Connect to Services
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Static folder serving for local image uploads
// app.use("/uploads", express.static(path.resolve(uploadsDir)));

// API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("API Working Successfully");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
