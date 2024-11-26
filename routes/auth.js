const express=require('express');
var authRouter = express.Router();
const db = require('../db-ops/dbHandler');

authRouter.post('/adduser',(req,res)=>{
    db.createUser(req,res);
});
authRouter.post('/login',(req,res)=>{
    db.doLogin(req,res);
});

module.exports=authRouter;
