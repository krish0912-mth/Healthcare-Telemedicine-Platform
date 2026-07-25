# 🏥 Healthcare Telemedicine Platform

A full-stack Healthcare Telemedicine Platform built using the MERN Stack that enables patients and doctors to connect digitally. The platform supports appointment booking, secure authentication, video consultations, online payments, prescriptions, medical records, and emergency requests.

---

# 🌐 Live Demo

### Frontend
https://healthcare-telemedicine-platform-two.vercel.app/

### Backend API
https://healthcare-telemedicine-platform.onrender.com/

---

# ✨ Features

## 👤 Authentication
- Patient Registration & Login
- Doctor Registration & Login
- JWT Authentication
- Role Based Authorization

## 👨‍⚕️ Doctor Module
- Doctor Dashboard
- View Appointments
- Accept/Reject Appointments
- Write Prescriptions
- View Patient Medical Records
- Handle Emergency Requests

## 🧑 Patient Module
- Patient Dashboard
- Book Appointments
- View Appointment Status
- Online Payment
- Video Consultation
- View Prescriptions
- Manage Medical Records
- Send Emergency Requests

## 📅 Appointment Management
- Book Appointment
- Appointment Status
- Confirm Appointment
- Appointment History

## 💳 Payment
- Razorpay Integration
- Secure Payment Verification
- Payment Records

## 🎥 Video Consultation
- WebRTC Video Calling
- Socket.io Signaling
- Join Room
- End Call

## 📄 Prescription
- Doctor can create prescriptions
- Patient can view prescriptions

## 📂 Medical Records
- Add Medical Records
- Search Records
- View Report Links

## 🚨 Emergency
- Send Emergency Requests
- Doctor Accept Emergency
- Complete Emergency Request

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router
- Axios
- CSS3

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication
- JWT
- bcrypt.js

## Real Time
- Socket.io
- WebRTC

## Payment
- Razorpay

## Deployment
- Vercel
- Render

---

# 📁 Project Structure

```
Healthcare-Telemedicine-Platform
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/krish0912-mth/Healthcare-Telemedicine-Platform.git
```

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm start
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

RAZORPAY_KEY_ID=YOUR_KEY

RAZORPAY_KEY_SECRET=YOUR_SECRET
```

---

# 📸 Screenshots

- Login Page
- Register Page
- Patient Dashboard
- Doctor Dashboard
- Appointment Module
- Payment Module
- Video Call
- Medical Records
- Emergency Module

---

# 🚀 Future Enhancements

- Email Notifications
- Cloud Storage for Reports
- AI Symptom Checker
- Chat System
- Doctor Ratings
- Admin Dashboard
- Multi Language Support

---

# 👨‍💻 Author

**Krish Shrivastava**

GitHub:
https://github.com/krish0912-mth

LinkedIn:
(Add your LinkedIn Profile)

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
