const express = require("express");

const router = express.Router();


const {
createDoctorProfile,
getDoctorProfile,
getAllDoctors,
getDoctorById,
updateDoctorProfile

} = require("../controllers/doctorController");


const {
protect,
authorizeRoles

} = require("../middleware/authMiddleware");



// Create Doctor Profile

router.post(

"/profile",

protect,

authorizeRoles("doctor"),

createDoctorProfile

);
router.get(

"/profile",

protect,

authorizeRoles("doctor"),

getDoctorProfile

);



// Update Doctor Profile

router.put(

"/profile",

protect,

authorizeRoles("doctor"),

updateDoctorProfile

);



// Get All Doctors

router.get(

"/",

getAllDoctors

);



// Get Single Doctor

router.get(

"/:id",

getDoctorById

);



module.exports = router;