import React from "react";
import "../Stylesheets/home.css";
import Navbar from "../component/Navbar";
import SavedPass from "../component/SavedPass";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="inputGen-container">
          <form action="">
          <div className="mainoptions">
            <button>Button1</button>
            <button>Button2</button>
          </div>
            <input type="text" placeholder="Enter title of site" />
            <div>
              <input type="text" placeholder="Your password will show here" />
              <button id="copyPasswordBtn">C</button>
            </div>
            <div>
            <button id="regenerateBtn">Regenerate</button>
            <button id="saveBtn">Save</button>
            </div>
          </form>
        </div>
        <h2>Saved Passwords</h2>
        <SavedPass/>
        <button className="addPass">+</button>
      </div>
    </>
  );
}
