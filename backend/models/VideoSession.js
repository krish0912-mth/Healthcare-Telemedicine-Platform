const mongoose = require("mongoose");


const videoSessionSchema = new mongoose.Schema({

appointment:{

type: mongoose.Schema.Types.ObjectId,

ref:"Appointment",

required:true

},


doctor:{

type: mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


patient:{

type: mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


roomId:{

type:String,

required:true

},


status:{

type:String,

enum:["active","ended"],

default:"active"

}


},
{
timestamps:true
}

);


module.exports = mongoose.model(
"VideoSession",
videoSessionSchema
);