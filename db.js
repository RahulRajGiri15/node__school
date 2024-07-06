///here we make server of database  

const mongoose = require('mongoose');
require('dotenv').config();


//mongoose.connect('mongodb://localhost:27017/school');
const MONGODBURL_OFFLINE = process.env.MONGODBOFFLINE;
const MONGODBURL_ONLINE = process.env.MONGODBURLONLINE;

//mongoose.connect(MONGODBURL_OFFLINE);
mongoose.connect(MONGODBURL_ONLINE);
const db = mongoose.connection;

///event handleing
db.on('connected',()=>{
    console.log("Your server is on ");
})
db.on('error',(err)=>{
    console.log(" there is error "+err);
});
db.on('diconnected',()=>{
    console.log("server is disconnected");
});
module.exports=db;