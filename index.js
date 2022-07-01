const express = require('express');
const app = express();
const port = 5050;



app.use(express.urlencoded());


app.set('view engine', 'ejs');
app.set('views','./views');



//Use Express Router
app.use('/',require('./routes'))

// Server Listener
app.listen(port, function(err){
    if(err){
        console.log(`Error in Starting The Server : ${err}`);
    }
    console.log(`Server is Running On PORT: ${port}`);
})