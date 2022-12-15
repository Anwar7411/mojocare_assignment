import React from 'react'
import { useState } from 'react'
import './signup.css'
import axios from 'axios'

const Doctorsignup = () => {
    const initialvalues={
        fullname:"",
        phone:"",
        email:"",
        password:"",
        expertise:"",
        image:"",
        experience:""
      }
        const[values,setValues]=useState(initialvalues)
        const handlechange=(e)=>{
          const valuechanged=e.target.value;
          setValues({...values,[e.target.name]:valuechanged})
        }
        const handleSubmit=(e)=>{
          e.preventDefault()
          console.log("values",values)
          if(values.fullname!="" && values.email!="" && values.phone!="" && values.password!="" && values.experience!="" && values.expertise!="" && values.image!=""){
            axios({
              method: 'post',
              url: 'http://localhost:8080/signup/doctorsignup',
              data:values
          }).then((res)=>alert(res.data)).catch((err)=>alert("Something went please try again later!")).finally(setValues(initialvalues)) 
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
            <label>Phone</label><br />
            <input type="number" value={values.phone} placeholder="Phone Number" name="phone" onChange={handlechange}/><br />
            <label>Expertise</label><br />
            <input type="text" value={values.expertise} placeholder="Expertise" name="expertise" onChange={handlechange}/><br />
            <label>Experience</label><br />
            <input type="text" value={values.experience} placeholder="Experience" name="experience" onChange={handlechange}/><br />
            <label>Image</label><br />
            <input type="url" value={values.image} placeholder="Image URL" name="image" onChange={handlechange}/><br />
            <label>Password</label><br />
            <input type="password" value={values.password} placeholder="Password" name="password" onChange={handlechange}/><br />
            <input type="Submit" />
          </form>
        </div>
      )
}

export default Doctorsignup