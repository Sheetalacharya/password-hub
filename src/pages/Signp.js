import React, { useState } from 'react';
import '../Stylesheets/loginsignup.css';



const Signp = () => {
   
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

   
   async function signup(e) {
    e.preventDefault();
    console.log(signupValues);
    const { email, password,fullname,dob,phone} = signupValues;

    const response = await fetch("", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: {
        email,
        password,
        fullname,dob,phone
      },
    });
    const data = await response.json();
    if(data.status==="success"){
        localStorage.setItem("authToken",data.authToken)
    }
  }

    return (
        <div className="signupBody">
          <div className='wrapper'>
            <div className='form-box register'>
              <h2>Sign Up</h2>
                <form action="/">
                    <div className='inputRegister'>
                       
                        <input type="text" name="fullname" value={signupValues.fullname} onChange={inputHandler} placeholder='Name'/>
                       
                    </div>
                    <div className='inputRegister'>
                       
                        <input type="email"  name="email" value={signupValues.email} onChange={inputHandler} placeholder='Email'/>
                        
                    </div>
                    <div className='inputRegister'>
                       
                        <input type="date" name="dob" value={signupValues.dob} onChange={inputHandler} placeholder='DOB' />
                        
                    </div>
                    <div className='inputRegister'>
                       
                        
                        <input type="text" name="phone" value={signupValues.phone}  onChange={inputHandler} placeholder="Phone"/>
                      
                       
                    </div>
                    <div className='inputRegister'>
                      
                        <input type="password" name="password" value={signupValues.password} onChange={inputHandler} placeholder='Password' />
                      
                    </div>
                    <div className='inputRegister'>
                        
                        <input type="password" name="confirmpassword"  value={signupValues.confirmpassword} onChange={inputHandler} placeholder='Confirm Password'/>
                       
                    </div>
                    <button type="submit" className='btn' onClick={signup}>SignUp</button>
                    <div className="register-login">
                        <p>Already have an account ? <a href="signin" className="register-link">Login</a></p>
                    </div>
                </form>
            </div>
            </div>
            </div>
       
    );
}

export default Signp;