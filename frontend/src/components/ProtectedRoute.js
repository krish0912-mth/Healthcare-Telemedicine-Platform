import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function ProtectedRoute({children,role}){


const token = localStorage.getItem("token");



if(!token){


return <Navigate to="/login"/>;


}



try{


const decoded = jwtDecode(token);


console.log("PROTECTED ROLE",decoded.role);



if(role && decoded.role !== role){


return <Navigate to="/login"/>;


}



return children;



}

catch(error){


localStorage.removeItem("token");


return <Navigate to="/login"/>;


}


}



export default ProtectedRoute;