const VideoSession = require("../models/VideoSession");


// Create Video Session

const createVideoSession = async(req,res)=>{

try{

const {

appointment,
doctor,
patient

}=req.body;


// unique room id generate

const roomId = "room_" + Date.now();


const session = await VideoSession.create({

appointment,

doctor,

patient,

roomId

});


res.status(201).json({

message:"Video session created",

session

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// Get Video Session By Room ID

const getVideoSession = async(req,res)=>{

try{


const session = await VideoSession.findOne({

roomId:req.params.roomId

})
.populate("doctor","name email")
.populate("patient","name email")
.populate("appointment");


if(!session){

return res.status(404).json({

message:"Session not found"

});

}


res.json(session);


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// End Video Session

const endVideoSession = async(req,res)=>{

try{


const session = await VideoSession.findById(
req.params.id
);


if(!session){

return res.status(404).json({

message:"Session not found"

});

}


session.status="ended";


await session.save();


res.json({

message:"Video session ended",

session

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};

// Get Video Session By Appointment

const getVideoSessionByAppointment = async (req, res) => {

    try {

        const session = await VideoSession.findOne({

            appointment: req.params.appointmentId,

            status: "active"

        });

        if (!session) {

            return res.status(404).json({

                message: "Video session not found"

            });

        }

        res.json(session);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


module.exports={

createVideoSession,

getVideoSession,

getVideoSessionByAppointment,

endVideoSession

};