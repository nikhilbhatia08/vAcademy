const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    Test_name : {
        type : String,
        required : true
    },
    Test_date : {
        type : String,
        required : true
    },
    Test_Timings : {
        type : String,
        required : true
    },
    conducted : {
        type : Boolean,
        required : true
    },
    Questions : [
        {
            Q_name : {
                type : String,
                required : true
            },
            opt_1 : {
                type : String,
                required : true
            },
            opt_2 : {
                type : String,
                required : true
            },
            opt_3 : {
                type : String,
                required : true
            },
            opt_4 : {
                type : String,
                required : true
            },
        }
    ]
},{
    timestamps : true
})

const Test = mongoose.model('Test' , TestSchema);
module.exports = {Test};