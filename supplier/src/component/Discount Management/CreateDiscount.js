import React,{useState, useEffect } from "react";
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import {useHistory } from "react-router-dom";

export default function CreateDiscount() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [pdiscount, setDiscount] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [note, setNote] = useState("");
    const history = useHistory();

    function sendData(a){

        a.preventDefault();
        const newDiscount = {

              name,
              category,
              pdiscount,
              date,
              time,
              note
          }
      
          axios.post("http://localhost:8070/discount/save", newDiscount).then(() =>{
              alert("Discount Added")
              history.push("/discount"); 
              window.location.reload(); 
          }).catch((err)=>{
              alert(err)
          })
      }

      useEffect(() => {
        // Get the current date
        var currentDate = new Date();
    
        // Format the current date as YYYY-MM-DD
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = currentDate.getDate().toString().padStart(2, '0');
        var formattedDate = `${year}-${month}-${day}`;
    
        // Set the minimum date attribute for the input to the current date
        document.getElementById('dateInput').setAttribute('min', formattedDate);
    
      }, []);
      
    
      
  return (
    <div>
      <NavBar/>

<div className="container" style={{ marginTop:"55px"}}>
    <form onSubmit={sendData}>
      <h2>New Discount Records</h2>
      <br></br>

<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Product Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Name" 
    onChange={(e) =>{

    setName(e.target.value);
    }}/>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Product Category</label>
<select className="form-select" aria-label="Default select example" 
  onChange={(e) =>{

    setCategory(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="Electronics">Electronics</option>
  <option value="Clothing and Apparel">Clothing and Apparel</option>
  <option value="Home and Furniture">Home and Furniture</option>
  <option value="Books and Media">Books and Media</option>
  <option value="Sports and Outdoors">Sports and Outdoors</option>
</select>
</div>

<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Discount</label>
<select className="form-select" aria-label="Default select example" 
  onChange={(e) =>{

    setDiscount(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="2%">2%</option>
  <option value="5%">5%</option>
  <option value="8%">8%</option>
  <option value="10%">10%</option>
  <option value="25%">25%</option>
</select>
</div>


<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Start Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

  <div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Time Duaration</label>
<select className="form-select" aria-label="Default select example" 
  onChange={(e) =>{

    setTime(e.target.value);
    }}
>
  <option selected>Open this select menu</option>
  <option value="1 Day">1 Day</option>
  <option value="3 Day">3 Day</option>
  <option value="1 Week">1 Week</option>
  <option value="3 Week">3 Week</option>
  <option value="1 Month">1 Month</option>
</select>
</div>

<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Additional Comment</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Additional Comment" 
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
