import React, { useState,useEffect ,useContext} from 'react'
import "../Stylesheets/profile.css"
import EditUserBox from '../component/EditUserBox'
import {passwordcontext} from "../context/passwordState"
import {useNavigate} from "react-router-dom"

export default function ProfilePage() {
  const[isEditBtnClicked,setIsEditBtnClicked]=useState(false)
  const[userData,setUserData]=useState({})

  const navigate=useNavigate()

const userState=useContext(passwordcontext)
const {passwords}=userState

  useEffect(()=>{
    const authToken=localStorage.getItem("authToken")
    fetchUser(authToken)
    // eslint-disable-next-line
},[])
const url="http://localhost:3001"

async function fetchUser(authToken){
    const response=await fetch(`${url}/auth/api/fetchuser`,{
        headers:{
            "Content-Type": "application/json",
            authToken,
        },method:"get"
    })
    const data=await response.json()
    if(data.status!=="error") return setUserData(data.message)
  }

  async function handleDelete(){
    let authToken=localStorage.getItem("authToken")
    let deletConfirm=window.confirm("Do you really want to delete this account")
    if(!deletConfirm) return
    const response=await fetch(`${url}/auth/api/deleteuser`,{
      headers:{
          "Content-Type": "application/json",
          authToken,
      },method:"delete"
  })
  const data=await response.json()
  if(data.status!=="error") {
    localStorage.getItem("authToken")
    navigate("/signin")
  }
  }

  return (
    <div className='profileContainer'>
      <button id="backBtn" onClick={()=>navigate("/")} ><i className="fa-solid fa-arrow-left"></i> Back</button>
      <div className="subProf-container">
      <div className="img"><i className='fa-solid fa-user'></i></div>
        <div className='profileData'>
        <p><b>Name :<span> {userData.name}</span></b></p>
        <p><b>Email :<span> {userData.email}</span></b></p>
        <p><b>Phone :<span> {userData.phone}</span></b></p>
        <p><b>DOB :<span> {userData.dob}</span></b></p>
        {passwords.length>0?<p><b>Passwords Stored : <span>{passwords.length} </span></b></p>:<></>}
        </div>
      <div className='userEditButtons'>
      <button className='profileEditBtn' onClick={()=>setIsEditBtnClicked(true)}>Edit</button>
      <button className='profileEditBtn' onClick={handleDelete}>Delete Account</button>
      </div>
      </div>
      {isEditBtnClicked && <EditUserBox setIsEditBtnClicked={setIsEditBtnClicked} userData={userData} setUserData={setUserData}/>}
      </div>
  )
}
