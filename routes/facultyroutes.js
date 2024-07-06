const express = require('express');
const router = express.Router();
const faculty = require('./../models/faculty');

const {jwtAuthMiddleware,generateToken} = require('./../jwt')

router.post('/signup', async(req,res)=>{
    try {
        const data =req.body
        console.log("Data is received")
        const newFaculty = new faculty(data);
        const response = await newFaculty.save();
        console.log('data saved');
        const payload = {   /////token contains payload and salt key to make token
            id:response.id,
            username : response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :    ",token);


        res.status(200).json({response:response ,token:token}  );//////200 -http response means that file is succesfully saved 
    
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})


// Login route
router.post('/login', async (req, res) => {
    try {
        // Extract username and password from request body 
       const { username, password } = req.body; 
       // Find the user by username 
       const user = await faculty.findOne({ username: username });
        // If user does not exist or password does not match, 
       
        if (!user || !(await user.comparePassword(password)))
            { 
               return res.status(401).json({ error: 'Invalid username or password' });
        } 
        const payload = { 
           id: user.id,
            email: user.email
            } // Generate JWT token 
       const token = generateToken(payload); // Send token in response
        res.json({ token });
        } catch (err) {
            console.error(err);
           res.status(500).json({ error: 'Internal Server Error' });
       } });


router.get('/',async(req,res)=>{
    try {
        const data =await faculty.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server Error"})
    }
})


//////now we will create a profile route in which when we will pass token of the profile than it will show the data of that person
router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
    try{
        const userId=req.user.id;
        const user = await faculty.findById(userId);
        // If user does not exist, return error 
        if (!user) { return res.status(404).json({ error: 'User not found' }); }
    //send user profile as json response    
    res.json(user);
} catch (err){
    console.log(err);
    res.status(500).json({error:"Internal server error"})
}

});

/////////int his all the persons with a particular kind of work will be displayed 
router.get('/:positionType:',async(req,res)=>{
    const positionType = req.params.positionType;////Extract the work type from the url parameters 
    try {
        if (positionType=="Instructor" || positionType=="Assistant" || positionType=="Professor"){
            const response = await person.find({position: positionType});
            console.log("data feteched"); 
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid positionType "});
        }
        }
     catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal error"});
    }
})
    


router.put('/:id',async(req,res)=>{
    try{
        const facultyID=req.params.id;
        const updatedfacultydata = req.body;
        const response =await faculty.findByIdAndUpdate(facultyID,updatedfacultydata,{
            new: true,
            runValidators:true,})
        
        if(!response){
            res.status(404).json({error:"person not found"})
        }
        console.log("data updated");
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal error"})
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const facultyID=req.params.id;
        const response =await faculty.findByIdAndDelete(facultyID);
        if(!response){
            res.status(404).json({error:"person not found"})
        }
        console.log("student deleted");
        res.status(200).json({message:"faculty succesfully deleted"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal error"})
    }
})

 
module.exports = router;

