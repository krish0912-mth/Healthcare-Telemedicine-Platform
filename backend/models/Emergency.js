const mongoose = require("mongoose");


const emergencySchema = new mongoose.Schema({

patient:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


problem:{

type:String,

required:true

},


priority:{

type:String,

enum:["low","medium","high"],

default:"high"

},


status:{

type:String,

enum:["pending","accepted","completed"],

default:"pending"

},


doctor:{

type:mongoose.Schema.Types.ObjectId,

ref:"User"

}


},
{
timestamps:true
}

);


module.exports = mongoose.model(
"Emergency",
emergencySchema
);