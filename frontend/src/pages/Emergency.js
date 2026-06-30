import { useEffect, useState } from "react";
import axios from "axios";
import "./Emergency.css";

const API_URL = "http://localhost:5000/api";

function Emergency() {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role;

  const [form, setForm] = useState({
    problem: "",
    priority: "high"
  });

  const [emergencies, setEmergencies] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  // ==========================
  // GET ALL EMERGENCIES
  // ==========================

  const getEmergencies = async () => {

    try {

      const res = await axios.get(

        `${API_URL}/emergency`,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      setEmergencies(res.data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  // ==========================
  // CREATE EMERGENCY
  // ==========================

  const createEmergency = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        `${API_URL}/emergency`,

        form,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      console.log(res.data);

      alert("Emergency Request Sent 🚨");

      setForm({

        problem: "",

        priority: "high"

      });

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Something went wrong"

      );

    }

  };

  // ==========================
  // ACCEPT EMERGENCY
  // ==========================

  const acceptEmergency = async (id) => {

    try {

      await axios.put(

        `${API_URL}/emergency/${id}/accept`,

        {},

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      getEmergencies();

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Something went wrong"

      );

    }

  };

  // ==========================
  // COMPLETE EMERGENCY
  // ==========================

  const completeEmergency = async (id) => {

    try {

      await axios.put(

        `${API_URL}/emergency/${id}/complete`,

        {},

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      getEmergencies();

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Something went wrong"

      );

    }

  };

  // ==========================
  // FIRST LOAD
  // ==========================

  useEffect(() => {

    if (role === "doctor") {

      getEmergencies();

    }

    else {

      setLoading(false);

    }

  }, []);

  return(

<div className="emergency-page">

{

role==="patient"

?

(

<div className="emergency-card">

<h1>

Emergency Request 🚨

</h1>

<p>

Send urgent consultation request

</p>

<form onSubmit={createEmergency}>

<textarea

name="problem"

placeholder="Describe your emergency problem"

value={form.problem}

onChange={handleChange}

required

/>

<select

name="priority"

value={form.priority}

onChange={handleChange}

required

>

<option value="low">

Low Priority

</option>

<option value="medium">

Medium Priority

</option>

<option value="high">

High Priority

</option>

</select>

<button type="submit">

Send Emergency

</button>

</form>

</div>

)

:

(

<>
<h1>

🚨 Emergency Requests

</h1>

{

loading

?

(

<h2>

Loading...

</h2>

)

:

(

<div className="emergency-list">

{

emergencies.length===0

?

(

<h2>

No Emergency Requests

</h2>

)

:

(

emergencies.map((item)=>(

<div

className="emergency-item"

key={item._id}

>

<h2>

👤 {item.patient?.name}

</h2>

<p>

📧 {item.patient?.email}

</p>

<p>

🚨 {item.problem}

</p>

<p>

🔥 Priority :

<b>

{item.priority}

</b>

</p>

<p>

Status :

<span

className={`status ${item.status}`}

>

{item.status}

</span>

</p>

<div className="emergency-actions">

{

item.status==="pending" && (

<button

className="accept-btn"

onClick={()=>acceptEmergency(item._id)}

>

Accept

</button>

)

}

{

item.status==="accepted" && (

<button

className="complete-btn"

onClick={()=>completeEmergency(item._id)}

>

Complete

</button>

)

}

</div>

</div>

))

)

}

</div>

)

}

</>

)

}

</div>

);

}

export default Emergency;







