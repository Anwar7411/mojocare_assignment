import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Admindata from './Admindata'

const Adminhandler = () => {
    const [state,setState]=useState("user")
    const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios({
              method: 'get',
              url: 'http://localhost:8080/admin/userdetails',
              headers:{'authorization':`Bearer ${localStorage.getItem("token")}`}
          })
          .then((res)=>{
            setUsers(res.data);
          })
          .catch((err)=>console.log(err))
      },[])
    
      useEffect(()=>{
        axios({
              method: 'get',
              url: 'http://localhost:8080/admin/docterdetails',
              headers:{'authorization':`Bearer ${localStorage.getItem("token")}`}
          })
          .then((res)=>{
            setDoctors(res.data);
          
          })
          .catch((err)=>console.log(err))
      },[])

  return (
    <div>
        <div>
            <button onClick={()=>setState("user")}>Users</button>
            <button onClick={()=>setState("doctor")}>Docters</button>
        </div>
        <div>
        {state == "doctor" ? <div>{doctors?.length > 0 && doctors?.map((el) => (
           <Admindata data={el}  key={el._id}  userdata={state}/>
        ))}</div> :
          <div>{users.length > 0 && users?.map((el) => (
            <Admindata data={el}  userdata={state} key={el._id}/>
          ))}</div>}
        </div>
    </div>
  )
}

export default Adminhandler