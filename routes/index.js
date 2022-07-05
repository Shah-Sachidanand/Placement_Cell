//include express
const express = require("express");
const router = express.Router();
//import passport for authentication on url
const passport = require('passport');

const homeController = require("../controllers/home_controller");
router.get("/", homeController.home);

//redirect ther URLs to their respective routes
router.use('/users', require('./users'));
router.use('/students',passport.checkAuthentication,require('./students'));
router.use('/interviews',passport.checkAuthentication,require('./interviews'));
router.use('/scheduling',passport.checkAuthentication,require('./interviewSchedules'));
router.use('/csv',passport.checkAuthentication,require('./csv'));
router.use('/github-jobs',passport.checkAuthentication,require('./github'));

module.exports=router;