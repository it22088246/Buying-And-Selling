import React,{useState, useEffect} from "react";
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import {useHistory } from "react-router-dom";

export default function CreateOrder() {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [oid, setOid] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const history = useHistory();

    function sendData(a){

        a.preventDefault();
        const newOrder = {
              name,
              number,
              oid,
              quantity,
              date,
              address,
              note
          }
      
          axios.post("http://localhost:8070/order/save", newOrder).then(() =>{
              alert("Order Record Added")
              history.push("/order"); 
              window.location.reload(); 
          }).catch((err)=>{
              alert(err)
          })
      
      
      }

      useEffect(() => {
        // Get the current date
        var currentDate = new Date();
    
        // Set the maximum date attribute for the input to the current date
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = currentDate.getDate().toString().padStart(2, '0');
        var maxDate = `${year}-${month}-${day}`;
    
        // Update the input element
        var dateInput = document.getElementById('dateInput');
        dateInput.setAttribute('max', maxDate);
        dateInput.setAttribute('min', maxDate); // Set the minimum date to the current date
      }, []);


  return (
    <div>
      <NavBar/>

<div className="container" style={{ marginTop:"55px"}}>
    <form onSubmit={sendData}>
      <h2>Create New Order Records</h2>
      <br></br>
<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Customer Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Customer Name" 
    onChange={(e) =>{

    setName(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Contact Number</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Contact Number"
    pattern="^\d{10}$"

    onChange={(e) =>{

    setNumber(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Order Code</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Order Code"
    onChange={(e) =>{

    setOid(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
    min={"1"}  max={"200"}
    onChange={(e) =>{

    setQuantity(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Address"
   
   onChange={(e) =>{

    setAddress(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Additional Comments</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Additional Comments"
    onChange={(e) =>{

    setNote(e.target.value);
    }}/>
</div>



<button type="submit" className="btn btn-success" style={{marginTop:"15px"}}>
    <i className='fas fa-save'></i>
    &nbsp; Save
</button>
</form>
</div>
    </div>
  )
}
