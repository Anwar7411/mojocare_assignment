const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    date : {type:String,required:true},
    time : {type:String,required:true},
    docterid : {type:String,},
    image:{type:String},
    fullname:{type:String},
    expertise:String,
    experience:String,
    userid:{type:String},
})

const ApointmentModel = mongoose.model("appointments", appointmentSchema)

module.exports = {
   ApointmentModel
}