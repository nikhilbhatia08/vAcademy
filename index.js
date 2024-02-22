const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();

const LoginRouter = require("./routes/LoginRouter")
const CourseRouter = require("./routes/CourseRoutes")
const PaymentsRouter = require("./routes/PaymentsRoutes")
const ForumRouter = require("./routes/ForumRoutes")
const TestRouter = require("./routes/TestRoutes")
var bodyParser = require('body-parser')


const port = process.env.PORT;
const URL = process.env.MONGO_KEY;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use("/User" , LoginRouter)
app.use("/Course", CourseRouter)
app.use("/payment" , PaymentsRouter)
app.use("/Forum" , ForumRouter)
app.use("/Test" , TestRouter)

app.get("/" , (req , res) => {
    return res.json("hey this is first page")
})


app.listen( port , () => {
    console.log(`Port started at ${port}`)
})

mongoose.connect(URL)
    .then(() => {
        console.log("database connected");
    })
    .catch(err => {
        console.log(err)
    })




