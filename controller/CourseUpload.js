const { Course } = require("../model/CoursesModel");
const cloudinary = require("../utils/cloudinary");
const upload = require("../MiddleWares.js/Multerr");

const CourseUploader = async (req, res) => {
    try {
        const { course_name, course_desc } = req.body;
        const files = req.files;

        if (!course_desc || !course_name || !files) {
            return res.status(400).json("Fields cannot be empty or files not provided!");
        }

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
        // Create a new course with the uploaded images and videos
        const new_course = new Course({
            course_name: course_name,
            course_desc: course_desc,
            course_images: images,
            course_videos: videos
        });
        // console.log(new_course)
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

const GetAllCourses = async(req , res) => {
    try{
        const courses = await Course.find();
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

module.exports = { CourseUploader , OneCourse , GetAllCourses};
