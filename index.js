//Express Server
const express = require('express');
const app = express();
const port = 5050;
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');

//Express Session
const session = require('express-session');               // used for session cookie
const MongoStore = require('connect-mongo')(session);

//Import Passport, passport local strategy
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Placements',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

//Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Use Express Router
app.use('/',require('./routes'))

// Server Listener
app.listen(port, function(err){
    if(err){
        console.log(`Error in Starting The Server : ${err}`);
    }
    console.log(`Server is Running On PORT: ${port}`);
})