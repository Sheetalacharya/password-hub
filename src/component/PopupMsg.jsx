import React, { useState } from 'react'
import "../Stylesheets/popupMsg.css"

export default function PopupMsg(props) {    
  return (
    <>
    { <div className='popupMsg'>
        <button onClick={()=>{props.setErrorMsg("")}}><i className='fa-solid fa-close'></i></button>
        <div>
            {props.message}
        </div>
        </div>}
    </>
  )
}
