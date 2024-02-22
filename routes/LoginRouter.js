const express = require("express")
const router = express.Router();
const {Register , Login} = require("../controller/StudentController")

router
    .post("/Register" , Register)
    .post("/Login" , Login)

module.exports = router