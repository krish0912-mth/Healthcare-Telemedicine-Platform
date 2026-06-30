import { useState } from "react";
import axios from "axios";
import "./Payment.css";


function Payment(){


const [form,setForm] = useState({

appointment:"",
amount:""

});

const [loading,setLoading] = useState(false);


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};








const createPayment = async(e)=>{


e.preventDefault();



try{

setLoading(true);
const token = localStorage.getItem("token");



// convert amount into number

const paymentData={

appointment:form.appointment,

amount:Number(form.amount)

};





// create razorpay order

const res = await axios.post(

"https://healthcare-telemedicine-platform.onrender.com/api/payment/create-order",

paymentData,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);




console.log("ORDER DATA",res.data);





const options={


key:"rzp_test_T4cfDXqQG0FNlJ",


amount:res.data.order.amount,


currency:"INR",


name:"MediCare",


description:"Doctor Consultation Payment",


order_id:res.data.order.id,




// user details

prefill:{

name:"Patient",

email:"patient@gmail.com",

contact:"9999999999"

},




// after payment success

handler:async function(response){



console.log("PAYMENT RESPONSE",response);



const verify = await axios.post(

"https://healthcare-telemedicine-platform.onrender.com/api/payment/verify",

response,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);




console.log("VERIFY DATA",verify.data);



alert("Payment Successful ✅");


setForm({
appointment:"",
amount:""
});


},





theme:{

color:"#7c3aed"

}


};






const razorpay = new window.Razorpay(options);

razorpay.on(
"payment.failed", function(response){

console.log(response);
alert("Payment Failed ❌");
}
);




razorpay.open();





}


catch(error){



console.log(error);



alert(

error.response?.data?.message ||

"Payment Failed"

);


}

finally{
    setLoading(false);
}

};









return(


<div className="payment-page">


<div className="payment-card">


<h1>

Payment 💳

</h1>



<p>

Secure doctor consultation payment

</p>







<form onSubmit={createPayment}>



<input

name="appointment"

placeholder="Appointment ID"

value={form.appointment}

onChange={handleChange}

/>




<input

name="amount"

placeholder="Amount ₹"

value={form.amount}

onChange={handleChange}

/>





<button 
type="submit"
disabled={loading}
>
{
loading ? "Processing..." : "Pay Now 💳"
}

</button>




</form>



</div>


</div>



);


}



export default Payment;