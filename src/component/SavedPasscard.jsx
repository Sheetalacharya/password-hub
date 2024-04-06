import React, { useState, useRef, useContext } from "react";
import "../Stylesheets/savedPass.css";
import EditBox from "./EditBox";
import { passwordcontext } from "../context/passwordState";

export default function SavedPasscard(props) {
  const passwordState = useContext(passwordcontext);
  const { passwords,deletePassword } = passwordState;

  const { _id, password, title } = props.password;
  // const [savedTitle, setSavedTitle] = useState(title);
  // const [savedPass, setSavedPass] = useState(password);
  const [savedTitle, setSavedTitle] = useState("");
  const [savedPass, setSavedPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  useState(() => {
    setSavedTitle(title);
    setSavedPass(password);
  }, [passwords]);

  function copyToClipboard() {
    navigator.clipboard.writeText(savedPass);
    setCopied(true);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function closeEditBox() {
    setIsEditing(false);
  }

  function handleDelete(id) {
    // confirmation before delete have to implement
    deletePassword(id)
  }
  function handleEditedText(title, password) {
    setSavedTitle(title);
    setSavedPass(password);
  }
  return (
    <div className="savedPass-card">
      <span className="title-cardField">
        <input
          type="text"
          name=""
          // id="savedTitle"
          disabled={true}
          value={savedTitle}
          onChange={(e) => setSavedTitle(e.target.value)}
        />
      </span>
      <span className="password-cardField">
        <input
          type={`${showPass ? "text" : "password"}`}
          name=""
          // id="savedPass"
          disabled={true}
          value={savedPass}
          onChange={(e) => setSavedPass(e.target.value)}
        />
        <i
          className={`fa-solid ${showPass ? "fa-eye" : "fa-eye-slash"}`}
          onClick={() => setShowPass((prev) => !prev)}
        ></i>
      </span>
      <span className="card-buttons">
        <button onClick={copyToClipboard}>
          Copy <i className={`fa-${copied ? "solid" : "regular"} fa-copy`}></i>
        </button>
        <button onClick={handleEdit}>
          Edit <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={()=>handleDelete(_id)}>
          Delete <i className="fa-regular fa-trash-can"></i>
        </button>
      </span>


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
