const MedicalRecord = require("../models/MedicalRecord");


// Add Medical Record (Patient)

const addMedicalRecord = async(req,res)=>{

try{


const {

title,

description,

reportFile

}=req.body;



const record = await MedicalRecord.create({

patient:req.user._id,

title,

description,

reportFile

});


res.status(201).json({

message:"Medical record added successfully",

record

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// Get Patient Own Records

const getPatientRecords = async(req,res)=>{

try{


const records = await MedicalRecord.find({

patient:req.user._id

});


res.json(records);


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// Doctor View Patient Records

const getRecordsByPatientId = async(req,res)=>{

try{


const records = await MedicalRecord.find({

patient:req.params.patientId

}).populate("patient","name email");


res.json(records);


}

catch(error){

res.status(500).json({

message:error.message

});

}

};



module.exports={

addMedicalRecord,

getPatientRecords,

getRecordsByPatientId

};