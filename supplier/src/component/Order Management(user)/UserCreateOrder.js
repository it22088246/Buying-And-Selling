import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavBar from '../NavBar/UserNavBar';
import { useHistory } from "react-router-dom";

export default function UserCreateOrder() {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [oid, setOid] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");
    const history = useHistory();

    function sendData(e) {
        e.preventDefault();

        // Calculate the total amount
        const calculatedTotalAmount = quantity * amount;

        // Display confirmation message
        const isConfirmed = window.confirm("Are you sure you want to confirm this order?");
        if (!isConfirmed) {
            return;  // If the user cancels, do nothing
        }

        const newOrder = {
            name,
            number,
            oid,
            amount,
            quantity,
            date,
            address,
            note,
            totalAmount: calculatedTotalAmount,
        }

        axios.post("http://localhost:8070/order/save", newOrder)
            .then(() => {
                setSuccessMessage("Your Order Place On 3-5 Working Day. We Will Contact You!!");
                history.push("/userproduct");
                setTimeout(() => {
                    window.location.reload();
                }, 3000); // Adjust the delay as needed 
            })
            .catch((err) => {
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
            <UserNavBar />

            <div className="container" style={{ marginTop: "55px" }}>
                <form onSubmit={sendData}>
                    <h2>Order Confirm Form</h2>
                    <br></br>

                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}

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
    <label for="exampleInputPassword1" className="form-label">Product Code</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Product Code"
    onChange={(e) =>{

    setOid(e.target.value);
    }}/>
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Amount</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Amount"
        min={"1"}
        onChange={(e) => {
            setAmount(e.target.value);
            setTotalAmount(e.target.value * quantity);
        }}
    />
</div>

<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Quantity</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
        max={"200"} min={"1"}
        onChange={(e) => {
            setQuantity(e.target.value);
            setTotalAmount(e.target.value * amount);
        }}
    />
</div>
 
<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Date</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      />
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

<div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Total Amount</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Total Amount" value={totalAmount} readOnly />
</div>


                    <div className="mb-3">
                        <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
                            <i className='fas fa-save'></i>
                            &nbsp; Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
