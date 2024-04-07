import React, { useState,useEffect ,useContext} from 'react'
import "../Stylesheets/profile.css"
import EditUserBox from '../component/EditUserBox'
import {passwordcontext} from "../context/passwordState"

export default function ProfilePage() {
  const[isEditBtnClicked,setIsEditBtnClicked]=useState(false)
  const[userData,setUserData]=useState({})

const userState=useContext(passwordcontext)
const {passwords}=userState

  useEffect(()=>{
    const authToken=localStorage.getItem("authToken")
    fetchUser(authToken)
},[])

async function fetchUser(authToken){
    const url="http://localhost:3001"
    const response=await fetch(`${url}/auth/api/fetchuser`,{
        headers:{
            "Content-Type": "application/json",
            authToken,
        },method:"get"
    })
    const data=await response.json()
    if(data.status!=="error") return setUserData(data.message)
}
  return (
    <div className='profileContainer'>
      <div className="subProf-container">
      <div className="img"></div>
        <div className='profileData'>
        <p>Name :<span> {userData.name}</span></p>
        <p>Email :<span> {userData.email}</span></p>
        <p>Phone :<span> {userData.phone}</span></p>
        <p>DOB :<span> {userData.dob}</span></p>
        {passwords.length>0?<p>Passwords Stored : <span>{passwords.length} </span></p>:<></>}
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
