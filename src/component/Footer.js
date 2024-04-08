import React from "react";
import img from "../assets/logo.png";
import "../Stylesheets/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footerLogo">
        <img src={img} alt="" />
      </div>
      <div>
        <ul className="footerIcons">
          <span>Contact</span>
          <li>
            <a href="mailto:manishkulal54@g,ail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </li>
          <li>
            <a href="tel:+919741933493">
              <i className="fa-solid fa-phone"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
        <p className="crText">
          Copyright @ 2024 Password Hub. All rights are reserved
        </p>
      </div>
    </footer>
  );
}
