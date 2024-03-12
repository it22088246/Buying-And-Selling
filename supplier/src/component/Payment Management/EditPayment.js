import React, { useState,  useEffect} from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import NavBar from '../NavBar/NavBar';

export default function EditPayment(props) {

    const [id, setId] = useState("");
    const [tcode, setTcode] = useState("");
    const [sname, setSname] = useState("");
    const [bname, setBname] = useState("");
    const [samount, setSamount] = useState("");
    const [bamount, setBamount] = useState("");
    const [method, setMethod] = useState("");
    const [date, setDate] = useState("");
    const history = useHistory();

    useEffect(() => {

        const paymentId = props.match.params.id;
    
        axios.get(`http://localhost:8070/payment/${paymentId}`).then((res) => {
        const payment = res.data.payment;
    
          setId(payment._id);
          setTcode(payment.tcode);
          setSname(payment.sname);
          setBname(payment.bname);
          setSamount(payment.samount);
          setBamount(payment.bamount);
          setMethod(payment.method);
          setDate(payment.date); 
          
        });
      }, [props.match.params.id]);
    
      function sendData(e) {
        e.preventDefault();
    
        const updatePayment = {
          
          tcode,
          sname,
          bname,
          samount,
          bamount,
          method,
          date
        };
    
        axios.put(`http://localhost:8070/payment/update/${id}`, updatePayment).then(() => {
          alert("Payment Record Updated");
          history.push("/payment"); 
          window.location.reload(); 
        }).catch((err) => {
          alert(err);
        });
      }

      useEffect(() => {
        // Get the current date
        var currentDate = new Date();
  
        // Set the maximum date attribute for the input to the current date
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = currentDate.getDate().toString().padStart(2, '0');
        var maxDate = `${year}-${month}-${day}`;
  
        document.getElementById('dateInput').setAttribute('max', maxDate);
           }, []);
    
  return (
    <div>
       <NavBar/>
      <div className="container" style={{ marginTop:"55px"}}>
    <form onSubmit={sendData}>
      <h2>Edit Payment Records</h2>
      <br></br>
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Payment Code</label>
<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Payment Code" 
  value={tcode}
  readOnly
onChange={(e) =>{

setTcode(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Seller Name</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Seller Name"
value={sname}
onChange={(e) =>{

setSname(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Buyer Name</label>
<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Buyer Name"
value={bname}
onChange={(e) =>{

setBname(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Selling Amount</label>
<input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Seller Amount"
min={1}
value={samount}
onChange={(e) =>{

setSamount(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Buying Amount</label>
<input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Buying Amount"
min={1}
value={bamount}
onChange={(e) =>{

setBamount(e.target.value);
}}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Payment Method</label>
<select className="form-select" aria-label="Default select example" 
value={method}
  onChange={(e) =>{
    setMethod(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Credit/Debit Card">Credit/Debit Card</option>
  <option value="Bank Slip">Bank Slip</option>
  <option value="Other">Other</option>
</select>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>
    

    <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
          <i className="far fa-check-square"></i>
          &nbsp; Update
        </button>
      </form>
    </div>
    </div>
    
  )
}
