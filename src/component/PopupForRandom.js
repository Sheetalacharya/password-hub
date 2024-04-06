import React, { useEffect, useRef } from "react";
import "../Stylesheets/popupForCustom.css";

export default function PopupForRandom(props) {
  const closeRandomPopup = useRef();
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
  return (
    <div className="popup-container">
      <div
        className="popupSection randomInpContainer"
        ref={closeRandomPopup}
      >
        <p>What do you want to include in your password ?</p>
        <ul>
          <li>
            <label htmlFor="letterRB">Letters</label>
            <input type="checkbox" name="randomFiedldInp" id="letterRB" />
          </li>
          <li>
            <label htmlFor="numberRB">Numbers</label>
            <input type="checkbox" name="randomFiedldInp" id="numberRB" />
          </li>
          <li>
            <label htmlFor="uppercaseRB">UpperCase</label>
            <input type="checkbox" name="randomFiedldInp" id="uppercaseRB" />
          </li>
          <li>
            <label htmlFor="lowercaseRB">LowerCase</label>
            <input type="checkbox" name="randomFiedldInp" id="lowercaseRB" />
          </li>
          <li>
            <label htmlFor="splCharRB">Special Characters</label>
            <input type="checkbox" name="randomFiedldInp" id="splCharRB" />
          </li>
          <li>
            <label htmlFor="lengthRB">Length</label>
            <input type="number" name="" id="lengthRB" />
          </li>
        </ul>
        <button>Generate</button>
      </div>
    </div>
  );
}
