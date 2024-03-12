import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory } from "react-router-dom"
import NavBar from '../NavBar/NavBar';

export default function EditSupplier(props) {

    const [id, setId] = useState("");
    const [sid, setSid] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const supplierId = props.match.params.id;

        axios.get(`http://localhost:8070/supplier/${supplierId}`).then((res) => {
      const supplier = res.data.supplier;

      setId(supplier._id);
      setSid(supplier.sid);
      setName(supplier.name);
      setAddress(supplier.address);
      setProduct(supplier.product);
      setAmount(supplier.amount);
      setQuantity(supplier.quantity);
      setDate(supplier.date);
      setNote(supplier.note);
      setTotalAmount(supplier.totalAmount);
      
      
    });
  }, [props.match.params.id]);

  function sendData(e) {
    e.preventDefault();

          // Calculate the total amount
          const calculatedTotalAmount = quantity * amount;

    const updateSupplier = {
      sid,
      name,
      address,
      product,
      amount,
      quantity,
      date,
      note,
      totalAmount: calculatedTotalAmount,
    };

    axios.put(`http://localhost:8070/supplier/update/${id}`, updateSupplier).then(() => {
      alert("Supplier Record Updated");
      history.push("/supplier"); 
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
<div className="container" style={{ marginTop:"63px"}}>
      <form onSubmit={sendData}>
        <h2>Edit Supplier Record</h2>
        <br></br>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Supplier Code</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Supplier Code"
            readOnly
            value={sid}
            onChange={(e) => setSid(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Supplier Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Post Category Here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Product</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Productr"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Amount</label>
    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Amount"
    value={amount}
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
       value={quantity}
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
      required/>
  </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Additional Note</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Additional Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Total Amount</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Total Amount" value={totalAmount} readOnly />
</div>

        <button type="submit" className="btn btn-success" style={{ marginTop: "15px" }}>
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
      
    </div>
  )
}
