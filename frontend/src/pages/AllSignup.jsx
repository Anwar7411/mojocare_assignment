import React from 'react'
import { useState } from 'react'
import Doctorsignup from './Doctorsignup'
import Usersignup from './Usersignup'

const AllSignup = () => {
  const [signupchoice, setSignupchoice] = useState("user")


  return (
    <div>
      <div>
        <div onClick={()=>setSignupchoice("user")}>User Signup</div>
        <div onClick={()=>setSignupchoice("doctor")}>Doctor Signup</div>
      </div>
      
      <div>
        {signupchoice == "user" ? <Usersignup /> : <Doctorsignup />}
      </div>
    </div>
  )
}

export default AllSignup