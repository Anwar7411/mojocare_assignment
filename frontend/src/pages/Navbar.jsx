import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate()
    const handlelogout=()=>{
        localStorage.setItem("token","")
        navigate("/login")
    }
    return (
        <div>
            <div>
                <Link to="/"><div>Home</div></Link>
               <Link to="/dashboard"><div>Dashboard</div></Link> 
                <Link to="/"><div>About Us</div></Link>
            </div>
            <div>
                <Link to="/login"> <div>Login</div></Link>
               <Link to="/signup"><div>Signup</div></Link>
                <div onClick={handlelogout}>Logout</div>
            </div>
        </div>
    )
}

export default Navbar