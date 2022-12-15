const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const cors = require("cors")

const {connection} = require("./server")
const {AppointmentRoute}=require('./routes/Appointment.route');
const { AdminRoute } = require("./routes/Admin.route");
const { DoctorModel } = require("./models/Doctor.model");
const { UserModel } = require("./models/Users.model");
const { AdminModel } = require("./models/Admin.model");
const { Auth } = require("./middlewares/Authorization");
const { AdminAuth } = require("./middlewares/AdminAuthorization");
const { UserRoute } = require("./routes/User.route");
const { DoctorRoute } = require("./routes/Doctor.route");
const { SignupRoute } = require("./routes/SignupRoute.route");

const app = express();

app.use(express.json())

app.use(cors({
    origin : "*"
}))


app.post("/login/:name", async (req, res) => {
    const {name}=req.params;
    let model="";
    if(name=="user"){
        model=UserModel
    }else if(name=="doctor"){
        model=DoctorModel
    }else if(name=="admin"){
        model=AdminModel
    }
    const {email, password} = req.body;
    try{
        const user = await model.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userid":user[0]._id}, 'login');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed! wrong password")
            }
      })} 
      else{
        res.send("Login failed! Your in wrong domain verify heading")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})




app.use("/signup",SignupRoute)

app.use(Auth)
app.use("/appointment",AppointmentRoute)
app.use("/users",UserRoute)
app.use("/doctor",DoctorRoute)

 app.use(AdminAuth)
app.use("/admin",AdminRoute)




app.listen(8080, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 8080")
})

