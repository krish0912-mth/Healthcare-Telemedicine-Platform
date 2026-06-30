const express = require("express");

const router = express.Router();


const {

bookAppointment,

getPatientAppointments,

getDoctorAppointments,

updateAppointmentStatus

} = require("../controllers/appointmentController");



const {

protect,

authorizeRoles

} = require("../middleware/authMiddleware");



// Book Appointment (Patient)

router.post(

"/",

protect,

authorizeRoles("patient"),

bookAppointment

);



// Get Patient Appointments

router.get(

"/patient",

protect,

authorizeRoles("patient"),

getPatientAppointments

);



// Get Doctor Appointments

router.get(

"/doctor",

protect,

authorizeRoles("doctor"),

getDoctorAppointments

);



// Update Appointment Status (Doctor)

router.put(

"/:id/status",

protect,

authorizeRoles("doctor"),

updateAppointmentStatus

);



module.exports = router;