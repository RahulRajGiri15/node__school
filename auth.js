/*

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const student = require('./models/student');
const faculty = require('./models/faculty');
passport.initialize();
passport.use(new LocalStrategy(async(username, password, done)=>{
    /// authentication logic here
    try {
        console.log("crediticals received:", username,password);
        let user = await student.findOne({username: username});
        if(!user) 
            {
                return done(null,false,{message:"incorrect username."});
                const isPasswordMatch = await user.comparePassword(password);
                if(isPasswordMatch){
                    return done(null,user);
                    }
                else {
                    return done (null,false,{message:"incorrect password."});
                }
        }
        user = await faculty.findOne({username:username});
        if(!user) return done(null,false,{message:"incorrect username."});
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else {
            return done (null,false,{message:"incorrect password."});
        }

    }
    
    catch (error) {
        return done(error);
    }
}))

module.exports =passport;/////Export config passport

*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const student = require('./models/student');
const faculty = require('./models/faculty');

// Initialize passport
passport.initialize();

// Use LocalStrategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log("Credentials received:", username, password);

        // Check for student
        let user = await student.findOne({ username: username });
        if (!user) {
            // Check for faculty if student not found
            user = await faculty.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password." });
        }

    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // Export configured passport
