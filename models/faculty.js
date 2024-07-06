const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const facultySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    },
    position:{
        type:String,
        enum:['Instructor', 'Assistant', 'Professor'],  
        require: true
    },
    ispresent:{
        type:Boolean,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
})


facultySchema.pre('save', async function(next){ ////////////////////pre --it a method used in mongodb to hash the password just before saving the data in database
    const faculty = this; 
    //Hash the password only if the password has been modified (or is new)
    if(!faculty.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);   //////salt of ten length is created
        const hashedPassword = await bcrypt.hash(faculty.password,salt); //////here hash password is generated using person password and salt 
        faculty.password=hashedPassword ;
        next();
    } catch (error) {
        return next(error);
    }
})


facultySchema.methods.comparePassword = async function(candidatepassword){
    try{
        const isMatch = await bcrypt.compare(candidatepassword, this.password);
        return isMatch;
    }catch(error){
        throw error;
    }
}
const Faculty =mongoose.model('Faculty', facultySchema);
module.exports=Faculty;
