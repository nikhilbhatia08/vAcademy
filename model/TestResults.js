const { Double } = require("mongodb")
const mongoose = require("mongoose")

const Result_Schema = new mongoose.Schema({
    Test_id : {
        type : String,
        required : true
    },
    Test_Name : {
        type : String,
        required : true
    },
    Test_Scores : [{
        student_id : {
            type : String,
            required : true
        },
        student_name : {
            type : String,
            required : true
        },
        student_score : {
            type : Number,
            required : true
        }
    }]
},
{
    timestamps : true
})

const Test_Result = mongoose.model("Test_Result" , Result_Schema)
module.exports = {
    Test_Result
}

