const express=require('express')
const {ApointmentModel}=require('../models/Appointment.model')

const AppointmentRoute=express.Router()

AppointmentRoute.get("/:userid",async(req,res)=>{
    const userid=req.params;
    const adminid="";
    try{
        if(userid==adminid){
            const allAppointments=await ApointmentModel.find()
            res.send(allAppointments)
        }else{
            const appointments=await ApointmentModel.find({$or:[{userid},{doctorid:userid}]})       
            res.send(appointments)
        }     
    }
    catch(err){
        console.log(err);
        res.send("Error in getting appointment data please try again later!")
    }  
})

AppointmentRoute.post("/createappointment/:id",async(req,res)=>{
    const payload=req.body;
    const doctorid=req.params;
    const userid=req.query.userid;
    const data={...payload,userid,doctorid}
    try{
        const appointments=new ApointmentModel(data);
        await appointments.save();
        res.send("Appointment created with doctor Successfully")
    }
    catch(err){
        res.send("Error in creating appointment please try again later")
        console.log(err)
    }
})

AppointmentRoute.patch("/edit/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params
    const appointment=await ApointmentModel.findOne({_id:id})
    try{
         await ApointmentModel.findByIdAndUpdate({_id:id},payload)
            res.send("Appointment Updated Successfully")
    }
    catch(err){
        res.send("Error in updating Appointment")
    }
})

AppointmentRoute.delete("/delete/:id",async (req,res)=>{
    const id=req.params
    const appointment=await ApointmentModel.findOne({_id:id})
    try{
            await TodoModel.findByIdAndDelete({"_id":Todoid})
            res.send("Appointment deleted Successfully")
    }
    catch(err){
        res.send("Error in deleting Appointment")
    }
})

module.exports={AppointmentRoute}
