import React, { useState } from 'react'

const ForgotPassword = (props) => {
 
let [email,setEmail]=useState('');
 
// let [verifytoggle,setverifytoggle]=useState(false);

let [otp,setOtp]=useState();
 


 const submitHandler=(e)=>{
    e.preventDefault();
    let data={
        email:email
    }

    props.dataFromForgotPasswordToApp(data);

    console.log(data);
// setEmail('');
 }
 const emailChangeHandler=(e)=>
 {
  setEmail(e.target.value);

 }

const otpHandler=(e)=>{

setOtp(e.target.value);

}

const otpClickHandler=(e)=>
{
   e.preventDefault();
    let data={
        email:email,
        otp:otp
    }
props.OtpDataFromForgotPasswordToApp(data);


    
}
    return (
  <div className="center" style={
    {
        boxSizing:"border-box",
      height:"340px"

    }
  }>
   <h1>Forgot Password</h1>
   {props.isotp?<h4 style={{
     marginLeft:"110px"
   }}>OTP sent Successfully!!</h4>:null}
   <form  onSubmit={props.isotp?null:submitHandler}>
  
   <div className="txt_field">
       <input type="text" value={email}  onChange={emailChangeHandler} required/>
       <span></span>
       <label>Email</label>
     </div>

     {props.isotp? <><div className="txt_field">
       <input type="text" value={otp}  onChange={otpHandler} required/>
       <span></span>
       <label>Enter otp</label>

      
     </div>
     <button style={{
        marginLeft:"120px",
        padding:"5px 20px 5px 20px"
     }}onClick={otpClickHandler}>verify</button>
     </>
     :null}
{props.isotp?null:<input type="submit" value="Send OTP"/>}
     
     </form>
     </div>
  )
}

export default ForgotPassword
