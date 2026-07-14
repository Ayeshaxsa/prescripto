# Prescripto - Full-Stack Doctor Appointment Booking Platform

Prescripto is a production-grade, full-stack doctor appointment booking platform. It features role-based access control, a patient-facing scheduling catalog, a clinic manager admin dashboard, and an integrated workspace for doctors.

---

## Technical Architecture

The workspace is organized into three decoupled, high-performance directories:
1. **/backend**: Node.js + Express API server utilizing Mongoose (MongoDB) models and JWT token authentication.
2. **/frontend**: Patient portal built with Vite, React, and styled with Tailwind CSS.
3. **/admin**: Unified Admin and Doctor dashboard portal built with Vite, React, and Tailwind CSS.

---

## Key Features

- **Patient Portal**: Search doctors by specialty, review profiles, book 30-minute consultation slots over a rolling 7-day schedule, cancel appointments, and simulate payments.
- **Admin Panel**: Manage doctor directories (add/edit profiles), toggle doctor active statuses, review global system bookings, and read analytics charts.
- **Doctor Workspace**: View custom schedules, mark consultations as completed, cancel slots, track consultation fee earnings, and manage clinic operational hours.
- **Fallback Media Store**: Auto-detects whether Cloudinary keys are configured in environment variables. If missing, it automatically stores uploaded doctor and patient photos in a local static directory.

---

## Prerequisites

Ensure you have the following installed locally:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)
- **MongoDB** (Ensure a local instance is running on `mongodb://127.0.0.1:27017` or prepare a MongoDB Atlas connection string)

---

## Quick Start Setup

### Step 1: Configure Environment Variables

Create or review the backend configurations in `/backend/.env`:
```env
MONGODB_URI="mongodb://127.0.5.1:27017"
PORT=4000
JWT_SECRET="prescripto_jwt_secret_token"

# Admin Credentials
ADMIN_EMAIL="admin@prescripto.com"
ADMIN_PASSWORD="adminPassword123"

# Cloudinary Integration (Optional)
CLOUDINARY_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_SECRET_KEY=""
```


---

### Step 2: Running the Application Locally

You can launch each service by opening separate terminals and executing the following commands:

#### 1. Start the Backend API
```bash
cd backend
npm run server
```
*Starts the API server on [http://localhost:4000](http://localhost:4000)*

#### 2. Start the Admin & Doctor Dashboard
```bash
cd admin
npm run dev
```
*Starts the admin interface on [http://localhost:5173](http://localhost:5173) or similar*

#### 3. Start the Patient Portal
```bash
cd frontend
npm run dev
```
*Starts the patient client on [http://localhost:5173](http://localhost:5173) or similar*

---

## Test Credentials

### 1. Admin Login
Navigate to the Admin Panel and login with:
- **Email**: `admin@prescripto.com`
- **Password**: `adminPassword123`

### 2. Doctor Login
1. Log in as **Admin** first.
2. Click **Add Doctor** and fill in the details (e.g., name, specialty, password).
3. Log out and switch the login tab to **Doctor**.
4. Log in using the email and password you just registered for the doctor.

### 3. Patient Login
Navigate to the Patient Portal, click **Create account**, register a new account on the form, and sign in.
