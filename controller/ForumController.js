const {Forum} = require("../model/ForumModel")
const cloudinary = require("../utils/cloudinary");

const Create_Forum = async(req , res) => {
    try{
        const data = req.body;
        const files = req.files

        const images = [];
        const uploadPromises = files.map((file) => {
            return new Promise(async (resolve, reject) => {
                const mediatype = file.mimetype.startsWith('image') ? 'image' : 'video';

                try {
                    const result = await cloudinary.uploader.upload(file.path, {
                        resource_type: mediatype
                    });

                    console.log(result)

                    if (mediatype === 'image') {
                        images.push({
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

        const new_Forum = new Forum({
            Author_id : data.id,
            Author_name : data.name,
            Description : data.Description,
            Author_images : images,
            Total_likes : 0,
            Liked_Users : [],
            Commenters_reply : []
        })

        await new_Forum.save()
        .then(()=>{
            return res.status(200).json(new_Forum);
        })
        .catch((err)=>{
            console.log(err);
            return res.status(400).json("Unable to Process Forum")
        })
    }
    catch(err){
        console.log(err)
    }
}

const Post_Comment = async(req , res) => {
    const {id}= req.params;
    try{
        const data = req.body;
        const files = req.files;

        const images = [];
        const uploadPromises = files.map((file) => {
            return new Promise(async (resolve, reject) => {
                const mediatype = file.mimetype.startsWith('image') ? 'image' : 'video';

                try {
                    const result = await cloudinary.uploader.upload(file.path, {
                        resource_type: mediatype
                    });

                    console.log(result)

                    if (mediatype === 'image') {
                        images.push({
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

        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        nd = new Date(utc + (3600000*+5.5));
        var ist =  nd.toLocaleString();

        const new_comment = {
            Commenters_id : data.id,
            Commenters_name : data.name,
            Commenters_reply : data.reply,
            Commenters_images : images,
            time : ist
        }

            await Forum.findByIdAndUpdate(
            id,
            {
                $push : {
                    Comments : new_comment
                }
            },
            {
                new : true
            }
        )
        .then((info) => {
            return res.status(200).json(info);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json("Error while uploading comment")
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json("Error uploading comment")
    }
}

const LikeForum = async(req , res) => {
    try{
        const {userId , ForumId} = req.params;
        await Forum.findById(
            ForumId,
            {
                $set : {
                    Total_likes : Total_likes + 1
                },
                $push : {
                    Liked_Users : userId
                }
            },
            {
                new : true
            }
        )
        .then(resp => {
            console.log(resp);
            return res.status(200).json("succesfully liked")
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json("Cannot Like Post")
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Cannot Like Post")
    }
}

const UnlikeForum = async(req , res) => {
    try{
        const {userId , ForumId} = req.params;
        await Forum.findByIdAndUpdate(
            ForumId,
            {
                $set : {
                    Total_likes : Total_likes - 1
                },
                $pull : {
                    Liked_Users : userId
                }
            },
            {
                new : true
            }
        )
        .then(resp => {
            console.log(resp);
            return res.status(200).json("succesfully liked")
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json("Cannot Like Post")
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Cannot Like Post")
    }
}

module.exports = {
    Create_Forum,
    Post_Comment,
    LikeForum,
    UnlikeForum
}