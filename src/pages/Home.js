import React, { useState, useRef } from "react";
import "../Stylesheets/home.css";
import Navbar from "../component/Navbar";
import SavedPass from "../component/SavedPass";
import PopupForCustom from "../component/PopupForCustom";
import PopupForRandom from "../component/PopupForRandom";

export default function Home() {
  const [popupForCustom, setPopupForCustom] = useState(false);
  const [popupForRandom, setPopupForRandom] = useState(false);

  function closePopup(type, val) {
    console.log(type, val);
    type === "custom" ? setPopupForCustom(val) : setPopupForRandom(val);
  }
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="inputGen-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mainoptions">
              <button
                onClick={() =>
                  popupForCustom
                    ? setPopupForCustom(false)
                    : setPopupForCustom(true)
                }
              >
                Get password by user Input
              </button>
              <button
                onClick={() =>
                  popupForRandom
                    ? setPopupForRandom(false)
                    : setPopupForRandom(true)
                }
              >
                Get random password
              </button>
            </div>
            <input
              type="text"
              id="title-input"
              placeholder="Enter title of site"
            />
            <div>
              <input
                type="text"
                id="password-output"
                placeholder="Your password will show here"
              />
              <button id="copyPasswordBtn"><i class="fa-regular fa-copy"></i></button>
            </div>
            <div>
              <button id="regenerateBtn">Regenerate</button>
              <button id="saveBtn">Save</button>
            </div>
          </form>
        </div>
        <h2>Saved Passwords</h2>
        <SavedPass />
        <button className="addPass"><i class="fa-regular fa-plus"></i></button>
      </div>
      {popupForCustom && (
        <PopupForCustom
          closePopup={closePopup}
          popupForCustom={popupForCustom}
        />
      )}
      {popupForRandom && (
        <PopupForRandom
          closePopup={closePopup}
          popupForRandom={popupForRandom}
        />
      )}
    </>
  );
}
