
const AdminAuth=((req,res,next)=>{
    const adminid="6399fc73a8a5115558ab789a";
    const userid=req.body.userid
            if(userid==adminid){
               
                next();
            }else{
                res.send("Your not Authorized")
            }
})

module.exports={AdminAuth}