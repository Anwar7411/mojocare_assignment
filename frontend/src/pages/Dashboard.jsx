import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Adminhandler from '../components/Adminhandler';
import AppointmentCard from '../components/AppointmentCard';
import DoctorsCard from '../components/DoctorsCard';

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [choose, setChoose] = useState("getdoctor")
  const [userid, setUserid] = useState("")

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://prussian-blue-ostrich-kit.cyclic.app/users/getdoctors',
      headers: { 'authorization': `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => {
        setDoctors(res.data.data);
        setUserid(res.data.userid);
      })
      .catch((err) => console.log(err))
  }, [choose])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://prussian-blue-ostrich-kit.cyclic.app/appointment',
      headers: { 'authorization': `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => {
        setAppointments(res.data);

      })
      .catch((err) => console.log(err))
  }, [choose])


  return (

    <div>
      <div>
        <div onClick={() => setChoose("getdoctor")}>See All Doctors</div>
        <div onClick={() => setChoose("getappointment")}>Appointments</div>
        {userid == "6399fc73a8a5115558ab789a" ? <div onClick={()=>setChoose("getusers")}>Delete user or doctor</div> : ""}
      </div>

      <div>
        {choose == "getdoctor" ? <div>{doctors?.length > 0 && doctors?.map((el) => (
          <DoctorsCard data={el} userid={userid} key={el._id} />
        ))}</div> :""}
        {choose=="getappointment"?<div>{appointments.length > 0 && appointments?.map((el) => (
            <AppointmentCard data={el} key={el._id} />
          ))}</div>:""}
        {choose=="getusers" ? <div><Adminhandler /></div> : ""}
      </div>
    </div>
  )
}

export default Dashboard