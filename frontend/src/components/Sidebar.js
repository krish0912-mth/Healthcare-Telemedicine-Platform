import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar(){

const user = JSON.parse(localStorage.getItem("user"));

const role = user?.role;



return(

<div className="sidebar">


<div className="sidebar-logo">

{

role==="doctor"

?

"👨‍⚕️ Doctor Portal"

:

"👤 Patient Portal"

}

</div>





<div className="sidebar-menu">


{

role==="patient" && (

<>

<Link to="/patient-dashboard">

🏠 Dashboard

</Link>



<Link to="/appointment">

📅 Appointments

</Link>



<Link to="/my-prescriptions">

💊 Prescriptions

</Link>



<Link to="/medical-record">

📁 Records

</Link>



<Link to="/emergency">

🚨 Emergency

</Link>



<Link to="/videoCall">

🎥 Video Call

</Link>



<Link to="/payment">

💳 Payment

</Link>

</>

)

}





{

role==="doctor" && (

<>

<Link to="/doctor-dashboard">

🏠 Dashboard

</Link>



<Link to="/doctor-appointments">

📅 Appointments

</Link>



<Link to="/prescription">

💊 Prescriptions

</Link>



<Link to="/emergency">

🚨 Emergency

</Link>



<Link to="/videoCall">

🎥 Video Call

</Link>

</>

)

}



</div>





<button

className="logout-btn"

onClick={()=>{

localStorage.removeItem("token");

localStorage.removeItem("user");

window.location.href="/login";

}}

>

Logout

</button>



</div>

);

}

export default Sidebar;