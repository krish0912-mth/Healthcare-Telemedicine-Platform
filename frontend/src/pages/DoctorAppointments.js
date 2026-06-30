import "./DoctorAppointments.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorAppointments() {

const navigate = useNavigate();

const [appointments,setAppointments] = useState([]);

const [loading,setLoading] = useState(true);

const token = localStorage.getItem("token");



// GET DOCTOR APPOINTMENTS

const getAppointments = async()=>{

try{

const res = await axios.get(

"https://healthcare-telemedicine-platform.onrender.com/api/appointments/api/doctor",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

console.log(res.data);

setAppointments(res.data);

}

catch(error){

console.log(error.response?.data);

}

finally{

setLoading(false);

}

};





useEffect(()=>{

getAppointments();

},[]);




// UPDATE STATUS

const updateStatus = async(id,status)=>{

try{

await axios.put(

`https://healthcare-telemedicine-platform.onrender.com/api/appointments/${id}/status`,

{

status

},

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

alert(`Appointment ${status}`);

getAppointments();

}

catch(error){

console.log(error.response?.data);

alert(

error.response?.data?.message ||

"Something went wrong"

);

}

};
// =========================================
// JOIN VIDEO CALL
// =========================================

const joinVideoCall = async (appointment) => {

    try {

        const response = await axios.get(

            `https://healthcare-telemedicine-platform.onrender.com/api/video/appointment/${appointment._id}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        navigate("/videoCall", {

            state: {

                appointmentId: appointment._id,

                roomId: response.data.roomId,

                sessionId: response.data._id,
                role: "doctor"

            }

        });

    }

    catch(error){

        console.log(error);

        alert("Video Session Not Found");

    }

};
return(

<div className="doctor-appointment-page">

<h1>

Doctor Appointments 📅

</h1>

{

loading ?

(

<h2>

Loading...

</h2>

)

:

appointments.length===0 ?

(

<h2>

No Appointments Found

</h2>

)

:

(

<div className="appointment-grid">

{

appointments.map((item)=>(

<div

className="appointment-card"

key={item._id}

>

<h2>

👤 {item.patient?.name}

</h2>

<p>

📧 {item.patient?.email}

</p>

<p>

📅 {item.appointmentDate}

</p>

<p>

🕒 {item.appointmentTime}

</p>

<p>

📝 {item.reason}

</p>

<p>

<b>

Status :

</b>

<span

className={`status ${item.status}`}

>

{item.status}

</span>

</p>



<div className="appointment-actions">

  {item.status === "pending" && (
    <>
      <button
        className="accept-btn"
        onClick={() => updateStatus(item._id, "confirmed")}
      >
        Accept
      </button>

      <button
        className="reject-btn"
        onClick={() => updateStatus(item._id, "cancelled")}
      >
        Reject
      </button>
    </>
  )}

  {item.status === "confirmed" && (
    <button
      className="complete-btn"
      onClick={() => updateStatus(item._id, "completed")}
    >
      Complete
    </button>
  )}

  <button
    className="record-btn"
    onClick={() =>
      navigate(`/medical-records/${item.patient._id}`)
    }
  >
    📁 Records
  </button>

  <button
    className="prescription-btn"
    onClick={() => navigate("/prescription")}
  >
    💊 Prescription
  </button>
{
item.status==="confirmed" && (

<button

className="video-btn"

onClick={()=>joinVideoCall(item)}

>

🎥 Join Video Call

</button>

)
}
</div>

</div>

))

}

</div>

)

}

</div>

);

}

export default DoctorAppointments;