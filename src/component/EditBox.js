  import React, { useRef,useContext, useState} from "react";
import "../Stylesheets/editBox.css";
import "../Stylesheets/popupForCustom.css"
import { passwordcontext } from "../context/passwordState";

export default function EditBox(props) {
    const closeEditDiv=useRef()
    const passwordState=useContext(passwordcontext)
  const {editPassword}=passwordState

    const [passVisible,setPassVisible]=useState(false)

    const {closeEditBox,isEditing,password}=props

    const[editData,setEditData]=useState(password)
  

    const handleOnchange=(e)=>setEditData({...editData,[e.target.name]:e.target.value})
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

function handleEditBtn(){
  editPassword(editData,"auth")
  props.handleEditedText(editData.title,editData.password)
  closeEditBox()
}

  return (
    <div className="editBox-container popup-container" ref={closeEditDiv} key={password._id}>
      <div className="sub-editCont">
        <h2>Edit here</h2>
        <input type="text" name="title" value={editData.title} onChange={handleOnchange} placeholder="Enter your title" />
        <div>
        <input type={`${passVisible?"text":"password"}`} name="password" value={editData.password} onChange={handleOnchange} placeholder="Enter your password" />
            <i className={`fa-solid fa-eye${passVisible?"":"-slash"}`} onClick={()=>setPassVisible(prev=>!prev)}></i>
        </div>
       <div>
       <button onClick={handleEditBtn}>Edit</button>
        <button onClick={() => closeEditBox()}>Cancel</button>
       </div>
      </div>
    </div>
  );
}
