const mongoose = require("mongoose")

const adoctorSchema = mongoose.Schema({
    fullname : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
    expertise: {type:String,required:true},
    phone:{type:String,required:true},
    image:{type:String,required:true},
    experience:{type:String,required:true},
})

const DoctorModel = mongoose.model("doctors", adoctorSchema)

module.exports = {
   DoctorModel
}