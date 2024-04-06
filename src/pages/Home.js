import React, { useState, useRef, useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import "../Stylesheets/home.css";
import Navbar from "../component/Navbar";
import SavedPass from "../component/SavedPass";
import PopupForCustom from "../component/PopupForCustom";
import PopupForRandom from "../component/PopupForRandom";
import {passwordcontext} from "../context/passwordState"

export default function Home(props) {
  const [popupForCustom, setPopupForCustom] = useState(false);
  const [popupForRandom, setPopupForRandom] = useState(false);
  const [titleInp,setTitleInp]=useState("")
  const [passwordOut,setPasswordOut]=useState("")
  const [copied,setCopied]=useState(false)

  const titleInputField=useRef()
  const navigate=useNavigate()

  const passwordState=useContext(passwordcontext)
  const {}=passwordState

  useEffect(()=>{
    if(!props.isloggedin){
      // navigate("/signin") 
    }
  })

  function closePopup(type, val) {
    console.log(type, val);
    type === "custom" ? setPopupForCustom(val) : setPopupForRandom(val);
  }

  function copyToClipboard(){
    navigator.clipboard.writeText(passwordOut)
    setCopied(true)
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="inputGen-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mainoptions">
              <button
                onClick={() =>
                  popupForCustom
                    ? setPopupForCustom(false)
                    : setPopupForCustom(true)
                }
              >
                Get password by user Input
              </button>
              <button
                onClick={() =>
                  popupForRandom
                    ? setPopupForRandom(false)
                    : setPopupForRandom(true)
                }
              >
                Get random password
              </button>
            </div>
            <input
              type="text"
              id="title-input"
              placeholder="Enter title of site"
              onChange={e=>setTitleInp(e.target.value)}
              value={titleInp}
              ref={titleInputField}
            />
            <div>
              <input
                type="text"
                id="password-output"
                placeholder="Your password will show here"
                value={passwordOut}
                onChange={e=>setPasswordOut(e.target.value)}
              />
              <button id="copyPasswordBtn" onClick={copyToClipboard}><i className={`fa-${copied?"solid":"regular"} fa-copy`}></i></button>
            </div>
            <div>
              <button id="regenerateBtn">Regenerate</button>
              <button id="saveBtn">Save</button>
            </div>
          </form>
        </div>
        <h2>Saved Passwords</h2>
        <SavedPass />
        <button className="addPass" onClick={()=>titleInputField.current.focus()}><i className="fa-regular fa-plus"></i></button>
      </div>
      {popupForCustom && (
        <PopupForCustom
          closePopup={closePopup}
          popupForCustom={popupForCustom}
        />
      )}
      {popupForRandom && (
        <PopupForRandom
          closePopup={closePopup}
          popupForRandom={popupForRandom}
        />
      )}
    </>
  );
}
