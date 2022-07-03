const Student = require('../models/student');
const Interview = require('../models/interview');
const {Parser} = require('json2csv');

module.exports.downloadCSV = async function(req,res){
    try{
        let interview = await Interview.find({}).populate({
            path:'listofstudents.student',
            model:'Student',
            populate:{
                path:'score',
                model:'CourseScore'
            }
        });
        
        let students = await Student.find({});

        //Convert Data to json
        let exportData = [];

        for(i of interview){
            for(s of i.listofstudents){
                let obj ={};

                obj['StudentID'] = s.student._id;
                obj['StudentName'] = s.student.name;
                obj['StudentCollege'] = s.student.college;
                obj['StudentStatus'] = s.student.status;
                obj['DSAScore'] = s.student.score.dsa;
                obj['WebdScore'] = s.student.score.webd;
                obj['ReactScore'] = s.student.score.react;
                obj['InterviewDate'] = s.date;
                obj['InterviewCompany'] = i.company;
                obj['InterviewProfile'] = i.profile;
                obj['InterviewResult']=s.result;
                exportData.push(obj);
            }
        }

        const fields = ['StudentID','StudentName','StudentCollege','StudentStatus','DSAScore','WebdScore',
                        'ReactScore','InterviewDate','InterviewCompany','InterviewProfile','InterviewResult'];

        const opts = {fields};

        //Parse the json to csv
        const parser = new Parser(opts);
        const csv = parser.parse(exportData);

        res.attachment('results.csv');
        res.status(200).send(csv);
    }catch(err){
        console.log('*** Error in Exporting the CSV of data controller ***',err);
        return res.redirect('back');
    }
}