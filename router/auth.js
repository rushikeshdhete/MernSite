const { json } = require("express");
const express = require("express");
const router = express.Router();
require("../DataBase/connect");
const User = require("../model/schema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");



router.get("/", (req, res)=>{
    res.send("Home router");
});

// router.post('/register', (req,res)=>{
//    const {name, email, phone, work, password, cpassword} = req.body;
   
//    if(!name || !email|| !phone|| !work || !password ||  !cpassword )
//    {
//        return res.status(422).json({err: "Plz fill All deteils"});
//    }
//    User.findOne({email:email})
//    .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({err: "Email exist"});
//         }

//         const user  = new User({name, email, phone, work, password, cpassword});
//         user.save().then(()=>{
//             res.status(422).json({err: "User Register Successfully"});
//         }).catch((err)=>{
//             res.status(500).json({err : "fail register"});
//         })
//     }).catch(err => {console.log(err)});
// }); 


router.post('/register', async (req,res)=>{
       
    const {name, email, phone, work, password, cpassword} = req.body;
       
       if(!name || !email|| !phone|| !work || !password ||  !cpassword )
       {
           return res.status(422).json({err: "Plz fill All deteils"});
       }
      try{

        const userExist = await User.findOne({email:email})
        
        if(userExist){
            return res.status(422).json({err: "Email exist"});
        }else if(password != cpassword)
        {
            return res.status(422).json({err: "password not match"});
        }

        const user  = new User({name, email, phone, work, password, cpassword});

        await user.save();
     
        return res.status(201).json({message: "User Register Successfully"});
        

      }catch(err){
        console.log(err);
      }
    }); 


// LOGIN KA CODE

router.post('/signin', async (req, res)=>{
    try{
        let token;
        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({error : "Pleas fill data"});
        }
        const userLogin = await User.findOne({email:email});
        if(userLogin)
        {
            const verify = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            // console.log(token);

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!verify)
            {
                res.status(400).json({err: "Invalid credentials"});
            }
            else{
                res.status(200).json({message: "Login Successfull"});
            }
        }else{
            res.status(400).json({err: "Invalid credentials"});
        }
        
    }catch(err){
        console.log(err);
    }
});


// aboutus ka page

router.get('/about',authenticate, (req, res)=>{
    res.send(req.rootUser);
})

// get user contact and home

router.get('/getdata',authenticate, (req, res)=>{
    res.send(req.rootUser);
})

router.post("/contact", authenticate, async (req, res)=>{
    try{

        const {name, email, phone, message} = req.body;
        console.log(name)

        if(!name || !email || !phone || !message){
            return res.json({error : "plzz fill all deteils"});
        }

        const userContact = await User.findOne({_id:req.userId});
        if(userContact){

            const userMsg = await userContact.addMsg(name, email, phone , message );
            await userContact.save();
            res.status(201).json({message:"contact sucessfull"});
        }

    }catch(err){
        console.log(err);
    }
})

// logout 

router.get('/logout',(req, res)=>{

    res.clearCookie('jwtoken', { path : "/"});
    res.status(200).send("user logout");
})


module.exports = router