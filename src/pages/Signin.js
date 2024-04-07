import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

import "../Stylesheets/loginsignup.css";

const Signin = () => {
  const [signinValues, setSigninValues] = useState({
    email: "",
    password: "",
  });
  const[eyeBtnShow,setEyeBtnShow]=useState(false)
  const navigate=useNavigate()

  const inputHandler = (e) => {
    setSigninValues({ ...signinValues, [e.target.name]: e.target.value });
  };

  async function signin(e) {
    e.preventDefault();
    const { email, password } = signinValues;
    const url="http://localhost:3001"
    const response = await fetch(`${url}/auth/api/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      localStorage.setItem("authToken", data.message);
      navigate("/")
    }
  }

  return (
    <div className="signinBody">
      <div className="wrapper1">
        <div className="form-box login">
          <h2>Login</h2>
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="inputlogin">
              <input
                type="email"
                name="email"
                value={signinValues.email}
                onChange={inputHandler}
                placeholder="Email"
              />
            </div>
            <div className="inputlogin">
              <input
                type={`${eyeBtnShow?"text":"password"}`}
                name="password"
                value={signinValues.password}
                onChange={inputHandler}
                placeholder="Password"
              />
              <button className="eyeBtn" onClick={()=>setEyeBtnShow(prev=>!prev)}><i className={`fa-solid fa-eye${eyeBtnShow?"":"-slash"}`}></i></button>
            </div>
            <button className="btn" onClick={signin}>
              Login
            </button>
            <div className="register-login">
              <p>
                Create an account?{" "}
                <a href="/signup" className="register-link">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
