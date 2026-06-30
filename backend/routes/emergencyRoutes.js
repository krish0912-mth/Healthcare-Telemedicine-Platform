const express = require("express");

const router = express.Router();


const {

createEmergency,

getEmergencies,

acceptEmergency,

completeEmergency

} = require("../controllers/emergencyController");



const {

protect,

authorizeRoles

} = require("../middleware/authMiddleware");




// Create Emergency Request (Patient)

router.post(

"/",

protect,

authorizeRoles("patient"),

createEmergency

);




// Get All Emergencies (Doctor)

router.get(

"/",

protect,

authorizeRoles("doctor"),

getEmergencies

);




// Accept Emergency (Doctor)

router.put(

"/:id/accept",

protect,

authorizeRoles("doctor"),

acceptEmergency

);

// Complete Emergency (Doctor)

router.put(
    "/:id/complete",
    protect,
    authorizeRoles("doctor"),
    completeEmergency
);

module.exports = router;