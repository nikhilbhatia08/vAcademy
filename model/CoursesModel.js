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
    course_images : [{
        mediaType : String,
        url : {
            type : String,
            required  :true
        },
        public_id : {
            type : String,
            required : true
        }
    }],
    course_videos : [{
        mediaType : String,
        url : {
            type : String,
            required  :true
        },
        public_id : {
            type : String,
            required : true
        }
    }]
})

const Course = mongoose.model('Course' , CourseSchema);

module.exports = {Course};