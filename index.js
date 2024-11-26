var path=require('path');
const express= require('express');
const session = require('express-session');
const myApp=express();
const port=3001;
const cors=require('cors');
var authlinks = require('./routes/auth');
const db= require('./db-ops/dbHandler');

//url encoding support
myApp.use(
    express.urlencoded(
        {
            extended: true
        }
    )
);

//cors allow request from any source origin
var corsOptions={
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}
myApp.use(cors(corsOptions));

//session manage
myApp.use(
    session(
        {
            //secret key
            secret:'Khan0807',
            resave:true,
            saveUninitialized:true
        }
    )
)

//server side rendered front-end views
myApp.set('views',path.join(__dirname,'views'));
myApp.set('view engine','ejs');

//check login status
chkLogin = (req,res,next)=>{
    if(req.session.hasOwnProperty('loggedIn') && req.session.loggedIn==true){
        next();
    }
    else{
        req.session.ogPath=req.path;
        res.redirect("/login");
    }
}

//default
myApp.get('/',(req,res)=>{
    /*res.send("<h3>welcome</h3> welcome to api");*/
    res.render('welcome',{name:'Alfez'});
});

myApp.get('/usertypes',(req,res)=>{
    db.getUserTypes(req,res);
});

myApp.use('/auth',authlinks)

myApp.listen(
    port,()=>{
        console.log(`The server is running on http://localhost:${port}`)
    }
);