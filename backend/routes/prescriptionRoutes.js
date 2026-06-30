const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {

createPrescription,

getPatientPrescriptions,

getDoctorPrescriptions

} = require("../controllers/prescriptionController");



const {

protect,

authorizeRoles

} = require("../middleware/authMiddleware");



// Create Prescription (Doctor)

router.post(

"/",
//
protect,

authorizeRoles("doctor"),
upload.single("prescriptionFile"),
createPrescription

);



// Patient View Prescriptions

router.get(

"/patient",

protect,

authorizeRoles("patient"),

getPatientPrescriptions

);



// Doctor View Prescriptions

router.get(

"/doctor",

protect,

authorizeRoles("doctor"),

getDoctorPrescriptions

);



module.exports = router;