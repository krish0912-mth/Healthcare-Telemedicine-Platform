import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


function Navbar(){


const [dark,setDark] = useState(false);


const navigate = useNavigate();


const token = localStorage.getItem("token");



// DARK MODE

const toggleDark = ()=>{


setDark(!dark);


document.body.classList.toggle("dark-mode");


};




// LOGOUT

const logout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};





return(


<nav className="navbar">



<div className="logo">

🏥 MediCare

</div>




<div className="nav-links">



<Link to="/">

Home

</Link>





{

token ? (

<>


<button

className="dashboard-btn"

onClick={()=>navigate("/patient-dashboard")}

>

Dashboard

</button>




<button

className="logout-nav"

onClick={logout}

>

Logout

</button>



</>


)


:


(

<>


<Link to="/login">

Login

</Link>




<Link

className="register-btn"

to="/register"

>

Register

</Link>



</>


)

}





<button

className="dark-btn"

onClick={toggleDark}

>


{

dark ? "☀️" : "🌙"

}


</button>




</div>



</nav>


);


}



export default Navbar;