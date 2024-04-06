import React, { useState } from 'react';
import message_icon from '../assets/message.png';
import password_icon from '../assets/eye.png';
import invisiblepassword_icon from '../assets/invisible.png';
import '../Stylesheets/loginsignup.css';

const Signin = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(invisiblepassword_icon);
    const [buttonClicked, setButtonClicked] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        setPasswordIcon(passwordVisible ? invisiblepassword_icon : password_icon);
        setButtonClicked(true);
    };
    const[signinValues,setSigninValues]=useState({
        email:"",
        password:""
    });
    const inputHandler=(e)=>{
        setSigninValues({...signinValues,[e.target.name]:e.target.value})
       };

    return (
      <div className='signinBody'>
        <div className="wrapper1">
            <div className="form-box login">
                <h2>Login</h2>
                <form action="/">
                    <div className='inputlogin'>
                        <img src={message_icon} alt=""/>
                        <input type="email"  name="email" value={signinValues.email} onChange={inputHandler} />
                        <label>Email</label>
                    </div>
                    <div className='inputlogin'>
                        <img src={passwordIcon} alt="" onClick={togglePasswordVisibility} />
                        <input type={passwordVisible ? "text" : "password"}  name="password" value={signinValues.password} onChange={inputHandler} />
                        <label>Password</label>
                    </div>
                    <button type="submit" className='btn' onClick={()=>{console.log(signinValues.fullname);}}>SignUp</button>
                    <div className="register-login">
                        <p>Create an account? <a href="#" className="register-link">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Signin;