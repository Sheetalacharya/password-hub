import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signp";
import Home from "./pages/Home";

import PasswordState from "./context/passwordState";

function App() {
  const [isloggedin,setIsloggedin]=useState(false)
  const[authToken,setAuthToken]=useState(localStorage.getItem("authToken"))

  useEffect(()=>{
    setAuthToken(localStorage.getItem("authToken"))
    if(authToken)setIsloggedin(true)
    else setIsloggedin(false)
  },[authToken])

  
  return (
    <div className="App">
      <PasswordState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home isloggedin={isloggedin} />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </PasswordState>
    </div>
  );
}

export default App;
