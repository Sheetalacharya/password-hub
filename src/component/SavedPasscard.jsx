import React, { useState, useRef, useContext } from "react";
import "../Stylesheets/savedPass.css";
import EditBox from "./EditBox";
import { passwordcontext } from "../context/passwordState";

export default function SavedPasscard(props) {
  const passwordState = useContext(passwordcontext);
  const { passwords, deletePassword } = passwordState;

  const { _id, password, title, username } = props.password;
  // const [savedTitle, setSavedTitle] = useState(title);
  // const [savedPass, setSavedPass] = useState(password);
  const [savedTitle, setSavedTitle] = useState("");
  const [savedUname, setSavedUname] = useState("");
  const [savedPass, setSavedPass] = useState("");
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [showPass, setShowPass] = useState(false);
  const [showUname,setShowUName]=useState(false)

  useState(() => {
    setSavedTitle(title);
    setSavedUname(username);
    setSavedPass(password);
  }, [passwords]);

  function copyToClipboard(data) {
    navigator.clipboard.writeText(data);
    setCopied(true);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function closeEditBox() {
    setIsEditing(false);
  }

  function handleDelete(id,title,username) {
    let authToken=localStorage.getItem("authToken")
    let confirmation=window.confirm(`Do you want to delete password for ${title} with username ${username}`)
    if (confirmation) return deletePassword(id,authToken)
  }
  function handleEditedText(title, password) {
    setSavedTitle(title);
    setSavedUname(username);
    setSavedPass(password);
  }
  return (
    <div className="savedPass-card">
      <p>{savedTitle}</p>

     <div className="usernameField credentailDiv">
        <i className="fa-solid fa-user"></i>
        <input type={`${showUname?"text":"password"}`} name="" disabled={true} value={username} />
        <button className="eyeBtn cardIconBtn" onClick={()=>setShowUName(prev=>!prev)}>
          <i className={`fa-solid fa-eye${showUname?"":"-slash"}`}></i>
        </button>
        <button className="copyBtn cardIconBtn" onClick={()=>copyToClipboard(username)}>
          <i className="fa-solid fa-copy"></i>
        </button> 
      </div>

      <div className="passwordField credentailDiv">
        <i className="fa-solid fa-lock"></i>
        <input type={`${showPass?"text":"password"}`} name="" disabled={true} value={password} />
        <button className="eyeBtn cardIconBtn" onClick={()=>setShowPass(prev=>!prev)}>
          <i className={`fa-solid fa-eye${showPass?"":"-slash"}`}></i>
        </button>
        <button className="copyBtn cardIconBtn" onClick={()=>copyToClipboard(savedPass)}>
          <i className="fa-solid fa-copy"></i>
        </button>
      </div> 

      <div className="card-buttons">
        <button onClick={handleEdit}>
          Edit <i className="fa-solid fa-edit"></i>
        </button>
        <button onClick={() => handleDelete(_id,title,username)}>
          Delete <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      {isEditing && (
        <EditBox
          closeEditBox={closeEditBox}
          isEditing={isEditing}
          password={props.password}
          handleEditedText={handleEditedText}
        />
      )}
    </div>
  );
}
