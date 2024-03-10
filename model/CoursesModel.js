const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    course_name : {
        type : String,
        required : true,
    },
    course_desc : {
        type : String,
        required : true
    }
    ,
    instructor : {
        type : String,
        required : true
    },
    img_url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    courseobjs: [],
    sections: [{}]
})

const Course = mongoose.model('Course' , CourseSchema);

module.exports = {Course};