import { useEffect, useState } from "react";
import axios from "axios";
import "./Prescription.css";

const API_URL = "http://localhost:5000/api";

function Prescription(){

// ==========================
// STATES
// ==========================

const [appointments,setAppointments] = useState([]);

const [prescriptions,setPrescriptions] = useState([]);

const [selectedFile,setSelectedFile] = useState(null);

const [loading,setLoading] = useState(false);

const [form,setForm] = useState({

patient:"",
appointment:"",
instructions:"",

medicines:[

{

name:"",
dosage:"",
duration:""

}

]

});

const token = localStorage.getItem("token");



// ==========================
// GET APPOINTMENTS
// ==========================

const getAppointments = async()=>{

try{

const res = await axios.get(

`${API_URL}/appointments/doctor`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

setAppointments(

res.data.appointments || res.data

);

}

catch(error){

console.log(error);

}

};



// ==========================
// GET DOCTOR PRESCRIPTIONS
// ==========================

const getPrescriptions = async()=>{

try{

const res = await axios.get(

`${API_URL}/prescriptions/doctor`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

setPrescriptions(res.data);

}

catch(error){

console.log(error);

}

};



// ==========================
// FIRST LOAD
// ==========================

useEffect(()=>{

getAppointments();

getPrescriptions();

},[]);



// ==========================
// APPOINTMENT SELECT
// ==========================

const selectAppointment=(e)=>{

const selected = appointments.find(

app=>app._id===e.target.value

);

if(selected){

setForm({

...form,

appointment:selected._id,

patient:selected.patient?._id ||

selected.patient

});

}

};



// ==========================
// HANDLE INPUT
// ==========================

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



// ==========================
// HANDLE MEDICINE
// ==========================

const handleMedicineChange=(

index,

field,

value

)=>{

const updated=[...form.medicines];

updated[index][field]=value;

setForm({

...form,

medicines:updated

});

};



// ==========================
// ADD MEDICINE
// ==========================

const addMedicine=()=>{

setForm({

...form,

medicines:[

...form.medicines,

{

name:"",

dosage:"",

duration:""

}

]

});

};



// ==========================
// REMOVE MEDICINE
// ==========================

const removeMedicine=(index)=>{

const updated=[...form.medicines];

updated.splice(index,1);

setForm({

...form,

medicines:updated

});

};



// ==========================
// FILE
// ==========================

const handleFile=(e)=>{

setSelectedFile(

e.target.files[0]

);

};



// ==========================
// CREATE PRESCRIPTION
// ==========================

const createPrescription=async(e)=>{

e.preventDefault();

try{

setLoading(true);

const data=new FormData();

data.append("patient",form.patient);

data.append("appointment",form.appointment);

data.append(

"instructions",

form.instructions

);

data.append(

"medicines",

JSON.stringify(form.medicines)

);

if(selectedFile){

data.append(

"prescriptionFile",

selectedFile

);

}

const res=await axios.post(

`${API_URL}/prescriptions`,

data,

{

headers:{

Authorization:`Bearer ${token}`,

"Content-Type":

"multipart/form-data"

}

}

);

alert("Prescription Created Successfully");

console.log(res.data);

setForm({

patient:"",

appointment:"",

instructions:"",

medicines:[

{

name:"",

dosage:"",

duration:""

}

]

});

setSelectedFile(null);

getPrescriptions();

getAppointments();

}

catch(error){

console.log(error);

alert(

error.response?.data?.message ||

"Something went wrong"

);

}

finally{

setLoading(false);

}

};
return(

<div className="prescription-page">

<div className="prescription-card">

<h1>

💊 Create Prescription

</h1>

<p>

Create digital prescriptions for patients

</p>



<form onSubmit={createPrescription}>

<select

value={form.appointment}

onChange={selectAppointment}

required

>

<option value="">

Select Appointment

</option>

{

appointments
.filter((app) => app.status === "confirmed")
.map((app) => (

<option

key={app._id}

value={app._id}

>

{app.patient?.name}

{" | "}

{new Date(app.appointmentDate).toLocaleDateString()}

</option>

)
)
}


</select>



{

form.medicines.map((medicine,index)=>(

<div

className="medicine-box"

key={index}

>

<input

placeholder="Medicine Name"

value={medicine.name}

onChange={(e)=>

handleMedicineChange(

index,

"name",

e.target.value

)

}

/>

<input

placeholder="Dosage"

value={medicine.dosage}

onChange={(e)=>

handleMedicineChange(

index,

"dosage",

e.target.value

)

}

/>

<input

placeholder="Duration"

value={medicine.duration}

onChange={(e)=>

handleMedicineChange(

index,

"duration",

e.target.value

)

}

/>

{

form.medicines.length>1 && (

<button

type="button"

className="remove-btn"

onClick={()=>removeMedicine(index)}

>

Remove

</button>

)

}

</div>

))

}



<button

type="button"

className="add-btn"

onClick={addMedicine}

>

+ Add Medicine

</button>



<textarea

name="instructions"

placeholder="Instructions"

value={form.instructions}

onChange={handleChange}

/>



<input

type="file"

accept=".pdf,.jpg,.jpeg,.png"

onChange={handleFile}

/>



<button

className="submit-btn"

disabled={loading}

>

{

loading

?

"Creating..."

:

"Create Prescription"

}

</button>

</form>

</div>





<h2>

📋 Previous Prescriptions

</h2>



<div className="prescription-list">

{

prescriptions.length===0

?

(

<div className="empty-box">

No Prescription Found

</div>

)

:

(

prescriptions.map((item)=>(

<div

className="prescription-item"

key={item._id}

>

<h3>

👤

{

item.patient?.name ||

"Patient"

}

</h3>

<p>

📅

{

new Date(

item.createdAt

).toLocaleDateString()

}

</p>

<p>

📝

{

item.instructions ||

"No Instructions"

}

</p>

<div className="medicine-list">

{

item.medicines.map((med,i)=>(

<div

key={i}

className="medicine-chip"

>

💊

{med.name}

{" | "}

{med.dosage}

{" | "}

{med.duration}

</div>

))

}

</div>

{

item.prescriptionFile && (

<a

href={`http://localhost:5000/${item.prescriptionFile}`}

target="_blank"

rel="noreferrer"

className="file-btn"

>

📄 View Prescription

</a>

)

}

</div>

))

)

}

</div>

</div>

);

}

export default Prescription;
