import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

import Appointment from "./pages/Appointment";
import Prescription from "./pages/Prescription";
import MedicalRecord from "./pages/MedicalRecord";
import Emergency from "./pages/Emergency";
import VideoCall from "./pages/VideoCall";
import Payment from "./pages/Payment";
import MyPrescriptions from "./pages/MyPrescriptions";
import DoctorAppointments from "./pages/DoctorAppointments";


function App(){


return(

<BrowserRouter>


<Navbar/>


<Routes>


<Route 
path="/register"
element={<Register/>}
/>


<Route 
path="/login"
element={<Login/>}
/>



<Route
path="/patient-dashboard"
element={

<ProtectedRoute role="patient">

<Layout>

<PatientDashboard/>

</Layout>

</ProtectedRoute>

}
/>



<Route
path="/doctor-dashboard"
element={

<ProtectedRoute role="doctor">

<Layout>

<DoctorDashboard/>

</Layout>

</ProtectedRoute>

}
/>



<Route
path="/appointment"
element={

<ProtectedRoute role="patient">

<Layout>

<Appointment/>

</Layout>

</ProtectedRoute>

}
/>




<Route
path="/prescription"
element={

<ProtectedRoute role="doctor">

<Layout>

<Prescription/>

</Layout>

</ProtectedRoute>

}
/>



<Route
path="/my-prescriptions"
element={

<ProtectedRoute role="patient">

<Layout>

<MyPrescriptions/>

</Layout>

</ProtectedRoute>

}
/>



<Route
path="/doctor-appointments"
element={

<ProtectedRoute role="doctor">

<Layout>

<DoctorAppointments/>

</Layout>

</ProtectedRoute>

}
/>



{/* =========================
   Patient Medical Records
========================= */}

<Route
path="/medical-record"
element={

<ProtectedRoute role="patient">

<Layout>

<MedicalRecord/>

</Layout>

</ProtectedRoute>

}
/>

{/* =========================
   Doctor View Patient Records
========================= */}

<Route
path="/medical-records/:patientId"
element={

<ProtectedRoute role="doctor">

<Layout>

<MedicalRecord/>

</Layout>

</ProtectedRoute>

}
/>



<Route
path="/emergency"
element={

<ProtectedRoute>

<Layout>

<Emergency/>

</Layout>

</ProtectedRoute>

}
/>



<Route
path="/videoCall"
element={

<ProtectedRoute>

<Layout>

<VideoCall/>

</Layout>

</ProtectedRoute>

}
/>



<Route
path="/payment"
element={

<ProtectedRoute>

<Layout>

<Payment/>

</Layout>

</ProtectedRoute>

}
/>


</Routes>


<Footer/>


</BrowserRouter>


);


}


export default App;
