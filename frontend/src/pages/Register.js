import "./Register.css";

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";



function Register(){


const navigate = useNavigate();


const [form,setForm] = useState({

name:"",
email:"",
password:"",
role:"patient"

});




// input handle

const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






// register api

const handleSubmit=async(e)=>{


e.preventDefault();


try{


const res = await axios.post(

"https://healthcare-telemedicine-platform.onrender.com/api/auth/register",

form

);



console.log("REGISTER DATA",res.data);



alert("Registration Successful");


// register ke baad login page

navigate("/login");



}


catch(error){


console.log(error);


alert(

error.response?.data?.message ||

"Something went wrong"

);


}


};







return(

<div className="register-page">


<div className="register-card">


<h1>

Create Account 🚀

</h1>


<p>

Join MediCare and start your healthcare journey

</p>





<form onSubmit={handleSubmit}>




<input

type="text"

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

/>





<input

type="email"

name="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

/>





<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

/>






<select

name="role"

value={form.role}

onChange={handleChange}

>


<option value="patient">

Patient

</option>


<option value="doctor">

Doctor

</option>



</select>






<button type="submit">

Register

</button>





</form>



</div>


</div>


);


}



export default Register;