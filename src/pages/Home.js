import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Stylesheets/home.css";
import Navbar from "../component/Navbar";
import SavedPass from "../component/SavedPass";
import PopupForCustom from "../component/PopupForCustom";
import PopupForRandom from "../component/PopupForRandom";
import { passwordcontext } from "../context/passwordState";
import PopupMsg from "../component/PopupMsg";
import Footer from "../component/Footer";

export default function Home(props) {
  const passwordState = useContext(passwordcontext);
  const {
    fetchAllPassword,
    generatedPass,
    setGeneratedPass,
    titleUnameInp,
    handleTitleUnameInp,
    savePassword,
    passwords,
    regenerate,
    btnSelected,
    selectedForGen,
  } = passwordState;

  const titleInputField = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    if (!authToken) {
     return navigate("/signup");
    } 
    fetchAllPassword(authToken);
     // eslint-disable-next-line
  }, []);

  const [popupForCustom, setPopupForCustom] = useState(false);
  const [popupForRandom, setPopupForRandom] = useState(false);
  const [passwordVisble, setPasswordVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const[msgType,setMsgType]=useState(null)
  function closePopup(type, val) {
    type === "custom" ? setPopupForCustom(val) : setPopupForRandom(val);
  }

  function copyToClipboard() {
    if (!generatedPass) return;
    navigator.clipboard.writeText(generatedPass);
    setCopied(true);
    showErrorMessage("Copied to clipboard","success")
  }

  function customBtnClick() {
    popupForCustom ? setPopupForCustom(false) : setPopupForCustom(true);
  }

  function randomBtnClick() {
    popupForRandom ? setPopupForRandom(false) : setPopupForRandom(true);
  }

  function handleSaveBtn() {
    let authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/signin");
    }
    if (titleUnameInp.title === "") {
      return showErrorMessage("Title cannot be empty","error");
    }
    if (titleUnameInp.username === "")
      return showErrorMessage("Username is required","error");
    if (!generatedPass)
      return showErrorMessage("Password is not avalible to save","error");
    savePassword(
      {
        title: titleUnameInp.title,
        username: titleUnameInp.username,
        password: generatedPass,
      },
      authToken
    );
    showErrorMessage("Password Saved","success")
  }
  function showErrorMessage(msg,type) {
    setErrorMsg(msg);
    setMsgType(type)
    setTimeout(() => {
      setErrorMsg("");
      setMsgType(null)
    }, 4000);
  }

  return (
    <>
      <Navbar setIsloggedin={props.setIsloggedin} />
      <div className="home-container">
        <div className="inputGen-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete="off"
          >
            <div className="mainoptions">
              <button onClick={customBtnClick}>
                Get password by user input
              </button>
              <button onClick={randomBtnClick}>Get random password</button>
            </div>
            <input
              type="text"
              id="title-input"
              placeholder="Enter title of site"
              name="title"
              onChange={handleTitleUnameInp}
              value={titleUnameInp.title}
              ref={titleInputField}
            />
            <input
              type="text"
              id="username-input"
              placeholder="Username"
              name="username"
              onChange={handleTitleUnameInp}
              value={titleUnameInp.username}
              
            />
            <div>
              <input
                type={`${passwordVisble ? "text" : "password"}`}
                id="password-output"
                placeholder="Your password will show here"
                value={generatedPass}
                onChange={(e) => setGeneratedPass(e.target.value)}
              />
              <button
                id="passwordEyeBtn"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                <i
                  className={`fa-solid fa-eye${passwordVisble ? "" : "-slash"}`}
                ></i>
              </button>
              <button id="copyPasswordBtn" onClick={copyToClipboard}>
                <i className={`fa-${copied ? "solid" : "regular"} fa-copy`}></i>
              </button>
            </div>
            <div>
              <button
                id="regenerateBtn"
                disabled={btnSelected === "" ? true : false}
                onClick={() => {
                  let authToken = localStorage.getItem("authToken");
                  regenerate(selectedForGen, authToken);
                }}
              >
                Regenerate
              </button>
              <button id="saveBtn" onClick={handleSaveBtn}>
                Save
              </button>
            </div>
          </form>
        </div>
        {passwords.length > 0 && <h2>Saved Passwords</h2>}

        <SavedPass />

        {/* to add password */}
        <button
          className="addPass"
          onClick={() => titleInputField.current.focus()}
        >
          <i className="fa-regular fa-plus"></i>
        </button>
        <Footer/>
      </div>

      {/* popup */}
      {popupForCustom && (
        <PopupForCustom
          closePopup={closePopup}
          popupForCustom={popupForCustom}
          setCopied={setCopied}
        />
      )}
      {popupForRandom && (
        <PopupForRandom
          closePopup={closePopup}
          popupForRandom={popupForRandom}
          setCopied={setCopied}
        />
      )}
      {errorMsg && <PopupMsg message={errorMsg} setErrorMsg={setErrorMsg} type={msgType}/>}
    </>
  );
}
