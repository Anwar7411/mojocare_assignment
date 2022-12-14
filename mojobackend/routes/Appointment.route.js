const express=require('express')
const {ApointmentModel}=require('../models/Appointment.model')

const AppointmentRoute=express.Router()

AppointmentRoute.get("/:userid",async(req,res)=>{
    const userid=req.params.userid;
    const adminid="6399fc73a8a5115558ab789a";
    try{
        if(userid==adminid){
            const allAppointments=await ApointmentModel.find()
            res.send(allAppointments)
        }else{
            const appointments=await ApointmentModel.find({userid})       
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
    const doctorid=req.params.id;
    const userid=req.body.userid;
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
    const id=req.params.id
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
    const id=req.params.id
    const appointment=await ApointmentModel.findOne({_id:id})
    try{
            await ApointmentModel.findByIdAndDelete({"_id":id})
            res.send("Appointment deleted Successfully")
    }
    catch(err){
        res.send("Error in deleting Appointment")
    }
})

module.exports={AppointmentRoute}
