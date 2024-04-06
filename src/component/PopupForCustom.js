import React, { useEffect, useRef, useState,useContext } from "react";
import "../Stylesheets/popupForCustom.css";
import { passwordcontext } from "../context/passwordState";

export default function PopupForCustom(props) {
  const closePopup = useRef();
  const[nameCheck,setNameCheck]=useState(false)
  const[phoneCheck,setPhoneCheck]=useState(false)
  const[emailCheck,setEmailCheck]=useState(false)
  const[dobCheck,setDobCheck]=useState(false)
  const[uppercaseCheck,setUpperCheck]=useState(false)
  const[lowercaseCheck,setLowerCheck]=useState(false)
  const[splCharCheck,setSplCheck]=useState(false)
  const[lengthInp,setlen]=useState(4)
  const[otherWords,setOther]=useState("")


const passwordState=useContext(passwordcontext)
const {generateCustomPassword}=passwordState

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

  function printd(){
    console.log({nameCheck});
    console.log({phoneCheck});
    console.log({emailCheck});
    console.log({dobCheck});
    console.log({uppercaseCheck});
    console.log({lowercaseCheck});
    console.log({splCharCheck});
    console.log({lengthInp});
    console.log({otherWords});
  }

function sendToGenerate(){
  printd()
  let otherWordsArr=otherWords.split(",")
  console.log(otherWordsArr);
  const data={
    nameCheck,
phoneCheck,
emailCheck,
dobCheck,
uppercaseCheck,
lowercaseCheck,
splCharCheck,
lengthInp,
otherWords:otherWordsArr
  }
  generateCustomPassword(data)
  props.closePopup("custom", false);
}

  return (
    <div className="popup-container">
      <div className="popupSection" ref={closePopup}>
        <p>What do you want to include in your custom password ?</p>
        <ul>
          <li>
            <label htmlFor={"nameCB"}>Name</label>
            <input type="checkbox" name="name" checked={nameCheck} onChange={(e)=>setNameCheck(e.target.checked)} id="nameCB" />
          </li>
          <li>
            <label htmlFor={"phoneCB"}>Phone Number</label>
            <input type="checkbox" name="phone" id="phoneCB"checked={phoneCheck} onChange={(e)=>setPhoneCheck(e.target.checked)} />
          </li>
          <li>
            <label htmlFor={"emailCB"}>Email-Id</label>
            <input type="checkbox" name="email" id="emailCB" checked={emailCheck} onChange={(e)=>setEmailCheck(e.target.checked)} />
          </li>
          <li>
            <label htmlFor={"dobCB"}>Date of Birth</label>
            <input type="checkbox" name="dob" id="dobCB" checked={dobCheck} onChange={(e)=>setDobCheck(e.target.checked)}/>
          </li>
          <li>
            <label htmlFor={"uppercaseCB"}>UpperCase</label>
            <input type="checkbox" name="uppercase" id="uppercaseCB" checked={uppercaseCheck} onChange={(e)=>setUpperCheck(e.target.checked)}/>
          </li>
          <li>
            <label htmlFor={"lowercaseCB"}>LowerCase</label>
            <input type="checkbox" name="lowercase" id="lowercaseCB"checked={lowercaseCheck} onChange={(e)=>setLowerCheck(e.target.checked)}/>
          </li>
          <li>
            <label htmlFor={"splcharCB"}>Special Characters</label>
            <input type="checkbox" name="specialChar" id="splcharCB" checked={splCharCheck} onChange={(e)=>setSplCheck(e.target.checked)} />
          </li>
          <li>
            <label htmlFor={"lengthCB"}> Length</label>
            <input type="number" name="length" id="lengthCB" value={lengthInp} onChange={e=>setlen(e.target.value)} />
          </li>
          <li className="otherWordsLi">
            <label htmlFor={"otherCB"}> Other words</label>
            <textarea
              cols={30}
              rows={5}
              placeholder="Insert using comma (petname, favourite thing, address)"
              id="otherCB"
              name="otherWords"
              value={otherWords} onChange={e=>setOther(e.target.value)}
            ></textarea>
          </li>
        </ul>
        <button onClick={sendToGenerate}>Generate</button>
      </div>
    </div>
  );
}
