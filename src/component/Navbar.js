import React, { useState } from 'react'
import "../Stylesheets/navbar.css"

export default function Navbar() {
  const[displayProfileList,setDisplayProfileList]=useState(false)
  const handleListVisibility=()=>{
    displayProfileList?setDisplayProfileList(false):setDisplayProfileList(true)
  }
  return (
    <nav>
        <div className="logo">
            LOGO
        </div>
        <div className='profileBtn'>
        <button className='profileIcon' onClick={handleListVisibility}>a</button>
        </div>
        {
          displayProfileList && <ul className='profileList'>
          <li><button>View Profile</button></li>
          <li><button>Logout</button></li>
        </ul>
        }
    </nav>
  )
}
