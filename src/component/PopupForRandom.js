import React, { useEffect, useRef, useState, useContext } from "react";
import "../Stylesheets/popupForCustom.css";
import { passwordcontext } from "../context/passwordState";
import PopupMsg from "./PopupMsg";

export default function PopupForRandom(props) {
  const closeRandomPopup = useRef();

  const passwordState = useContext(passwordcontext);
  const { generateRandomPassword, setBtnSelected, setSelectedForgen } =
    passwordState;

  const [numberCheck, setNumbersCheck] = useState(false);
  const [uppercaseCheck, setUpperCheck] = useState(false);
  const [lowercaseCheck, setLowerCheck] = useState(false);
  const [splCharCheck, setSplCheck] = useState(false);
  const [lengthInp, setlen] = useState(4);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    function handler(e) {
      if (
        props.popupForRandom &&
        !closeRandomPopup.current.contains(e.target)
      ) {
        props.closePopup("random", false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);

  // function printd() {
  //   console.log({ numberCheck });
  //   console.log({ uppercaseCheck });
  //   console.log({ lowercaseCheck });
  //   console.log({ splCharCheck });
  //   console.log({ lengthInp });
  // }

  function sendToGenerate() {
    let authToken = localStorage.getItem("authToken");
    const data = {
      numberCheck,
      uppercaseCheck,
      lowercaseCheck,
      splCharCheck,
      lengthInp,
    };
    if (
      !numberCheck ||
      !uppercaseCheck ||
      !lowercaseCheck ||
      !splCharCheck ||
      !lengthInp
    ) {
      return showErrorMessage("Need to check atleat 1 options");
    }
    generateRandomPassword(data, authToken);
    setBtnSelected("random");
    setSelectedForgen(data);
    props.closePopup("random", false);
  }

  function showErrorMessage(msg){
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 4000);
  }

  return (
    <div className="popup-container">
      <div className="popupSection randomInpContainer" ref={closeRandomPopup}>
        <p>What do you want to include in your random password ?</p>
        <ul>
          <li>
            <label htmlFor="numberRB">Numbers</label>
            <input
              type="checkbox"
              name="randomFiedldInp"
              id="numberRB"
              checked={numberCheck}
              onChange={(e) => setNumbersCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor="uppercaseRB">Uppercase Letters </label>
            <input
              type="checkbox"
              name="randomFiedldInp"
              id="uppercaseRB"
              checked={uppercaseCheck}
              onChange={(e) => setUpperCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor="lowercaseRB">Lowercase Letters</label>
            <input
              type="checkbox"
              name="randomFiedldInp"
              id="lowercaseRB"
              checked={lowercaseCheck}
              onChange={(e) => setLowerCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor="splCharRB">Special Characters</label>
            <input
              type="checkbox"
              name="randomFiedldInp"
              id="splCharRB"
              checked={splCharCheck}
              onChange={(e) => setSplCheck(e.target.checked)}
            />
          </li>
          <li>
            <label htmlFor="lengthRB">Length</label>
            <input
              type="number"
              name=""
              id="lengthRB"
              value={lengthInp}
              onChange={(e) => setlen(e.target.value)}
            />
          </li>
        </ul>
        <button onClick={sendToGenerate}>Generate</button>
      </div>
      {errorMsg && <PopupMsg message={errorMsg} setErrorMsg={setErrorMsg}/>}
    </div>
  );
}
