const express = require("express");
const router = express.Router();
const {CourseUploader , OneCourse , GetAllCourses, getbyid, postCats, getCats, postCoursesInCats, insertInTop, insertCourseInTop, getAllTop} = require("../controller/CourseUpload")
const upload = require("../MiddleWares.js/Multerr")

router
    .post("/upload" , upload.any() , CourseUploader)
    .post("/postCats", postCats)
    .post("/postincats", postCoursesInCats)
    .post("/postintop", insertInTop)
    .post("/pct", insertCourseInTop)
    .get("/get/top", getAllTop)
    .get("/getCourse/:c_id" , OneCourse)
    .get("/get/all" , GetAllCourses)
    .get("/getbyid", getbyid)
    .get("/getCats", getCats)
    




module.exports = router;