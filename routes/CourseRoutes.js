const express = require("express");
const router = express.Router();
const {CourseUploader} = require("../controller/CourseUpload")
const upload = require("../MiddleWares.js/Multerr")

router
    .post("/upload" , upload.any() , CourseUploader)

module.exports = router;