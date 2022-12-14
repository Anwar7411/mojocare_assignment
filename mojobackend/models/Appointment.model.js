const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema({
    date : {type:String,required:true},
    time : {type:String,required:true},
    docterid : {type:String,required:true},
    userid:{type:String,required:true},
    adminid : {type:String},
})

const ApointmentModel = mongoose.model("appointments", appointmentSchema)

module.exports = {
   ApointmentModel
}