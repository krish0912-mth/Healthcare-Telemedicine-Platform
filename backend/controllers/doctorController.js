const User=require("../models/User");
const Doctor = require("../models/Doctor");


// Create Doctor Profile

const createDoctorProfile = async(req,res)=>{

try{

const {
specialization,
experience,
qualification,
fees

}=req.body;


const doctor = await Doctor.create({

user:req.user._id,

specialization,

experience,

qualification,

fees

});


res.status(201).json({

message:"Doctor profile created",

doctor

});


}
catch(error){

res.status(500).json({

message:"Server Error"

});

}


};



// Get All Doctors

const getAllDoctors = async(req,res)=>{

try{

const doctors = await Doctor.find()
.populate("user","name email");


res.json(doctors);


}
catch(error){

res.status(500).json({

message:"Server Error"

});

}


};
// Get Single Doctor

const getDoctorById = async(req,res)=>{

try{

const doctor = await Doctor.findById(req.params.id)
.populate("user","name email");


if(!doctor){

return res.status(404).json({
message:"Doctor not found"
});

}


res.json(doctor);


}
catch(error){

res.status(500).json({
message:"Server Error"
});

}


};



const updateDoctorProfile = async(req,res)=>{

try{


const doctor = await Doctor.findOne({
user:req.user._id
});


if(!doctor){

return res.status(404).json({
message:"Doctor profile not found"
});

}


// update User details

const user = await User.findById(req.user._id);


user.name = req.body.name || user.name;

user.email = req.body.email || user.email;


await user.save();


// update Doctor details

doctor.specialization = req.body.specialization || doctor.specialization;

doctor.experience = req.body.experience || doctor.experience;

doctor.qualification = req.body.qualification || doctor.qualification;

doctor.fees = req.body.fees || doctor.fees;


const updatedDoctor = await doctor.save();


res.json({

message:"Doctor profile updated",

user,

doctor:updatedDoctor

});


}

catch(error){

res.status(500).json({
message:"Server Error"
});

}

};
// Get Logged In Doctor Profile

const getDoctorProfile = async(req,res)=>{

try{

const doctor = await Doctor.findOne({

user:req.user._id

}).populate("user","name email");


if(!doctor){

return res.status(404).json({

message:"Doctor profile not found"

});

}


res.status(200).json({

doctor

});


}

catch(error){

res.status(500).json({

message:"Server Error"

});

}

};
module.exports = {

createDoctorProfile,
getDoctorProfile,
getAllDoctors,
getDoctorById,
updateDoctorProfile
};