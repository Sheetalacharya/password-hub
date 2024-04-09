import React, { useRef, useState, useEffect } from "react";
import "../Stylesheets/navbar.css";
import { useNavigate } from "react-router-dom";
import img from "../assets/logo.png"

export default function Navbar(props) {
  const [displayProfileList, setDisplayProfileList] = useState(false);
  const closeProfileList = useRef();
  const navigate = useNavigate();

  const handleListVisibility = () => setDisplayProfileList((prev) => !prev);

  useEffect(() => {
    function handler(e) {
      if (displayProfileList && !closeProfileList.current.contains(e.target)) {
        setDisplayProfileList(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <nav>
      <div className="logo"><img src={img} alt="" /></div>
      <div className="profileBtn">
        <button className="profileIcon" onClick={handleListVisibility}>
          <i className="fa-solid fa-user"></i>{" "}
        </button>
      </div>
      {displayProfileList && (
        <ul className="profileList" ref={closeProfileList}>
          <li>
            <button onClick={()=>navigate("/profile")}>View Profile</button>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                navigate("/signup")
              }}  
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
