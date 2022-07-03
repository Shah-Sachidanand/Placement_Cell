//Schema for the Students
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    batch:{
        type:String,
        required:true,
    },
    college: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Placed", "Not_Placed"],
    },
    score:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseScore", 
    }
},{
    timestamps:true,
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;