import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const DoctorsCard = ({data,userid}) => {
  const {fullname,email,experience,expertise,image,}=data
  const [payload,setpayload]=useState({fullname,email,experience,expertise,image})
  

  const handlebook=()=>{
    axios({
      method: 'post',
      data:payload,
      url: `https://prussian-blue-ostrich-kit.cyclic.app/appointment/createappointment/${data._id}`,
      headers:{'authorization':`Bearer ${localStorage.getItem("token")}`}
  })
  .then((res)=>{
    alert(res.data);
  })
  .catch((err)=>console.log(err))
  
  }

  const handlechange=(e)=>{
    setpayload({...payload,docterid:data._id,userid:userid,[e.target.name]:e.target.value,})
  }
  
  return (
    <div>
      <div>
        <img src={image} />
        <div>
          <h4>{fullname}</h4>
          <h3>{expertise}</h3>
          <h3>{experience}</h3>
        </div>
      </div>
      <div>
        <div>
          <input type="date" name="date" onChange={handlechange}/>
          <input type="time" name="time" onChange={handlechange}/>
        </div>
        <button onClick={handlebook}>Book Now</button>
      </div>
    </div>
  )
}

export default DoctorsCard