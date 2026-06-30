const express = require("express");

const router = express.Router();


const {

createVideoSession,

getVideoSession,

getVideoSessionByAppointment,

endVideoSession

} = require("../controllers/videoController");



const {

protect

} = require("../middleware/authMiddleware");




// Create Video Session

router.post(

"/create",

protect,

createVideoSession

);

// Get Video Session By Appointment

router.get(

"/appointment/:appointmentId",

protect,

getVideoSessionByAppointment

);


// Get Video Session

router.get(

"/:roomId",

protect,

getVideoSession

);




// End Video Session

router.put(

"/end/:id",

protect,

endVideoSession

);



module.exports = router;