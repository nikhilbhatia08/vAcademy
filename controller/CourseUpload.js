const { Course } = require("../model/CoursesModel");
const {Cat} = require('../model/CategroyModel')
const {Top} = require('../model/TopTable')
const cloudinary = require("../utils/cloudinary");
const upload = require("../MiddleWares.js/Multerr");
const { Db } = require("mongodb");

const CourseUploader = async (req, res) => {
    try {
        const { name, desc, instructor, price, obj, sec } = req.body;
        const files = req.files;
        console.log(files);
        //console.log(sections);
        const sections = JSON.parse(sec);
        const objs = JSON.parse(obj);

        if (!desc || !name || !files) {
            return res.status(400).json("Fields cannot be empty or files not provided!");
        }
        // console.log(sections)
        // console.log(objs)


        const images = [];
        const videos = [];

        const uploadPromises = files.map((file) => {
            return new Promise(async (resolve, reject) => {
                const mediatype = file.mimetype.startsWith('image') ? 'image' : 'video';

                try {
                    const result = await cloudinary.uploader.upload(file.path, {
                        resource_type: mediatype
                    });

                    if (mediatype === 'image') {
                        images.push({
                            mediaType: mediatype,
                            url: result.secure_url,
                            public_id : result.public_id
                        });
                    } else {
                        videos.push({
                            mediaType: mediatype,
                            url: result.secure_url,
                            public_id : result.public_id
                        });
                    }

                    resolve();
                } catch (error) {
                    console.error(error);
                    reject(new Error("Error while uploading to Cloudinary"));
                }
            });
        });


        await Promise.all(uploadPromises);

        const secs = [];

        sections.map((sec, idx) => {
            secs.push({
                section_title: sec.section_title,
                lectures: sec.lectures.map((lec, idx) => {
                    return {
                        title: lec.lecture_title,
                        duration: lec.duration,
                        video_url: videos[idx]
                    }
                })
            })
        })

        console.log(images);

        // const crs = []
        // const help = JSON.parse(courseobjs);
        // help.map((obj, idx) => {
        //     crs.push(obj.obj);
        // })
        // Create a new course with the uploaded images and videos
        const new_course = new Course({
            course_name: name,
            course_desc: desc,
            instructor: instructor,
            price: price,
            img_url: images[0].url,
            courseobjs: objs,
            sections: secs
        });
        console.log(new_course)
        await new_course.save();

        return res.status(200).json("Course uploaded successfully");
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }
};

const OneCourse = async(req , res) => {
    try{
        const {c_id} = req.params;
        const data = await Course.findById(c_id);
        if(!data){
            return req.status(400).json("No Such Course Exists");
        }
        return res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Unable to fetch required course");
    }
}

const getbyid = async(req, res) => {
    try{
        const {id} = req.body.id;
        const courses = await Course.findOne({id: id});
        if(!courses){
            return res.status(200).json("No Courses Exists");
        }
        return res.status(200).json(courses);
    }
    catch(err){
        console.log(err);
        return res.status(400).json("unable to fetch all courses");
    }
}

const getCats = async(req, res) => {
    try{
        const cats = await Cat.find({});
        if(!cats){
            return res.status(200).json("No Categories Exists");
        }
        return res.status(200).json(cats);
    }
    catch(err){
        console.log(err);
        return res.status(400).json("unable to fetch all courses");
    }
}

const postCats = async(req, res) => {
    //console.log("Hellop")
    try{
        const {name} = req.body;
        const category = new Cat({
            name: name,
            AllCourses: [{}]
        })
        await category.save();
        return res.status(200).json("Created the category")
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Internal sever error");
    }
}

const postCoursesInCats = async(req, res) => {
    try{
        const {id, id2, name, price, instructor, ins_desc, rating, img_url} = req.body;
        const findCat = Cat.findOne({id: id});
        if(!findCat) {
            return res.status(400).json("No such category exist")
        }

        else {
            const new_course = {
                id: id2,
                name: name,
                price: price, 
                instructor: instructor,
                ins_desc: ins_desc,
                rating: rating, 
                img_url: img_url
            }
            await Cat.findByIdAndUpdate(
                id,
                {
                    $push : {
                        AllCourses : new_course
                    }
                },
                {
                    new : true
                }
            )
            return res.status(200).send("Updated")
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Internal Sevrer error")
    }
}

const insertInTop = async(req, res) => {
    try{
        const {name} = req.body;
        const top = new Top({
            name: name,
            AllCourses: []
        })
        await top.save();
        return res.status(200).json("Created the category in the top table")
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Internal sever error");
    }
}

const getAllTop = async(req, res) => {
    try{
        const getall = await Top.find({});
        return res.status(200).json(getall)
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
}

const insertCourseInTop = async(req, res) => {
    try{
        const {id, id2, name, price, instructor, ins_desc, rating, img_url} = req.body;
        const findCat = Top.findOne({id: id});
        if(!findCat) {
            return res.status(400).json("No such category exist")
        }

        else {
            const new_course = {
                id: id2,
                name: name,
                price: price, 
                instructor: instructor,
                ins_desc: ins_desc,
                rating: rating, 
                img_url: img_url
            }
            await Top.findByIdAndUpdate(
                id,
                {
                    $push : {
                        AllCourses : new_course
                    }
                },
                {
                    new : true
                }
            )
            return res.status(200).send("Updated")
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json("Internal Sevrer error")
    }
}

const GetAllCourses = async(req , res) => {
    try{
        const courses = await Course.find({});
        if(!courses){
            return res.status(200).json("No Courses Exists");
        }
        return res.status(200).json(courses);
    }
    catch(err){
        console.log(err);
        return res.status(400).json("unable to fetch all courses");
    }
}

module.exports = { CourseUploader , OneCourse, getAllTop , insertCourseInTop, getbyid, insertInTop, postCoursesInCats, getCats, postCats, GetAllCourses};
