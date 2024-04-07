import React, { useState } from 'react'
import "../Stylesheets/profile.css"

export default function EditUserBox(props) {
    const[editUserdata,setEditUserData]=useState({
        name:"",email:"",phone:"",dob:""
    })
    const handleOnchange=(e)=>setEditUserData({...editUserdata,[e.target.name]:e.target.value})
  return (
    <div className='editUser-container'>
        <div className="editBox">
        <p className='editText'>Edit </p>
            <div className="editData">
                <input type="text" placeholder='Name' name="name" onChange={handleOnchange} />
                <input type="email" placeholder='email' name="email" onChange={handleOnchange} />
                <input type="text" placeholder='Phone'name="phone" onChange={handleOnchange} />
                <input type="date" placeholder='Date of Birth' name='dob' onChange={handleOnchange}/>
            </div>
            <div className="userEditButtons">
                <button>Edit</button>
                <button onClick={()=>props.setIsEditBtnClicked(false)}>Close</button>
            </div>
        </div>
    </div>
  )
}
