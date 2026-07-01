import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Appointment.css";


function Appointment(){

const navigate = useNavigate();
const [doctors,setDoctors] = useState([]);

const [appointments,setAppointments] = useState([]);

const [specialization,setSpecialization] = useState("");



const [form,setForm] = useState({

doctor:"",
appointmentDate:"",
appointmentTime:"",
reason:""

});



const token = localStorage.getItem("token");





// GET DOCTORS

const getDoctors = async()=>{


try{


const res = await axios.get(

"https://healthcare-telemedicine-platform.onrender.com/api/doctors"

);


setDoctors(res.data.doctors || res.data);



}

catch(error){


console.log(error);


}


};







// GET APPOINTMENTS

const getAppointments = async()=>{


try{


const res = await axios.get(

"https://healthcare-telemedicine-platform.onrender.com/api/appointments/patient",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



setAppointments(res.data);



}


catch(error){


console.log(error);


}


};






useEffect(()=>{


getDoctors();

getAppointments();


},[]);







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};








// BOOK APPOINTMENT


const bookAppointment=async(e)=>{


e.preventDefault();


try{


const res = await axios.post(

"https://healthcare-telemedicine-platform.onrender.com/api/appointments",

form,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

alert("Appointment Booked Successfully");


getAppointments();



}


catch(error){


alert(

error.response?.data?.message ||

"Something went wrong"

);


}


};

// ===============================
// START VIDEO CALL
// ===============================

const startVideoCall = async (appointment) => {

    try {

        const response = await axios.post(

            "https://healthcare-telemedicine-platform.onrender.com/api/video/create",

            {

                appointment: appointment._id,

                doctor: appointment.doctor._id,

                patient: appointment.patient,

            },

            {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            }

        );

        navigate("/videoCall", {

            state: {

                appointmentId: appointment._id,
                roomId: response.data.session.roomId,
                sessionId: response.data.session._id,
                role: "patient"

            },

        });

    }

    catch (error) {

     
    console.log("Full Error:", error);

    console.log("Response:", error.response);

    console.log("Response Data:", error.response?.data);

    alert(error.response?.data?.message || "Unable to start video session");

}

};







return(

<div className="appointment-page">





<div className="appointment-hero">


<div>

<h1>📅 Book Appointment</h1>

<p>

Find doctors and manage your visits

</p>

</div>


<span>🩺</span>


</div>









<div className="appointment-card">



<form onSubmit={bookAppointment}>




<select

onChange={(e)=>setSpecialization(e.target.value)}

>


<option value="">

Select Specialization

</option>


<option value="Cardiologist">Cardiologist</option>

<option value="Dentist">Dentist</option>

<option value="Neurologist">Neurologist</option>

<option value="Orthopedic">Orthopedic</option>

<option value="Dermatologist">Dermatologist</option>

<option value="General Physician">General Physician</option>


</select>







<select

name="doctor"

onChange={handleChange}

>


<option value="">

Select Doctor

</option>




{

doctors

.filter(

doctor =>

!specialization ||

doctor.specialization === specialization

)

.map((doctor)=>(


<option

key={doctor._id}

value={doctor.user._id}

>


{doctor.name}

{" | "}

{doctor.specialization}

{" | ₹"}

{doctor.fees}


</option>


))

}



</select>







<input

type="date"

name="appointmentDate"

onChange={handleChange}

/>





<input

type="time"

name="appointmentTime"

onChange={handleChange}

/>





<textarea

name="reason"

placeholder="Reason"

onChange={handleChange}

></textarea>





<button>

Book Appointment

</button>



</form>



</div>








<h1 className="section-title">

My Appointments

</h1>





<div className="appointment-list">



{

appointments.length===0 ?

(

<p className="empty">

No Appointments Found 📭

</p>

)

:

appointments.map((item)=>(



<div

className="appointment-item"

key={item._id}

>



<h3>

Dr. {item.doctor?.name}

</h3>



<p>

📅 {item.appointmentDate}

</p>



<p>

⏰ {item.appointmentTime}

</p>



<p>

📝 {item.reason}

</p>




<span className={`status ${item.status}`}>

{item.status}

</span>

{
item.status==="confirmed" && (

<button

className="video-btn"

onClick={()=>startVideoCall(item)}

>

🎥 Start Video Call

</button>

)
}


</div>


))


}




</div>





</div>


);


}



export default Appointment;