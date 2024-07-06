/////////////////In this be will be creating a Student server and a Student Database///////////////
////////////////Student server ----in this we will be writinge server commands of get and post 
///////////////post commands -----/ details ----send all the details of the student 
///////////////get commands ------ /details ----get all the details of the student /homepage ----get to homepage
///////////////Student Databases ----in this we will store student details like name , email ,id , address , mobile number 


const express = require('express')
const app = express()
const db = require('./db.js');

//importing authentication files 
const passport = require('./auth.js');

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})

require('dotenv').config();

/////using bodyparser
const bodyparser= require('body-parser')
app.use(bodyparser.json());///stores data in req.body

//Middleware function to date and time 
const logRequest =(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);


app.get('/',(req,res)=>{
    res.send("Welcome to College Managment System");
})

////importing routes 
const studentroutes = require('./routes/studentroutes.js');
//app.use('/student', localAuthMiddleware ,studentroutes);
app.use('/student',studentroutes);

const facultyroutes =require('./routes/facultyroutes.js');
app.use('/faculty',facultyroutes);







const PORT = process.env.PORT || 4000 
app.listen(PORT,( )=>{
    console.log("Server is running on localhost 4000");
})

