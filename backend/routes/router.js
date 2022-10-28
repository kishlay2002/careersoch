const express= require("express");
const router= new express.Router();
const User= require("../models/user");
const bcrypt = require("bcrypt");

router.post('/register',async(req,res)=>{
    console.log(req.body);
    var recruiter_flag= req.body.recruiter_value == "Recruiter" ? 1 : 0;
    
    const userDetails= new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        cpassword:req.body.cpassword,
        recruiter_flag : recruiter_flag,
        status : 'Active'
    });
    console.log("after parsing");
 try{
    const doc= await User.findOne({email: req.body.email});
    if(doc)
    {
        res.status(422).json({ error: "This email is already exist" });
    }
    else if (password !== cpassword) {
        res.status(422).json({ error: "password are not matching" });
    }
    else{
        const storedata= await userDetails.save();
        console.log("successfully added in database");
        res.status(201).json(storedata);
    }
    
    
 }
 catch(error)
 {
    console.log("Error : ", err);
    res.status(500).json({
      message: "internal server error"
    });
 }
});

router.post("/login",async(req,res)=>{
    let email = req.body.email;
  let password = req.body.password;
  console.log("Email entered", req.body.email);
  console.log("Password entered", req.body.password);
  const userDetails = new User({
    email: req.body.email,
    password: req.body.password
  });
  try{
    const userlogin = await User.findOne({ email: email,status:'Active'});
    console.log(userlogin);
    if(userlogin)
    {
        const isMatch= await bcrypt.compare(password,userlogin.password);
        if(!isMatch)
        {
            res.status(400).json({error:"invalid credential"});
        }
        else{
            const token= await userlogin.generatAuthtoken();
            console.log(token);
            res.status(201).json(userlogin);
        }
    }
    else{
        res.status(400).json({error: "user doesnot exist"});
    }
  }
  catch(error)
  {
    res.status(400).json({ error: "invalid crediential pass" });
    console.log("error the bhai catch ma for login time" + error.message);
  }
});

router.post('/updateProfile',async(req,res)=>{
    console.log("insilde update profilr : ",req.body);
    console.log("student flag is: ",req.body.student_flag);
    var workexperience= "";
    var educationDetails="";
    if(req.body.company != undefined && req.body.experience!='')
    {
        workexperience = req.body.experience +" years of experience at : " + req.body.company;
    }
    if(req.body.school != undefined && req.body.education !='') {
        educationDetails = "Pursued " +req.body.education + " at " + req.body.school;
    }
    var student_flag= req.body.student_flag == true ? 1:0;
    var dataChange={$push : {workexperience: workexperience, educationDetails: educationDetails},$set:{
        last_name : req.body.last_name,
    email : req.body.email,
    job_title : req.body.job_title,
    address :req.body.city +","+req.body.state,
    state :req.body.state,
    city :req.body.city,
    country : req.body.country,
    student_flag : student_flag,
    school :req.body.school,
    zip_code :req.body.zip_code,
    company: req.body.company,
    experience :req.body.experience,
    education :req.body.education,
    skills :req.body.skills,
    profile_summary :req.body.profile_summary,
    profile_img :req.body.profileImage,
    status : req.body.status,
    headline : req.body.headline,
    resume_path : req.body.profileResume
    }}
    console.log("work details: ",workexperience);
    try{
        const userupdating= await User.updateOne({applicant_id : req.body.applicant_id},dataChange);
        console.log("after updation",userupdating);
       
        const result= await User.find({"applicant_id":req.body.applicant_id});
        console.log("response sent after updation is : ",result);
        res.status(200).json({
            message : "User profile updated",
            userProfileDetails : result
        });
    }
    catch(error)
    {
        console.log("error while updating user", err);
      res.status(400).json({
        message: "User profile could not be updated"
      });
    }
})
module.exports= router;