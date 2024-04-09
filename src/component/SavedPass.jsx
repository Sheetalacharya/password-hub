import React,{useContext} from "react";
import "../Stylesheets/savedPass.css";
import SavedPasscard from "./SavedPasscard";
import { passwordcontext } from "../context/passwordState";

export default function SavedPass() {
const passwordState=useContext(passwordcontext)
const {passwords}=passwordState
  return (
    <div className="savedPass-container">
      {passwords.length>0 && passwords.map((password)=>(<SavedPasscard password={password} key={password._id}/>))}
    </div>
  );
}
