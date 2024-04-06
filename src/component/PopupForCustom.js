import React, { useEffect, useRef } from "react";
import "../Stylesheets/popupForCustom.css";

export default function PopupForCustom(props) {
  const closePopup = useRef();
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
  return (
    <div className="popup-container">
      <div className="popupSection" ref={closePopup}>
        <p>What do you want to include in your password ?</p>
        <ul>
          <li>
            <label htmlFor={"nameCB"}>Name</label>
            <input type="checkbox" name="randomFiedldInp" id="nameCB" />
          </li>
          <li>
            <label htmlFor={"phoneCB"}>Phone Number</label>
            <input type="checkbox" name="randomFiedldInp" id="phoneCB" />
          </li>
          <li>
            <label htmlFor={"emailCB"}>Email-Id</label>
            <input type="checkbox" name="randomFiedldInp" id="emailCB" />
          </li>
          <li>
            <label htmlFor={"dobCB"}>Date of Birth</label>
            <input type="checkbox" name="randomFiedldInp" id="dobCB" />
          </li>
          <li>
            <label htmlFor={"uppercaseCB"}>UpperCase</label>
            <input type="checkbox" name="randomFiedldInp" id="uppercaseCB" />
          </li>
          <li>
            <label htmlFor={"lowercaseCB"}>LowerCase</label>
            <input type="checkbox" name="randomFiedldInp" id="lowercaseCB" />
          </li>
          <li>
            <label htmlFor={"splcharCB"}>Special Characters</label>
            <input type="checkbox" name="randomFiedldInp" id="splcharCB" />
          </li>
          <li>
            <label htmlFor={"lengthCB"}> Length</label>
            <input type="number" name="" id="lengthCB" />
          </li>
          <li className="otherWordsLi">
            <label htmlFor={"otherCB"}> Other words</label>
            <textarea
              cols={30}
              rows={5}
              placeholder="Insert using comma (petname, favourite thing, address)"
              id="otherCB"
            ></textarea>
          </li>
        </ul>
        <button>Generate</button>
      </div>
    </div>
  );
}
