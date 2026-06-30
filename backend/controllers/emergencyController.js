const Emergency = require("../models/Emergency");


// Create Emergency Request (Patient)

const createEmergency = async(req,res)=>{

try{

const {

problem,
priority

}=req.body;


const emergency = await Emergency.create({

patient:req.user._id,

problem,

priority

});


res.status(201).json({

message:"Emergency request created successfully",

emergency

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// Get All Emergency Requests (Doctor)

const getEmergencies = async(req,res)=>{

try{


const emergencies = await Emergency.find()

.populate("patient","name email");


res.json(emergencies);


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// Accept Emergency (Doctor)

const acceptEmergency = async(req,res)=>{

try{


const emergency = await Emergency.findById(
req.params.id
);


if(!emergency){

return res.status(404).json({

message:"Emergency request not found"

});

}


emergency.status = "accepted";

emergency.doctor = req.user._id;


await emergency.save();


res.json({

message:"Emergency accepted",

emergency

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};

// Complete Emergency (Doctor)

const completeEmergency = async(req,res)=>{

try{

const emergency = await Emergency.findById(
req.params.id
);

if(!emergency){

return res.status(404).json({

message:"Emergency request not found"

});

}

emergency.status = "completed";

await emergency.save();

res.json({

message:"Emergency completed",

emergency

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

};
module.exports={

createEmergency,

getEmergencies,

acceptEmergency,

completeEmergency

};