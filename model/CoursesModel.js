const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true
    }
    ,
    rating : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
})

const Course = mongoose.model('Course' , CourseSchema);

module.exports = {Course};