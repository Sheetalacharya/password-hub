import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import PasswordState from "./context/passwordState";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isloggedin,setIsloggedin]=useState(false)
  const[authToken,setAuthToken]=useState(localStorage.getItem("authToken"))

  useEffect(()=>{
    setAuthToken(localStorage.getItem("authToken"))
    if(authToken) return setIsloggedin(true)
    else setIsloggedin(false)
  },[authToken])

  
  return (
    <div className="App">
      <PasswordState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home isloggedin={isloggedin} setIsloggedin={setIsloggedin} />} />
            <Route path="/signin" element={<Signin setIsloggedin={setIsloggedin} />} />
            <Route path="/signup" element={<Signup setIsloggedin={setIsloggedin} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </PasswordState>
    </div>
  );
}

export default App;
