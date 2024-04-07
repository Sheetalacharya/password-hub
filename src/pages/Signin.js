import React, { useState } from "react";


import "../Stylesheets/loginsignup.css";



const Signin = () => {
  

  const [signinValues, setSigninValues] = useState({
    email: "",
    password: "",
  });
 
  const inputHandler = (e) => {
    setSigninValues({ ...signinValues, [e.target.name]: e.target.value });
  };

  async function signin(e) {
    e.preventDefault();
    const { email, password } = signinValues;

    const response = await fetch("", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: {
        email,
        password,
      },
    });
    const data = await response.json();
    if(data.status==="success"){
        localStorage.setItem("authToken",data.authToken)
    }
  }

  return (
    <div className="signinBody">
      <div className="wrapper1">
        <div className="form-box login">
          <h2>Login</h2>
          <form action="/">
            <div className="inputlogin">
             
              <input
                type="email"
                name="email"
                value={signinValues.email}
                onChange={inputHandler} placeholder="Email"
              />
              
            </div>
            <div className="inputlogin">
             
      
              <input
                type="password"
                name="password"
                value={signinValues.password}
                onChange={inputHandler} placeholder="Password"
              />
              
            </div>
            <button type="submit" className="btn" onClick={signin}>
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
