import React, { useState } from 'react'
import "../Stylesheets/profile.css"
import EditUserBox from '../component/EditUserBox'

export default function ProfilePage() {
  const[isEditBtnClicked,setIsEditBtnClicked]=useState(false)
  return (
    <div className='profileContainer'>
      <div className="subProf-container">
      <div className="img"></div>
        <div className='profileData'>
        <p>Name :<span> name</span></p>
        <p>Email :<span> email</span></p>
        <p>Phone :<span> phone</span></p>
        <p>DOB :<span> dob</span></p>
        <p>Passwords Stored :<span> 1000</span></p>
        </div>
      <div className='userEditButtons'>
      <button className='profileEditBtn' onClick={()=>setIsEditBtnClicked(true)}>Edit</button>
      <button className='profileEditBtn'>Delete Account</button>
      </div>
      </div>
      {isEditBtnClicked && <EditUserBox setIsEditBtnClicked={setIsEditBtnClicked}/>}
      </div>
  )
}
