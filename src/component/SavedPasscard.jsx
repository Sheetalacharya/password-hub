import React from 'react'
import "../Stylesheets/savedPass.css"

export default function SavedPasscard() {
  return (
    <div className="savedPass-card">
        <span id='title-cardField'>
          <input type="text" name="" id="" disabled={true} value={1111} />
        </span>
        <span id='password-cardField'>
          <input type="password" name="" id="" disabled={true} value={1111} />
        </span>
        <span id='card-buttons'>
          <button>Copy</button>
          <button>Edit</button>
          <button>Delete</button>
        </span>
      </div>
  )
}
