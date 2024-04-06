import React, { useRef,useEffect, useState} from "react";
import "../Stylesheets/editBox.css";
import "../Stylesheets/popupForCustom.css"

export default function EditBox(props) {
    const closeEditDiv=useRef()
    const [passVisible,setPassVisible]=useState(false)
const {closeEditBox,isEditing}=props
    // useEffect(() => {
    //     function handler(e) {
    //       if (isEditing && !closeEditDiv.current.contains(e.target)) {
    //         closeEditBox()
    //       }
    //     }
    //     document.addEventListener("mousedown", handler);
    //     return () => {
    //       document.removeEventListener("mousedown", handler);
    //     };
    //     // eslint-disable-next-line
    //   }, []);

  return (
    <div className="editBox-container popup-container" ref={closeEditDiv}>
      <div className="sub-editCont">
        <h2>Edit here</h2>
        <input type="text" name="" id="" placeholder="Enter your title" />
        <div>
        <input type="password" name="" id="" placeholder="Enter your password" />
            <i className={`fa-solid fa-eye${passVisible?"":"-slash"}`} onClick={()=>setPassVisible(prev=>!prev)}></i>
        </div>
       <div>
       <button>Edit</button>
        <button onClick={() => closeEditBox()}>Cancel</button>
       </div>
      </div>
    </div>
  );
}
