const mongoose = require("mongoose")
const {Schema} = mongoose;

const StudentInfo = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            unique : true,
            required : true
        },
        des : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
);

const LoginModel = mongoose.model('LoginModel' , StudentInfo)

module.exports = {LoginModel}