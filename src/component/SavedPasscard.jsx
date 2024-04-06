import React from 'react'
import "../Stylesheets/savedPass.css"

export default function SavedPasscard() {
  return (
    <div className="savedPass-card">
        <span id='title-cardField'>
          <input type="text" name="" id="" disabled={true} value={1111} />
        </span>
        <span id='password-cardField'>
          <input type="password" name="" id="" disabled={false} value={1111} />
          <i className="fa-solid fa-eye"></i>
          {/* <i className="fa-solid fa-eye-slash"></i> */}
        </span>
        <span id='card-buttons'>
          <button>Copy <i className="fa-regular fa-copy"></i></button>
          <button>Edit <i className="fa-solid fa-pen-to-square"></i></button>
          <button>Delete <i className="fa-regular fa-trash-can"></i></button>
        </span>
      </div>
  )
}
