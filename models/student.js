const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const studentSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number

    },
    section:{
        type:String,
        enum:["A","B","C","D"],
        require:true
    },
    Attendence:{
        type:Number,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String
        
    },
    CGPA:{
        type:Number,
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
        
    }


})


studentSchema.pre('save', async function(next){ ////////////////////pre --it a method used in mongodb to hash the password just before saving the data in database
    const student =this; 
    //Hash the password only if the password has been modified (or is new)
    if(!student.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);   //////salt of ten length is created
        const hashedPassword = await bcrypt.hash(student.password,salt); //////here hash password is generated using person password and salt 
        student.password=hashedPassword ;
        next();
    } catch (error) {
        return next(error);
    }
})

studentSchema.methods.comparePassword = async function(candidatepassword){
    try{
        const isMatch = await bcrypt.compare(candidatepassword, this.password);
        return isMatch;
    }catch(error){
        throw error;
    }
}


const Student = mongoose.model('Student',studentSchema);
module.exports = Student;