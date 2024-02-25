const express = require("express");
const router = express.Router();
const {CourseUploader , OneCourse , GetAllCourses} = require("../controller/CourseUpload")
const upload = require("../MiddleWares.js/Multerr")

router
    .post("/upload" , upload.any() , CourseUploader)
    .get("/getCourse/:c_id" , OneCourse)
    .get("/getOneCourse/All" , GetAllCourses)

module.exports = router;