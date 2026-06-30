const Razorpay = require("razorpay");
const crypto = require("crypto");

const Payment = require("../models/Payment");


// Razorpay instance

const razorpay = new Razorpay({

key_id:process.env.RAZORPAY_KEY_ID,

key_secret:process.env.RAZORPAY_KEY_SECRET

});



// Create Payment Order

const createOrder = async(req,res)=>{

try{


const {

appointment,

amount

}=req.body;



const order = await razorpay.orders.create({

amount: amount * 100,

currency:"INR"

});



const payment = await Payment.create({

patient:req.user._id,

appointment,

amount,

orderId:order.id

});



res.status(201).json({

message:"Order created",

order,

payment

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// Verify Payment

const verifyPayment = async(req,res)=>{

try{


const {

razorpay_order_id,

razorpay_payment_id,

razorpay_signature

}=req.body;



const sign = razorpay_order_id + "|" + razorpay_payment_id;



const expectedSign = crypto

.createHmac(
"sha256",
process.env.RAZORPAY_KEY_SECRET
)

.update(sign.toString())

.digest("hex");




if(expectedSign !== razorpay_signature){

return res.status(400).json({

message:"Invalid payment"

});

}



const payment = await Payment.findOneAndUpdate(

{orderId:razorpay_order_id},

{

paymentId:razorpay_payment_id,

status:"success"

},

{new:true}

);



res.json({

message:"Payment verified",

payment

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




module.exports={

createOrder,

verifyPayment

};