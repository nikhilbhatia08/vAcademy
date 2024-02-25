const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
    Author_id : {
        type : String,
        required : true
    },
    Author_name : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Author_images : [{
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
    Total_likes : {
        type : Number,
        required : true
    },
    Liked_Users : [{
            user_id : {
                type : String , 
                required : true
            }
        }],
    Comments : [
        {
            Commenters_id : {
                type : String,
                required : true
            },
            Commenters_name : {
                type : String,
                required : true
            },
            Commenters_reply : {
                type : String,
                required : true
            },
            Commenters_images : [{
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
            time : {
                type : String,
                required : true
            }
        }
    ]
},
{
    timestamps : true
})

const Forum = mongoose.model('Forum' , ForumSchema);

module.exports = {Forum}