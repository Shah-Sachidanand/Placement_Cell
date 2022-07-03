//Schema for fetching the details of students of particular interview selected
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
{
    company: {
        type: String,
        required: true,
    },
    profile:{
        type:String,
        required:true,
    },

    /*Taking Array of selected student with there result so that whenever 
    a particular interview selected so the list of all the students with their results*/
    listofstudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        date: {
            type: {
                $dateToString: { format: "%d-%m-%Y", date: "$date"},
            },
            required: true,
        },
        result: {
            type: String,
            enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
        },
    }],
},
{
    timestamps: true,
});

const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;