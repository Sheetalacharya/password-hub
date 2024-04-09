import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";

import PasswordState from "./context/passwordState";


function App() {  
  return (
    <div className="App">
      <PasswordState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </PasswordState>
    </div>
  );
}

export default App;
