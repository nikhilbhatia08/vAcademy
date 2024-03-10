const mongoose = require("mongoose");

const TopTableSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    AllCourses: [{}]
})

const Top = mongoose.model('Top' , TopTableSchema);

module.exports = {Top};