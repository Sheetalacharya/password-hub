import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signp";
import Home from "./pages/Home";

import PasswordState from "./context/passwordState";

function App() {
  return (
    <div className="App">
      <PasswordState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </PasswordState>
    </div>
  );
}

export default App;
