const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({

patient:{

type: mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


appointment:{

type: mongoose.Schema.Types.ObjectId,

ref:"Appointment",

required:true

},


amount:{

type:Number,

required:true

},


paymentId:{

type:String

},


orderId:{

type:String

},


status:{

type:String,

enum:["pending","success","failed"],

default:"pending"

}


},
{
timestamps:true
}

);


module.exports = mongoose.model(
"Payment",
paymentSchema
);