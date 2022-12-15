const express=require('express')
const { DoctorModel } = require('../models/Doctor.model');
const bcrypt=require('bcrypt');
const { UserModel } = require('../models/Users.model');

const SignupRoute=express.Router();


SignupRoute.post("/doctorsignup",async(req,res)=>{
    const {email,password} = req.body;
    const payload=req.body;
    const userPresent = await DoctorModel.findOne({email})

    if(userPresent?.email){
        res.send("user already exist!")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new DoctorModel({...payload,password:hash})
                await user.save()
                res.send("Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again later")
       }
    }
    
})

SignupRoute.post("/usersignup",async(req,res)=>{
    const {email,password} = req.body;
    const payload=req.body;
    const userPresent = await UserModel.findOne({email})

    if(userPresent?.email){
        res.send("user already exist!")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new UserModel({...payload,password:hash})
                await user.save()
                res.send("Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again later")
       }
    }
    
})

module.exports={SignupRoute}