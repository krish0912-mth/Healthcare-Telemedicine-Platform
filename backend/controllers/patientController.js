const Patient = require("../models/Patient");
const User = require("../models/User");


// Create Patient Profile

const createPatientProfile = async(req,res)=>{

try{

const {
name,
age,
gender,
phone,
address,
bloodGroup,
medicalHistory

}=req.body;


const patient = await Patient.create({

user:req.user._id,

name,

age,

gender,

phone,

address,

bloodGroup,

medicalHistory

});


res.status(201).json({

message:"Patient profile created",

patient

});


}

catch(error){

res.status(500).json({

message:"Server Error"

});

}

};



// Get Patient Profile

const getPatientProfile = async(req,res)=>{

try{


const patient = await Patient.findOne({

user:req.user._id

}).populate("user","name email");


if(!patient){

return res.status(404).json({

message:"Patient profile not found"

});

}


res.json(patient);


}

catch(error){

res.status(500).json({

message:"Server Error"

});

}

};




// Update Patient Profile

const updatePatientProfile = async(req,res)=>{

try{


const patient = await Patient.findOne({

user:req.user._id

});


if(!patient){

return res.status(404).json({

message:"Patient profile not found"

});

}


// User update

const user = await User.findById(req.user._id);


user.name = req.body.name || user.name;

user.email = req.body.email || user.email;


await user.save();


// Patient update

patient.age = req.body.age || patient.age;

patient.gender = req.body.gender || patient.gender;

patient.phone = req.body.phone || patient.phone;

patient.address = req.body.address || patient.address;

patient.bloodGroup = req.body.bloodGroup || patient.bloodGroup;

patient.medicalHistory = req.body.medicalHistory || patient.medicalHistory;


const updatedPatient = await patient.save();


res.json({

message:"Patient profile updated",

user,

patient:updatedPatient

});


}

catch(error){

res.status(500).json({

message:"Server Error"

});

}

};



module.exports={

createPatientProfile,

getPatientProfile,

updatePatientProfile

};