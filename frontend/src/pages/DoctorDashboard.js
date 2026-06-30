import "./DoctorDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorDashboard() {

const navigate = useNavigate();

const [doctor,setDoctor] = useState(null);

const [loading,setLoading] = useState(true);

const [editMode,setEditMode] = useState(false);

const token = localStorage.getItem("token");

const [form,setForm] = useState({

name:"",
email:"",
specialization:"",
experience:"",
qualification:"",
fees:"",
availability:true

});



// ===========================
// GET DOCTOR PROFILE
// ===========================

const getProfile = async()=>{

try{

const res = await axios.get(

"http://localhost:5000/api/doctors/profile",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

console.log(res.data);

setDoctor(res.data.doctor);

setForm({

name:res.data.doctor.user?.name || "",

email:res.data.doctor.user?.email || "",

specialization:res.data.doctor.specialization || "",

experience:res.data.doctor.experience || "",

qualification:res.data.doctor.qualification || "",

fees:res.data.doctor.fees || "",

availability:res.data.doctor.availability

});

}

catch(error){

console.log(error.response?.data);

}

finally{

setLoading(false);

}

};



useEffect(()=>{

getProfile();

},[]);



// ===========================
// HANDLE INPUT
// ===========================

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:

e.target.name==="availability"

?

e.target.value==="true"

:

e.target.value

});

};



// ===========================
// CREATE PROFILE
// ===========================

const createProfile=async(e)=>{

e.preventDefault();

try{

const res=await axios.post(

"http://localhost:5000/api/doctors/profile",

form,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

alert("Doctor Profile Created");

setDoctor(res.data.doctor);

getProfile();

}

catch(error){

console.log(error.response?.data);

}

};



// ===========================
// UPDATE PROFILE
// ===========================

const updateProfile=async()=>{

try{

await axios.put(

"http://localhost:5000/api/doctors/profile",

form,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

alert("Profile Updated");

setEditMode(false);

getProfile();

}

catch(error){

console.log(error.response?.data);

}

};
return (

<div className="doctor-page">

<div className="doctor-hero">

<div>

<h1>👨‍⚕️ Welcome Doctor</h1>

<p>Manage patients and healthcare services</p>

</div>

<span>🩺</span>

</div>

{

loading ?

(

<h2>Loading...</h2>

)

:

doctor ?

(

<>

<div className="stats-grid">

<div
className="stat-card"
onClick={()=>navigate("/doctor-appointments")}
>

<h2>📅</h2>

<h3>Appointments</h3>

<p>Manage appointments</p>

</div>

<div
className="stat-card"
onClick={()=>navigate("/prescription")}
>

<h2>💊</h2>

<h3>Prescriptions</h3>

<p>Create prescriptions</p>

</div>

<div
className="stat-card"
onClick={()=>navigate("/emergency")}
>

<h2>🚨</h2>

<h3>Emergency</h3>

<p>Emergency requests</p>

</div>

<div
className="stat-card"
onClick={()=>navigate("/videoCall")}
>

<h2>🎥</h2>

<h3>Video Calls</h3>

<p>Consult Online</p>

</div>

</div>

<div className="profile-card">

<h2>Doctor Profile</h2>

{
!editMode ?

(

<div className="profile-info">

<p><b>Name :</b> {doctor.user?.name}</p>

<p><b>Email :</b> {doctor.user?.email}</p>

<p><b>Specialization :</b> {doctor.specialization}</p>

<p><b>Experience :</b> {doctor.experience}</p>

<p><b>Qualification :</b> {doctor.qualification}</p>

<p><b>Fees :</b> ₹{doctor.fees}</p>

<button
className="profile-btn"
onClick={()=>setEditMode(true)}
>

Edit Profile

</button>

</div>

)

:
(
    <div className="profile-form">

<input
type="text"
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

<input
type="text"
name="specialization"
placeholder="Specialization"
value={form.specialization}
onChange={handleChange}
/>

<input
type="text"
name="experience"
placeholder="Experience"
value={form.experience}
onChange={handleChange}
/>

<input
type="text"
name="qualification"
placeholder="Qualification"
value={form.qualification}
onChange={handleChange}
/>

<input
type="number"
name="fees"
placeholder="Consultation Fees"
value={form.fees}
onChange={handleChange}
/>

<select
name="availability"
value={form.availability}
onChange={handleChange}
>

<option value={true}>Available</option>

<option value={false}>Not Available</option>

</select>

<div className="profile-actions">

<button
className="profile-btn"
onClick={updateProfile}
>

Save Changes

</button>

<button
type="button"
className="cancel-btn"
onClick={() => setEditMode(false)}
>

Cancel

</button>

</div>

</div>

)

}

</div>

</>

)

:

(

<form
className="profile-form"
onSubmit={createProfile}
>

<h2>Create Doctor Profile</h2>

<input
name="specialization"
placeholder="Specialization"
value={form.specialization}
onChange={handleChange}
required
/>

<input
name="experience"
placeholder="Experience"
value={form.experience}
onChange={handleChange}
required
/>

<input
name="qualification"
placeholder="Qualification"
value={form.qualification}
onChange={handleChange}
required
/>

<input
type="number"
name="fees"
placeholder="Consultation Fees"
value={form.fees}
onChange={handleChange}
required
/>

<button
type="submit"
className="profile-btn"
>

Create Profile

</button>

</form>

)

}

</div>

);

}
export default DoctorDashboard;