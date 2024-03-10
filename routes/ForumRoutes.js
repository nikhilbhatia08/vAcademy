const express = require("express")
const router = express.Router();
const {Create_Forum , Post_Comment , LikeForum , UnlikeForum, getPosts} = require("../controller/ForumController")
const upload = require("../MiddleWares.js/Multerr")

router
    .post('/CreateForum' , upload.any() , Create_Forum)
    .get('/get/all', getPosts)
    .patch('/NewComment/:id' , upload.any() , Post_Comment)
    .post("/likeForum/:userId/:ForumId" , LikeForum)
    .post("/unlikeForum/:userId/:ForumId" , UnlikeForum)

module.exports = router

