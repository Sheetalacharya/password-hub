import React, { useState } from 'react';
import '../Stylesheets/loginsignup.css';
import user_icon from '../assets/admin.png';
import password_icon from '../assets/eye.png';
import invisiblepassword_icon from '../assets/invisible.png';
import message_icon from '../assets/message.png';
import phone_icon from '../assets/phone.png';

const Signp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(invisiblepassword_icon);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        setPasswordIcon(passwordVisible ? invisiblepassword_icon : password_icon );
    };
   const [signupValues,setSigupValues]=useState({
    fullname:"",
    email:"",
    dob:"",
    phone:"",
    password:"",
    confirmpassword:""
   });
   const inputHandler=(e)=>{
    setSigupValues({...signupValues,[e.target.name]:e.target.value})
   };

    return (
        <div className="signupBody">
          <div className='wrapper'>
            <div className='form-box register'>
              <h2>Sign Up</h2>
                <form action="/">
                    <div className='inputRegister'>
                        <img src={user_icon} alt=""/>
                        <input type="text" name="fullname" value={signupValues.fullname} onChange={inputHandler}/>
                        <label>Name</label>
                    </div>
                    <div className='inputRegister'>
                        <img src={message_icon} alt=""/>
                        <input type="email"  name="email" value={signupValues.email} onChange={inputHandler}/>
                        <label>Email</label>
                    </div>
                    <div className='inputRegister'>
                       
                        <input type="date" name="dob" value={signupValues.dob} onChange={inputHandler} />
                        <label>DOB</label>
                    </div>
                    <div className='inputRegister'>
                        <img src={phone_icon} alt=""/>
                        
                        <input type="text" name="phone" value={signupValues.phone}  onChange={inputHandler}/>
                      
                        <label >Phone Number</label>
                    </div>
                    <div className='inputRegister'>
                        <img src={passwordIcon} alt="" onClick={togglePasswordVisibility} />
                        <input type={passwordVisible ? "text" : "password"} name="password" value={signupValues.password} onChange={inputHandler} />
                        <label>Password</label>
                    </div>
                    <div className='inputRegister'>
                        <img src={passwordIcon} alt="" onClick={togglePasswordVisibility} />
                        <input type={passwordVisible ? "text" : "password"} name="confirmpassword"  value={signupValues.confirmpassword} onChange={inputHandler}/>
                        <label>Confirm Password</label>
                    </div>
                    <button type="submit" className='btn' onClick={()=>{console.log(signupValues.fullname);}}>SignUp</button>
                    <div className="register-login">
                        <p>Already have an account?<a href="#" className="register-link">Login</a></p>
                    </div>
                </form>
            </div>
            </div>
            </div>
       
    );
}

export default Signp;