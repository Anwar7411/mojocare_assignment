const express=require('express')

const {DoctorModel}=require('../models/Doctor.model')

const DoctorRoute=express.Router();


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
