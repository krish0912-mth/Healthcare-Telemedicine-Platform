const mongoose = require("mongoose");


const medicalRecordSchema = new mongoose.Schema({

patient:{

type: mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},


title:{

type:String,

required:true

},


description:{

type:String,

required:true

},


reportFile:{

type:String

}


},
{
timestamps:true
}

);


module.exports = mongoose.model(
"MedicalRecord",
medicalRecordSchema
);