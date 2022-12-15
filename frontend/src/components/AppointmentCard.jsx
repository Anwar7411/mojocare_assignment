import axios from 'axios'
import React, { useState } from 'react'

const AppointmentCard = ({data}) => {
  const {fullname,email,experience,expertise,image,}=data
  const [payload,setpayload]=useState(data)

  const handlechange=(e)=>{
    setpayload({...payload,[e.target.name]:e.target.value,})
  }

  const handledelete=()=>{
    axios({
      method: 'delete',
      url: `http://localhost:8080/appointment/delete/${data._id}`,
      headers:{'authorization':`Bearer ${localStorage.getItem("token")}`}
  })
  .then((res)=>{
    alert(res.data)
    window.location.reload()
  })
  .catch((err)=>console.log(err))
 
  }

  const handleedit=()=>{
    axios({
      method: 'patch',
      data:payload,
      url: `http://localhost:8080/appointment/edit/${data._id}`,
      headers:{'authorization':`Bearer ${localStorage.getItem("token")}`}
  })
  .then((res)=>{
    alert(res.data)
    window.location.reload()
  })
  .catch((err)=>console.log(err))
 
  }

  return (
    <div>
      <div>
      <div>
        <img src={data.image} />
        <div>
          <h3>Date:{data.date}</h3>
          <h3>Time:{data.time}</h3>
          <div>
          <p>{data.fullname}</p>
          <p>{data.expertise}</p>
          <p>{data.experience}</p>
        </div>
        </div>
      </div>
      <div>
        <button onClick={handledelete}>Delete Appointment</button>
        <div>
        <input type="date" name="date" onChange={handlechange}/>
          <input type="time" name="time" onChange={handlechange}/>
        </div>
        <button onClick={handleedit}>Edit Date & Time</button>
      </div>
    </div>
    </div>
  )
}

export default AppointmentCard