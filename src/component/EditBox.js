  import React, { useRef,useContext, useState} from "react";
import "../Stylesheets/editBox.css";
import "../Stylesheets/popupForCustom.css"
import { passwordcontext } from "../context/passwordState";
import PopupMsg from "./PopupMsg"
import { type } from "@testing-library/user-event/dist/type";

export default function EditBox(props) {
    const closeEditDiv=useRef()
    const passwordState=useContext(passwordcontext)
  const {editPassword}=passwordState

    const [passVisible,setPassVisible]=useState(false)
    const {closeEditBox,password}=props
    const[editData,setEditData]=useState(password)
    const [errorMsg, setErrorMsg] = useState("");
    const [msgType,setMsgType]=useState(null)
  

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
  if(editData.title===""){
    return showErrorMessage("Title is required","error")
  }
  if(editData.username===""){
    return showErrorMessage("Username is required","error")
  }
  if(editData.password===""){
    return showErrorMessage("Password is required","error")
  }
  let authToken=localStorage.getItem("authToken")
  editPassword(editData, authToken,editData._id)
  props.handleEditedText(editData.title,editData.password)
  closeEditBox()
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
    <div className="editBox-container popup-container" ref={closeEditDiv} key={password._id}>
      <div className="sub-editCont">
        <h2>Edit here</h2>
        <input type="text" name="title" autoComplete="off" value={editData.title} onChange={handleOnchange} placeholder="Title" />
        <input type="text" name="username" autoComplete="off" value={editData.username} onChange={handleOnchange} placeholder="Username" />
        <div>
        <input type={`${passVisible?"text":"password"}`} name="password" value={editData.password} onChange={handleOnchange} placeholder="Enter your password" />
            <i className={`fa-solid fa-eye${passVisible?"":"-slash"}`} onClick={()=>setPassVisible(prev=>!prev)}></i>
        </div>
       <div>
       <button onClick={handleEditBtn}>Edit</button>
        <button onClick={() => closeEditBox()}>Cancel</button>
       </div>
      </div>
      {errorMsg && <PopupMsg message={errorMsg} setErrorMsg={setErrorMsg} type={msgType} />}
    </div>
  );
}
