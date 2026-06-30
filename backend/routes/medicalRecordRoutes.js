const express = require("express");

const router = express.Router();


const {

addMedicalRecord,

getPatientRecords,

getRecordsByPatientId

} = require("../controllers/medicalRecordController");



const {

protect,

authorizeRoles

} = require("../middleware/authMiddleware");




// Add Medical Record (Patient)

router.post(

"/",

protect,

authorizeRoles("patient"),

addMedicalRecord

);




// Patient View Own Records

router.get(

"/patient",

protect,

authorizeRoles("patient"),

getPatientRecords

);




// Doctor View Patient Records

router.get(

"/patient/:patientId",

protect,

authorizeRoles("doctor"),

getRecordsByPatientId

);



module.exports = router;