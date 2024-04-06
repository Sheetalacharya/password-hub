import React, { useEffect, useRef ,useState,useContext} from "react";
import "../Stylesheets/popupForCustom.css";
import { passwordcontext } from "../context/passwordState";


export default function PopupForRandom(props) {

  const closeRandomPopup = useRef();

  const passwordState=useContext(passwordcontext)
const {generateRandomPassword}=passwordState

  const[lettersCheck,setLettersCheck]=useState(false)
  const[numbersCheck,setNumbersCheck]=useState(false)
  const[uppercaseCheck,setUpperCheck]=useState(false)
  const[lowercaseCheck,setLowerCheck]=useState(false)
  const[splCharCheck,setSplCheck]=useState(false)
  const[lengthInp,setlen]=useState(4)



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

  function printd(){
    console.log({lettersCheck})
console.log({numbersCheck})
console.log({uppercaseCheck})
console.log({lowercaseCheck})
console.log({splCharCheck})
console.log({lengthInp})
  }

  function sendToGenerate(){
    printd()
    const data={
      numbersCheck,
uppercaseCheck,
lowercaseCheck,
splCharCheck,
lengthInp  ,
    }
    generateRandomPassword(data)
    props.closePopup("random", false);
  }

  return (
    <div className="popup-container">
      <div
        className="popupSection randomInpContainer"
        ref={closeRandomPopup}
      >
        <p>What do you want to include in your random password ?</p>
        <ul>
          <li>
            <label htmlFor="letterRB">Letters</label>
            <input type="checkbox" name="randomFiedldInp" id="letterRB" checked={lettersCheck} onChange={e=>setLettersCheck(e.target.checked)} />
          </li>
          <li>
            <label htmlFor="numberRB">Numbers</label>
            <input type="checkbox" name="randomFiedldInp" id="numberRB" checked={numbersCheck} onChange={e=>setNumbersCheck(e.target.checked)}  />
          </li>
          <li>
            <label htmlFor="uppercaseRB">UpperCase</label>
            <input type="checkbox" name="randomFiedldInp" id="uppercaseRB" checked={uppercaseCheck} onChange={e=>setUpperCheck(e.target.checked)} />
          </li>
          <li>
            <label htmlFor="lowercaseRB">LowerCase</label>
            <input type="checkbox" name="randomFiedldInp" id="lowercaseRB" checked={lowercaseCheck} onChange={e=>setLowerCheck(e.target.checked)} />
          </li>
          <li>
            <label htmlFor="splCharRB">Special Characters</label>
            <input type="checkbox" name="randomFiedldInp" id="splCharRB" checked={splCharCheck} onChange={e=>setSplCheck(e.target.checked)}/>
          </li>
          <li>
            <label htmlFor="lengthRB">Length</label>
            <input type="number" name="" id="lengthRB" value={lengthInp} onChange={e=>setlen(e.target.value)} />
          </li>
        </ul>
        <button onClick={sendToGenerate}>Generate</button>
      </div>
    </div>
  );
}
