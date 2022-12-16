import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate()
    const handlelogout=()=>{
        localStorage.setItem("token","")
        navigate("/login")
    }
    return (
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:"30px"}}>
                <Link to="/"><div>Home</div></Link>
               <Link to="/dashboard"><div>Dashboard</div></Link> 
                <Link to="/"><div>About Us</div></Link>
            </div>
            <div style={{display:"flex",gap:"30px"}}>
                <Link to="/login"> <div>Login</div></Link>
               <Link to="/signup"><div>Signup</div></Link>
                <div onClick={handlelogout} style={{cursor:"pointer"}}>Logout</div>
            </div>
        </div>
    )
}

export default Navbar