const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();


const supplierRouter = require("./routes/suppliers")
const userRouter = require("./routes/Users")
const newUserRouter = require("./routes/NewUsers")


const orderRouter = require("./routes/orders")


const productRouter = require("./routes/products")


const customerRouter = require("./routes/customers")


const historyRouter = require("./routes/history")

const discountRouter = require("./routes/discount")


const paymentRouter = require("./routes/payments")



app.use(bodyParser.json())  
app.use(cors())


app.use(supplierRouter)
app.use(userRouter)
app.use(newUserRouter)


app.use(orderRouter)


app.use(productRouter)
app.use('/uploads', express.static('uploads'));


app.use(customerRouter)


app.use(historyRouter)

app.use(discountRouter)


app.use(paymentRouter)



const PORT = 8070;
const URL = "mongodb+srv://ridmikranasinghe:kawya25106@delivery.tvxhkre.mongodb.net/supplier?retryWrites=true&w=majority&appName=Delivery"

mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true })
.then(() =>{
    console.log("DB Connect")
})
.catch((err) =>console.log("DB Connection Error", err))

app.listen(PORT, () =>{
    console.log("App is running on  ",PORT)  
})