const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    Test_name : {
        type : String,
        required : true
    },
    Test_Marks:
    {
        type : Number,
        required : true
    },
    Questions : [
        {
            question : {
                type : String,
                required : true
            },
            options : [],
            correct : {
                type : Number,
                required : true
            }
        }
    ]
},{
    timestamps : true
})

const Test = mongoose.model('Test' , TestSchema);
module.exports = {Test};