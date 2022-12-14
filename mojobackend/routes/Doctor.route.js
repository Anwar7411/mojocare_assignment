const express=require('express')

const {DoctorModel}=require('../models/Doctor.model')

const DoctorRoute=express.Router();


DoctorRoute.post("/signup",async(req,res)=>{
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




DoctorRoute.patch("/edit/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const appointment=await DoctorModel.findOne({_id:id})
    try{
         await DoctorModel.findByIdAndUpdate({_id:id},payload)
            res.send("Data Updated Successfully")
    }
    catch(err){
        res.send("Error in updating")
    }
})

module.exports={DoctorRoute}
