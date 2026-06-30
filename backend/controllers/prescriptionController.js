const Prescription = require("../models/Prescription");


// Create Prescription (Doctor)

const createPrescription = async(req,res)=>{

try{

const {

patient,
appointment,
medicines,
instructions

}=req.body;


const prescription = await Prescription.create({

doctor:req.user._id,

patient,

appointment,

medicines,

instructions,

prescriptionFile:req.file
?
req.file.path
:
null


});


res.status(201).json({

message:"Prescription created successfully",

prescription

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};



// Get Patient Prescriptions

const getPatientPrescriptions = async(req,res)=>{

try{


const prescriptions = await Prescription.find({

patient:req.user._id

})
.populate("doctor","name email")
.populate("appointment");


res.json(prescriptions);


}

catch(error){

res.status(500).json({

message:error.message

});

}

};



// Get Doctor Prescriptions

const getDoctorPrescriptions = async(req,res)=>{

try{


const prescriptions = await Prescription.find({

doctor:req.user._id

})
.populate("patient","name email")
.populate("appointment");


res.json(prescriptions);


}

catch(error){

res.status(500).json({

message:error.message

});

}

};



module.exports={

createPrescription,

getPatientPrescriptions,

getDoctorPrescriptions

};