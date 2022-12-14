const jwt=require('jsonwebtoken')

const Auth=((req,res,next)=>{
const token=req.headers?.authorization?.split(" ")[1]

if(token){
    const decoded = jwt.verify(token, 'login')
    
    if(decoded){
        req.body.userid=decoded.userid
        next();
    }else{
        res.send("Please Login")
    }
}else{
    res.send("Please Login")
}
})

module.exports={Auth}