import React, { useState,useRef } from "react";
import "../Stylesheets/savedPass.css";
import EditBox from "./EditBox";

export default function SavedPasscard(props) {
  const [savedTitle, setSavedTitle] = useState(props.title);
  const [savedPass, setSavedPass] = useState(props.password);
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing,setIsEditing]=useState(false)

  

  function copyToClipboard() {
    navigator.clipboard.writeText(savedPass);
    setCopied(true);
  }

  function handleEdit(){
    setIsEditing(true)
  }

  function closeEditBox(){
    setIsEditing(false)
  }

  function handleDelete(){
    console.log("delete button pressed");
  }

  return (
    <div className="savedPass-card">
      <span id="title-cardField">
        <input
          type="text"
          name=""
          id="savedTitle"
          disabled={true}
          value={savedTitle}
          onChange={(e) => setSavedTitle(e.target.value)}
        />
      </span>
      <span id="password-cardField">
        <input
          type={`${showPass ? "text" : "password"}`}
          name=""
          id="savedPass"
          disabled={true}
          value={savedPass}
          onChange={(e) => setSavedPass(e.target.value)}
        />
        <i
          className={`fa-solid ${showPass ? "fa-eye" : "fa-eye-slash"}`}
          onClick={() => setShowPass((prev) => !prev)}
        ></i>
        {/* <i className="fa-solid fa-eye-slash"></i> */}
      </span>
      <span id="card-buttons">
        <button onClick={copyToClipboard}>
          Copy <i className={`fa-${copied?"solid":"regular"} fa-copy`}></i>
        </button>
        <button onClick={handleEdit}>
          Edit <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={handleDelete}>
          Delete <i className="fa-regular fa-trash-can"></i>
        </button>
      </span>
      {isEditing && <EditBox closeEditBox={closeEditBox} isEditing={isEditing} />}
    </div>
  );
}
