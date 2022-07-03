const Interview = require('../models/interview');

//Controller for the Creating the Comapny and Interview
module.exports.createInterview = async function(req,res){
    try{
          
        let interview = await Interview.create({
            company:req.body.company,
            profile:req.body.profile,
        });
        return res.redirect('/interviews/fetch-interview');
    }catch(err){
        console.log('*** Error in creating the Interview ***',err);
        return res.redirect('back');    
    }
}

//Controller for fetching the Interviews List
module.exports.fetchInterview = async function(req,res){
    try{
        let interview = await Interview.find({}).sort('-createdAt');
        return res.render('interview',{
            title:'Placements | Interview',
            interview:interview,
        });
    }catch(err){
        console.log('*** Error in fetching the Interview ***',err);
        return res.redirect('back');
    }
}