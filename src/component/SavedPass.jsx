import React from "react";
import "../Stylesheets/savedPass.css";
import SavedPasscard from "./SavedPasscard";

export default function SavedPass() {
  return (
    <div className="savedPass-container">
      <SavedPasscard title={"hello"} password={"password"}/>
    </div>
  );
}
