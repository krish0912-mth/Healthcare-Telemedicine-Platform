import { useEffect, useState } from "react";
import axios from "axios";
import "./MyPrescriptions.css";


function MyPrescriptions(){


const [prescriptions,setPrescriptions] = useState([]);




const getPrescriptions = async()=>{


try{


const token = localStorage.getItem("token");


const res = await axios.get(

"http://localhost:5000/api/prescriptions/patient",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



console.log(res.data);


setPrescriptions(res.data);



}

catch(error){


console.log(error);


}


};





useEffect(()=>{


getPrescriptions();


},[]);






return(

<div className="prescription-page">


<h1>

My Prescriptions 💊

</h1>




{

prescriptions.length===0 ?

(

<div className="empty-prescription">

No Prescription Found

</div>

)

:

(

<div className="prescription-grid">


{

prescriptions.map((pres)=>(


<div 
className="prescription-card"
key={pres._id}
>

<p>

👨‍⚕️ Doctor :

<b>{pres.doctor?.name}</b>

</p>

<p>

📅 Appointment :

{pres.appointment?.appointmentDate}

</p>

<p>

🕒 Time :

{pres.appointment?.appointmentTime}

</p>

<h2>

Medicines

</h2>




{

pres.medicines.map((med,index)=>(


<div 
className="medicine-box"
key={index}
>


<h3>

{med.name}

</h3>


<p>

Dosage : {med.dosage}

</p>


<p>

Duration : {med.duration}

</p>



</div>


))

}




<div className="instructions">


<b>

Doctor Instructions

</b>


<p>

{pres.instructions}

</p>


</div>

{

pres.prescriptionFile && (

<a

href={`http://localhost:5000/${pres.prescriptionFile}`}

target="_blank"

rel="noreferrer"

>

📄 View Prescription

</a>

)

}


</div>


))

}


</div>


)


}



</div>


);


}



export default MyPrescriptions;