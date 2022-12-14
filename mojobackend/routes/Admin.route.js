const express=require('express')
const { AdminModel } = require('../models/Admin.model')

const AdminRoute=express.Router()

AdminRoute.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    const payload=req.body;
    const userPresent = await AdminModel.findOne({email})

    if(userPresent?.email){
        res.send("user already exist!")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new AdminModel({...payload,password:hash})
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


AdminRoute.delete("/doctordelete/:id",async (req,res)=>{
    const id=req.params.id;
    const userid=req.body.userid;
    console.log("userid2",userid)
    try{
            //await DoctorModel.findByIdAndDelete({_id:id})
            res.send("Appointment deleted Successfully")
    }
    catch(err){
        res.send("Error in deleting Appointment")
    }
})

AdminRoute.delete("/userdelete/:id",async (req,res)=>{
    const id=req.params.id
    try{
            await DoctorModel.findByIdAndDelete({_id:id})
            res.send("Appointment deleted Successfully")
    }
    catch(err){
        res.send("Error in deleting Appointment")
    }
})

module.exports={AdminRoute}
