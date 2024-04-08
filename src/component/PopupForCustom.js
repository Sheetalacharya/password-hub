import React, { useEffect, useRef, useState, useContext } from "react";
import "../Stylesheets/popupForCustom.css";
import { passwordcontext } from "../context/passwordState";
import PopupMsg from "./PopupMsg";

export default function PopupForCustom(props) {
  const closePopup = useRef();
  const [nameCheck, setNameCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [dobCheck, setDobCheck] = useState(false);
  const [uppercaseCheck, setUpperCheck] = useState(false);
  const [lowercaseCheck, setLowerCheck] = useState(false);
  const [splCharCheck, setSplCheck] = useState(false);
  const [lengthInp, setlen] = useState(4);
  const [otherWords, setOther] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const passwordState = useContext(passwordcontext);
  const { generateCustomPassword, setBtnSelected,setSelectedForgen } = passwordState;

  useEffect(() => {
    function handler(e) {
      if (props.popupForCustom && !closePopup.current.contains(e.target)) {
        props.closePopup("custom", false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);

  function printd() {
    console.log({ nameCheck });
    console.log({ numberCheck: numberCheck });
    console.log({ phoneCheck });
    console.log({ emailCheck });
    console.log({ dobCheck });
    console.log({ uppercaseCheck });
    console.log({ lowercaseCheck });
    console.log({ splCharCheck });
    console.log({ lengthInp });
    console.log({ otherWords });
  }

  function sendToGenerate(){
    let authToken=localStorage.getItem("authToken")
    if(!nameCheck && !numberCheck && !phoneCheck && !emailCheck && !dobCheck && !uppercaseCheck && !lowercaseCheck && !splCharCheck ){
      return showErrorMessage("Need to check atleat 1 options")
    }
    const data = {
      nameCheck,
      numberCheck,
      phoneCheck,
      emailCheck,
      dobCheck,
      uppercaseCheck,
      lowercaseCheck,
      splCharCheck,
      lengthInp,
      otherWords,
    };
    generateCustomPassword(data,authToken);
    setSelectedForgen(data)
    setBtnSelected("custom");
    props.setCopied(false)
    props.closePopup("custom", false);
  }

  function showErrorMessage(msg) {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 4000);
  }

  return (
    <div className="popup-container">
      <div className="popupSection" ref={closePopup}>
        <p>What do you want to include in your custom password ?</p>
        <ul>
          <li>
            <label htmlFor={"nameCB"}>Name</label>
            <input
              type="checkbox"
              name="name"
              checked={nameCheck}
              onChange={(e) => setNameCheck(e.target.checked)}
              id="nameCB"
            />
          </li>
          <li>
            <label htmlFor={"phoneCB"}>Phone Number</label>
            <input
              type="checkbox"
              name="phone"
              id="phoneCB"
              checked={phoneCheck}
              onChange={(e) => setPhoneCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor={"emailCB"}>Email-Id</label>
            <input
              type="checkbox"
              name="email"
              id="emailCB"
              checked={emailCheck}
              onChange={(e) => setEmailCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor={"dobCB"}>Date of Birth</label>
            <input
              type="checkbox"
              name="dob"
              id="dobCB"
              checked={dobCheck}
              onChange={(e) => setDobCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor={"numCB"}>Numbers </label>
            <input
              type="checkbox"
              name="numberCheck"
              id="numCB"
              checked={numberCheck}
              onChange={(e) => setNumberCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor={"uppercaseCB"}>UpperCase</label>
            <input
              type="checkbox"
              name="uppercase"
              id="uppercaseCB"
              checked={uppercaseCheck}
              onChange={(e) => setUpperCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor={"lowercaseCB"}>LowerCase</label>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercaseCB"
              checked={lowercaseCheck}
              onChange={(e) => setLowerCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor={"splcharCB"}>Special Characters</label>
            <input
              type="checkbox"
              name="specialChar"
              id="splcharCB"
              checked={splCharCheck}
              onChange={(e) => setSplCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor={"lengthCB"}> Length</label>
            <input
              type="number"
              name="length"
              id="lengthCB"
              value={lengthInp}
              onChange={(e) => setlen(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor={"otherCB"}> Extra Word</label>
            <input
              type="text"
              name="otherWords"
              id="otherCB"
              value={otherWords}
              onChange={(e) => setOther(e.target.value)}
            />
          </li>
        </ul>
        <button onClick={sendToGenerate}>Generate</button>
      </div>
      {errorMsg && <PopupMsg message={errorMsg} setErrorMsg={setErrorMsg} />}
    </div>
  );
}
