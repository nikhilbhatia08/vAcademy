const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    AllCourses: [],
    TopCourses: [],
    FeaturedCourses: []
})

const Cat = mongoose.model('Cat' , CategorySchema);

module.exports = {Cat};