const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({

user:{

type: mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


specialization:{

type:String,

required:true

},


experience:{

type:String,

required:true

},


qualification:{

type:String,

required:true

},


fees:{

type:Number,

required:true

},


availability:{

type:Boolean,

default:true

}


},
{
timestamps:true
}

);


module.exports = mongoose.model(
"Doctor",
doctorSchema
);