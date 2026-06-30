const Appointment = require("../models/Appointment");


// Book Appointment (Patient)

const bookAppointment = async(req,res)=>{

try{

const {

doctor,
appointmentDate,
appointmentTime,
reason

}=req.body;


const appointment = await Appointment.create({

patient:req.user._id,

doctor,

appointmentDate,

appointmentTime,

reason

});


res.status(201).json({

message:"Appointment booked successfully",

appointment

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};



// Get Patient Appointments

const getPatientAppointments = async(req,res)=>{

try{


const appointments = await Appointment.find({

patient:req.user._id

}).populate("doctor","name email");


res.json(appointments);


}

catch(error){

res.status(500).json({

message:"Server Error"

});

}

};



// Get Doctor Appointments

const getDoctorAppointments = async(req,res)=>{

try{


const appointments = await Appointment.find({

doctor:req.user._id

}).populate("patient","name email");


res.json(appointments);


}

catch(error){

res.status(500).json({

message:"Server Error"

});

}

};



// Update Appointment Status

const updateAppointmentStatus = async(req,res)=>{

try{


const appointment = await Appointment.findById(
req.params.id
);


if(!appointment){

return res.status(404).json({

message:"Appointment not found"

});

}


appointment.status = req.body.status;


const updatedAppointment = await appointment.save();


res.json({

message:"Appointment status updated",

appointment:updatedAppointment

});


}

catch(error){

res.status(500).json({

message:"Server Error"

});

}

};



module.exports={

bookAppointment,

getPatientAppointments,

getDoctorAppointments,

updateAppointmentStatus

};