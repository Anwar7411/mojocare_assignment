const express=require('express')

const {UserModel}=require('../models/Users.model')

const UserRoute=express.Router();

UserRoute.post("/signup",async(req,res)=>{
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
