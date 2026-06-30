const express = require("express");

const router = express.Router();


const {

createOrder,

verifyPayment

} = require("../controllers/paymentController");



const {

protect

} = require("../middleware/authMiddleware");



// Create Payment Order

router.post(

"/create-order",

protect,

createOrder

);



// Verify Payment

router.post(

"/verify",

protect,

verifyPayment

);



module.exports = router;