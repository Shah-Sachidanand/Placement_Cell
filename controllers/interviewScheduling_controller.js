const Interview = require('../models/interview');
const Student = require('../models/student');

//Controller for Scheduling Page
module.exports.scheduleInterview = async function(req,res){
    try{
        let interview = await Interview.findById(req.params.id).populate({
            path:'listofstudents.student',
            model:'Student'
        });

        let student = await Student.find({});

        return res.render('schedule_interview',{
            title:'Placement | Schedule Interview',
            interview:interview,
            student:student,
        });
    }catch(err){
        console.log('*** Error in Scheduling the interview controller ***',err);
        return res.redirect('back');
    }
}

//Controller for Adding the students and schedule the interview
module.exports.addStudent = async function(req,res){
    try{
        let schInterview = await Interview.findById(req.params.id).populate({
            path:'listofstudents.student',
            model:'Student'
        });
        
        if(schInterview){
            let student =  schInterview.listofstudents;
            for(let i=0;i<student.length;i++){
                if(student[i].student == req.body.student){
                    console.log('Already Scheduled on the same date');
                    return res.redirect('back');
                }
            }
        }
        await schInterview.listofstudents.push({
            student:req.body.student,
            date:req.body.date,
        });
        await schInterview.save();
        return res.redirect('back');
    }catch(err){
        console.log('*** Error in adding to interview student controller ***',err);
        return res.redirect('back');
    }
}

//controller for updating the result
module.exports.updateResult = async function(req,res){
    try{
        let schInterview = await Interview.findById(req.params.id).populate({
            path:'listofstudents',
            model:'Student'
        });
        let studentID = req.body.student;
        
        if(schInterview){
            let stid = schInterview.listofstudents;
        
            for(let i=0;i<stid.length;i++){
                
                if(stid[i].student==studentID){
                    
                    stid[i].result = req.body.result;
                    schInterview.save();
                    return res.redirect('back');
                }
            }
        }
        return res.redirect('back');
    }catch(err){
        console.log('*** Error in updating to interview result controller ***',err);
        return res.redirect('back');
    }
}
