import React, { useRef, useState,useEffect } from 'react'
import "../Stylesheets/navbar.css"

export default function Navbar() {
  const[displayProfileList,setDisplayProfileList]=useState(false)

  const closeProfileList=useRef()

  const handleListVisibility=()=>{
    console.log("toggle");
    setDisplayProfileList((prev)=>!prev)
  }

  useEffect(() => {
    function handler(e) {
      if (displayProfileList && !closeProfileList.current.contains(e.target)) {
        setDisplayProfileList(false)
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <nav>
        <div className="logo">
            Password Hub
        </div>
        <div className='profileBtn'>
        <button className='profileIcon' onClick={handleListVisibility}><i className="fa-solid fa-user"></i> </button>
        </div>
        {
          displayProfileList && (<ul className='profileList' ref={closeProfileList}>
          <li><button>View Profile</button></li>
          <li><button>Logout</button></li>
        </ul>)
        }
    </nav>
  )
}
