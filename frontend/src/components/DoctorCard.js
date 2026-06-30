function DoctorCard({doctor}){


return(

<div>

<h3>{doctor?.name}</h3>

<p>{doctor?.specialization}</p>

<p>Fees: ₹{doctor?.fees}</p>


</div>

);


}


export default DoctorCard;