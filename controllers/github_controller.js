const axios = require('axios');

//controller for fetch the get request of github job
module.exports.fetchGithub = async function(req,res){
    try{
        const response = await axios.get('https://jobs.github.com/positions.json?description=python&full_time=true&location=sf');
        let resData = response.data;
        let resA = [];

        for(r of resData){
            let rObj = r;
            rObj.description = rObj.description
                .replace(/<[^>]+>/gm,'')
                .replace(/&nbsp;/g, ' ')
                .replace(/&rsquo;/, '\'')
                .replace(/(&ldquo;)|(&rdquo;)/g, '"')
                .replace(/&amp;/g,'&');
            resA.push(rObj);            
        }

        return res.render('github',{
            title:'Github Jobs',
            jobs:resA,
        });
    }catch(err){
        console.log('*** Error in Fetching GET request ***',err);
        return res.redirect('back');
    }
}