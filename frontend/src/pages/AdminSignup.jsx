import React from 'react'
import { useState } from 'react'
import './signup.css'
import axios from "axios"

const AdminSignup = () => {
    const initialvalues={
        fullname:"",
        email:"",
        password:"",
      }
        const[values,setValues]=useState(initialvalues)
        const handlechange=(e)=>{
          const valuechanged=e.target.value;
          setValues({...values,[e.target.name]:valuechanged})
        }
        const handleSubmit=(e)=>{
          e.preventDefault()
          console.log("values",values)
          if(values.fullname!="" && values.email!=""  && values.password!=""){
            axios({
                method: 'post',
                url: 'http://localhost:8080/admin/signup',
                data:values
            }).then((res)=>alert(res.data)).catch((err)=>console.log(err)).finally(setValues(initialvalues))        
          }else{
            alert("Enter all details")
          }
        }
      return (
        <div className='signupmaindiv'>
          <form onSubmit={handleSubmit} className="signupform">
            <label>Name</label><br />
            <input type="text" value={values.fullname} placeholder="Full Name" name="fullname" onChange={handlechange}/><br />
            <label>Email</label><br />
            <input type="email" value={values.email} placeholder="Email" name="email" onChange={handlechange}/><br />
            <label>Password</label><br />
            <input type="password" value={values.password} placeholder="Password" name="password" onChange={handlechange}/><br />
            <input type="Submit" />
          </form>
        </div>
      )
}

export default AdminSignup