
//Database Connection File
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Sachiii:Sachiii@cluster0.qfobsr3.mongodb.net/Placement-Cell?retryWrites=true&w=majority',{useNewUrlParser:true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB:"));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;