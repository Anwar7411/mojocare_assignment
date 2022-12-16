import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const initialvalues={
        email:"",
        password:"",
      }
        const[values,setValues]=useState(initialvalues)
        const[selectchoice,setSelectchoice]=useState("user")
        const navigate=useNavigate()
        const handlechange=(e)=>{
          const valuechanged=e.target.value;
          setValues({...values,[e.target.name]:valuechanged})
        }
        const handleSubmit=(e)=>{
          e.preventDefault()
          if( values.email!=""  && values.password!=""){
            axios({
              method: 'post',
              url: `http://localhost:8080/login/${selectchoice}`,
              data:values
          })
          .then((res)=>{
            localStorage.setItem("token",res.data.token)
            alert(res.data.msg?res.data.msg:res.data);
          res.data.msg=="Login successfull"?navigate("/dashboard"):navigate("/login")
          })
          .catch((err)=>alert("Something went please try again later!"))
          .finally(setValues(initialvalues))
          }else{
            alert("Enter all details")
          }
        }
        
      return (
        <div>
          <div style={{display:"flex",gap:"20px",marginLeft:"34%"}}>
            <button onClick={()=>setSelectchoice("user")}>Login As A User</button>
            <button onClick={()=>setSelectchoice("doctor")}>Login As A Doctor</button>
            <button onClick={()=>setSelectchoice("admin")}>Login As A Admin</button>
          </div>
          <div className='signupmaindiv'>
            <h3>Your Loging As {selectchoice}</h3>
          <form onSubmit={handleSubmit} className="signupform">
            <label>Email</label><br />
            <input type="email" value={values.email} placeholder="Email" name="email" onChange={handlechange}/><br />
            <label>Password</label><br />
            <input type="password" value={values.password} placeholder="Password" name="password" onChange={handlechange}/><br />
            <input type="Submit" />
          </form>
        </div>
        </div>
        
      )
}

export default Login