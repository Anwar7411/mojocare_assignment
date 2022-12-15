const express=require('express');
const { DoctorModel } = require('../models/Doctor.model');

const {UserModel}=require('../models/Users.model')

const UserRoute=express.Router();

UserRoute.get("/getdoctors",async (req,res)=>{
    const userid=req.body.userid
    try{
        const doctor=await DoctorModel.find();
        res.send({data:doctor,userid:userid})
    }
    catch(err){
        console.log("error in getting doctor data",err)
        res.send("Something went wrong please try again later")
    }
    
})

UserRoute.patch("/edit/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const appointment=await UserModel.findOne({_id:id})
    try{
         await UserModel.findByIdAndUpdate({_id:id},payload)
            res.send("Data Updated Successfully")
    }
    catch(err){
        res.send("Error in updating")
    }
})

module.exports={UserRoute}
