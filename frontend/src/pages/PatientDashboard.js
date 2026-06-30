import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";


function PatientDashboard(){


const navigate = useNavigate();


const [patient,setPatient] = useState(null);


const [form,setForm] = useState({

name:"",
age:"",
gender:"",
countryCode:"+91",
phone:"",
address:""

});


const token = localStorage.getItem("token");




// GET PROFILE

const getProfile = async()=>{


try{


const res = await axios.get(

"http://localhost:5000/api/patients/profile",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


console.log("PATIENT",res.data);


setPatient(res.data);


}


catch(error){


console.log(error.response?.data);


}


};





useEffect(()=>{


getProfile();


},[]);






// HANDLE CHANGE


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






// CREATE PROFILE


const createProfile=async(e)=>{


e.preventDefault();


try{


const res = await axios.post(

"http://localhost:5000/api/patients/profile",

form,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



alert("Profile Created Successfully");


setPatient(res.data);



}


catch(error){


console.log(error.response?.data);


}


};










return(

<div className="patient-page">



{/* HERO SECTION */}


<div className="welcome-card">


<div>


<h1>

👋 Welcome Patient

</h1>


<p>

Your complete healthcare dashboard

</p>


</div>


<span>

🏥

</span>


</div>







{

patient ?


(

<>



{/* QUICK CARDS */}



<div className="stats-grid">



<div
className="stat-card"
onClick={()=>navigate("/appointment")}
>


<h2>📅</h2>

<h3>Appointments</h3>

<p>Book & track visits</p>


</div>






<div
className="stat-card"
onClick={()=>navigate("/my-prescriptions")}
>


<h2>💊</h2>

<h3>Prescriptions</h3>

<p>View medicines</p>


</div>






<div
className="stat-card"
onClick={()=>navigate("/medical-record")}
>


<h2>📁</h2>

<h3>Records</h3>

<p>Medical history</p>


</div>







<div
className="stat-card"
onClick={()=>navigate("/emergency")}
>


<h2>🚨</h2>

<h3>Emergency</h3>

<p>Quick support</p>


</div>







<div
className="stat-card"
onClick={()=>navigate("/videoCall")}
>


<h2>🎥</h2>

<h3>Video Call</h3>

<p>Consult online</p>


</div>







<div
className="stat-card"
onClick={()=>navigate("/payment")}
>


<h2>💳</h2>

<h3>Payment</h3>

<p>Manage bills</p>


</div>





</div>








{/* PROFILE CARD */}



<div className="profile-card">


<h2>

👤 Patient Profile

</h2>



<div className="profile-info">


<p>
<b>Name :</b> {patient.name}
</p>


<p>
<b>Age :</b> {patient.age}
</p>


<p>
<b>Gender :</b> {patient.gender}
</p>


<p>
<b>Phone :</b> {patient.countryCode} {patient.phone}
</p>


<p>
<b>Address :</b> {patient.address}
</p>


</div>


</div>



</>

)

:


(


<form
className="profile-form"
onSubmit={createProfile}
>



<h2>

Create Your Profile

</h2>




<input

name="name"

placeholder="Full Name"

onChange={handleChange}

/>




<input

name="age"

placeholder="Age"

onChange={handleChange}

/>




<select

name="gender"

onChange={handleChange}

>


<option value="">

Select Gender

</option>


<option value="Male">

Male

</option>


<option value="Female">

Female

</option>


</select>







<select

name="countryCode"

onChange={handleChange}

>


<option value="+91">

🇮🇳 +91 India

</option>


<option value="+1">

🇺🇸 +1 USA

</option>


<option value="+44">

🇬🇧 +44 UK

</option>


</select>






<input

name="phone"

placeholder="Phone Number"

onChange={handleChange}

/>





<input

name="address"

placeholder="Address"

onChange={handleChange}

/>





<button className="profile-btn">

Create Profile

</button>




</form>


)


}




</div>


);


}



export default PatientDashboard;