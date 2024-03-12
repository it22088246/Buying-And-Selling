const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    tcode:{
        type: String,
        required: true
    },

    sname:{
        type: String,
        required: true
    },

    bname:{
        type: String,
        required: true
    },

    samount:{
        type: String,
        required: true
    },

    bamount:{
        type: String,
        required: true
    },
    method:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required: true
    },

    

});

module.exports = mongoose.model("Payment", PaymentSchema)