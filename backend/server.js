const http = require("http");
const { Server } = require("socket.io");

const express = require("express");
const cors = require("cors");
const path = require("path");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const connectDB = require("./config/db");


// Routes

const authRoutes = require("./routes/authRoutes");

const doctorRoutes = require("./routes/doctorRoutes");

const patientRoutes = require("./routes/patientRoutes");

const appointmentRoutes = require("./routes/appointmentRoutes");

const prescriptionRoutes = require("./routes/prescriptionRoutes");

const medicalRecordRoutes = require("./routes/medicalRecordRoutes");

const emergencyRoutes = require("./routes/emergencyRoutes");

const videoRoutes = require("./routes/videoRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

// Error Middleware

const errorHandler = require("./middleware/errorMiddleware");



// Database Connection

connectDB();



// Express App

const app = express();



// HTTP Server for Socket.io

const server = http.createServer(app);



// Socket.io Setup

const io = new Server(server,{

cors:{

origin:"*",

methods:["GET","POST"]

}

});



// Security Middleware

app.use(helmet());



// Basic Middleware

app.use(cors());

app.use(express.json());
app.use(

"/uploads",

express.static(

path.join(__dirname,"uploads")

)

);



// Rate Limiter

const limiter = rateLimit({

windowMs:15*60*1000,

max:100,

message:"Too many requests, try again later"

});


app.use(limiter);



// API Routes

app.use("/api/auth",authRoutes);

app.use("/api/doctors",doctorRoutes);

app.use("/api/patients",patientRoutes);

app.use("/api/appointments",appointmentRoutes);

app.use("/api/prescriptions",prescriptionRoutes);

app.use("/api/records",medicalRecordRoutes);

app.use("/api/emergency",emergencyRoutes);

app.use("/api/video",videoRoutes);

app.use("/api/payment",paymentRoutes);



// Test Route

app.get("/",(req,res)=>{

res.send("Healthcare API Running");

});



app.get("/api/test",(req,res)=>{

res.json({

message:"Frontend Backend Connection Successful"

});

});



// Socket.io Events

io.on("connection",(socket)=>{


console.log("User Connected:",socket.id);



socket.on("join-room",(roomId)=>{

socket.join(roomId);

console.log("User joined room:",roomId);

});



socket.on("offer",(data)=>{
console.log("Offer Received:",data);
socket.to(data.roomId).emit(
"offer",
data.offer
);

});



socket.on("answer",(data)=>{
console.log("Answer Received:",data);
socket.to(data.roomId).emit(
"answer",
data.answer
);

});



socket.on("ice-candidate",(data)=>{

socket.to(data.roomId).emit(
"ice-candidate",
data.candidate
);

});



socket.on("disconnect",()=>{

console.log("User disconnected");

});


});



// Global Error Handler

app.use(errorHandler);



// Server Start

const PORT = process.env.PORT || 5000;


server.listen(PORT,()=>{

console.log("Server started with Socket.io");

});