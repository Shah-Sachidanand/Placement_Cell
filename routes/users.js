//Employee(user) Router
const express=require('express');
const router = express.Router();

//Passport setup in router for validation
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.get("/sign-out", usersController.destroySession);
router.get("/home", usersController.home);
router.post("/create", usersController.createUser);

//use passport as a middleware to authenticate
router.post("/create-session",passport.authenticate("local", { failureRedirect: "/users/sign-in" }),usersController.createSession);

//export router
module.exports = router;