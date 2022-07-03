//Controller for the Employee
const User = require('../models/user');

//Render Home Page
module.exports.home = (req, res) => {
    return res.render("home", {
      title: "Placements Cell | Home",
    });
  };

//Controller for the Sign-Up Page
module.exports.signUp = (req,res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    return res.render('user_sign_up',{title:'Placements | SignUp'});
}

//Controller for the Sign-In Page
module.exports.signIn = (req,res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    return res.render('user_sign_in',{title:'Placements | SignIn'});
}

//Controller for get the Sign-Up Data
module.exports.createUser = (req, res) =>{
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, (err, user) => {
        if(err){console.log('error in finding user in signing up'); return;}

        if (!user){
            User.create(req.body, (err, user) => {
                if(err){console.log('error in creating user while signing up'); return;}

                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}


//Controller for Sign-In and create a session for the user
module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

//Controller for Log-Out the session
module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/');
}

