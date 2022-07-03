//Schema for course scores of particular student
const mongoose = require('mongoose');

const courseScoreSchema = new mongoose.Schema({
    dsa:{
        type:Number,
        required:true,
    },
    webd:{
        type:Number,
        required:true,
    },
    react:{
        type:Number,
        required:true,
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }
},{
    timestamps:true,
});

const CourseScore = mongoose.model('CourseScore',courseScoreSchema);
module.exports = CourseScore;