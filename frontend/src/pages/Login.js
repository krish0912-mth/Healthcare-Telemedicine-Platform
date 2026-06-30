import "./Login.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { jwtDecode } from "jwt-decode";



function Login(){


const navigate = useNavigate();


const [form,setForm] = useState({

email:"",
password:""

});



// handle input

const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};




// login

const handleSubmit=async(e)=>{


e.preventDefault();


try{


const res = await axios.post(

"http://localhost:5000/api/auth/login",

form

);



console.log("LOGIN RESPONSE",res.data);



// token get

const token = res.data.token;



// token store

localStorage.setItem(

"token",

token

);



// token decode

const decoded = jwtDecode(token);
console.log("DECODE DATA",decoded);

console.log("ROLE",decoded.role);


localStorage.setItem(

"user",

JSON.stringify({

id:decoded.id,

role:decoded.role

})

);

// role wise redirect

if(decoded.role === "doctor"){

console.log("DOCTOR JA RAHA HU");

navigate("/doctor-dashboard");


}

else if(decoded.role === "patient"){


console.log("PATIENT JA RAHA HU");

navigate("/patient-dashboard");


}

else{


alert("Invalid Role");


}



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

<div className="login-page">


<div className="login-card">


<h1>

Welcome Back 👋

</h1>


<p>

Login to continue your healthcare journey

</p>



<form onSubmit={handleSubmit}>


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



<button type="submit">

Login

</button>


</form>


</div>


</div>


);


}



export default Login;