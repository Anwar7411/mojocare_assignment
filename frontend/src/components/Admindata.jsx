import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Admindata = ({ data,userdata }) => {

    const [admindata,setAdmindata]=useState("")
    

    const handledelete = () => {
        userdata==='user'?axios({
            method: 'delete',
            url: `http://localhost:8080/admin/userdelete/${data._id}`,
            headers: { 'authorization': `Bearer ${localStorage.getItem("token")}` }
        })
            .then((res) => {
                alert(res.data);
                window.location.reload()
            })
            .catch((err) => console.log(err)) :
            axios({
                method: 'delete',
                url: `http://localhost:8080/admin/doctordelete/${data._id}`,
                headers: { 'authorization': `Bearer ${localStorage.getItem("token")}` }
            })
                .then((res) => {
                    alert(res.data);
                    window.location.reload()
                })
                .catch((err) => console.log(err))      
    }


    return (
        <div>
            <div>
                <img src={data.image?data.image:""} />
                <div>
                    <p>{data.fullname}</p>
                    <p>{data.expertise?data.expertise:""}</p>
                    <p>{data.experience?data.experience:""}</p>
                    <p>{data.phone}</p>
                    <p>{data.email}</p>
                </div>
            </div>

            <button onClick={handledelete}>Delete</button>

        </div>
    )
}

export default Admindata