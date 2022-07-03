//Importing the Models
const Student = require('../models/student');
const CourseScore = require('../models/coursescore');

const Interview = require('../models/interview');

//Controller for creating the new student
module.exports.createStudent = async function(req,res){
    try{
        let student = await Student.findOne({email:req.body.email});
        if(student){
            console.log('Student already exist');
            return res.redirect('back');
        }else{
            let student = await Student.create({
                name:req.body.name,
                email:req.body.email,
                college:req.body.college,
                batch:req.body.batch,
                status:req.body.status,
            });

            let score = await CourseScore.create({
                dsa:req.body.dsa,
                webd:req.body.webd,
                react:req.body.react,
                student:student._id
            });
            
            student.score=score._id;
            await student.save();
            
            let students = await Student.find({})
                .sort({name:1})
                .populate('score');
            

            return res.render('student',{
                title:'Placement | Students',
                students:students,
                score:score
            });
        }
    }catch(err){
        console.log('*** Error in creation of students ***',err);
        return res.redirect('back');
    }
}

//Contoller for the list of students
module.exports.fetchStudents = async function(req,res){
    try{
        let students = await Student.find({})
            .sort({name:1})
            .populate('score');

        return res.render('student',{
            title:'Placement | Students',
            students:students,
        });
    }catch(err){
        console.log('*** Error in fetching of students ***',err);
        return res.redirect('back');
    }
}