const express = require("express");

const router = express.Router();


const {

createPatientProfile,

getPatientProfile,

updatePatientProfile

} = require("../controllers/patientController");



const {

protect,

authorizeRoles

} = require("../middleware/authMiddleware");



// Create Patient Profile

router.post(

"/profile",

protect,

authorizeRoles("patient"),

createPatientProfile

);



// Get Patient Profile
router.get("/test",(req,res)=>{

res.json({
message:"Patient route working"
});

});

router.get(

"/profile",

protect,

authorizeRoles("patient"),

getPatientProfile

);



// Update Patient Profile

router.put(

"/profile",

protect,

authorizeRoles("patient"),

updatePatientProfile

);



module.exports = router;