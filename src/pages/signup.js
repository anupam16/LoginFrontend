import "./signup.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import data from "../Config.json"

const Signup = (props) => {


  console.log("Sign up props",props);
  let [success, setsuccess] = useState("");

  let [signupemailotp, setsignupemailotp] = useState();
  let [verifyOtp, setVerifyOtp] = useState("");
  let passwordLabelStyle;

  const [count, seTcount] = useState(0);
  const [efullName, seteFullName] = useState("");
  // const[euserName , seteUserName]=useState('');
  const [eemail, seteEmail] = useState("");
  const [ephonenumber, setePhoneNumber] = useState("");
  const [epassword, setePassword] = useState("");
  const [confirmpassword, setconfPassword] = useState("");

  const [verificationInProgress,setVerificationInProgress]=useState(false);

  let passwordPattern = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,20}$/g;

  let phonePattern = /(0|91)?[7-9][0-9]{9}/g;
   
  useEffect(() => {
    if (props.response == 200) {
      setsuccess(
        <div className="sucesss">
          <p>Successfully registered!!!!</p>
        </div>
      );

      props.resCleanUp();
    } else if (props.response == 401 )  {
       console.log("props.response",props.response);
      setsuccess(
        <div className="sucesss">
          <p>Email already exist!!</p>
        </div>
      );

      props.resCleanUp();
    }
  }, [props.response]);

  const submitHandler = (event) => {

    console.log("submitmttttt")
    event.preventDefault();


    const userinfo = {
      username:"",
      full_name: efullName,
      //  userName:euserName,
      email: props.emailBeforeVerify,
      contact_no: ephonenumber,
      password: epassword
    };

    if(confirmpassword !== epassword)   {
      setsuccess(
        <div className="sucesss">
          <p>Check password</p>
        </div>
      );
    } else if(data.isEmailVerificationOptional){
     userinfo.email=eemail;
      props.datafromsignuptoapp(userinfo);
      seteEmail("");
      seteFullName("");
      setePassword("");
      setePhoneNumber("");
      setconfPassword("");
      props.cleanIsVerified();
      props.cleanEmailBeforeVerify();
      setVerificationInProgress(false);
      props.cleanSignupOtpStatus();
      setVerifyOtp("");
    } else{

    
    
    
    if(props.isVerified !== 1 )
    {
      setsuccess(
        <div className="sucesss">
          <p>Email not verified!! </p>
        </div>
      );

    }else if(props.isVerified === 1 ){

      console.log("isVerified",props.isVerified);
      props.datafromsignuptoapp(userinfo);
      seteEmail("");
      seteFullName("");
      setePassword("");
      setePhoneNumber("");
      setconfPassword("");
      props.cleanIsVerified();
      props.cleanEmailBeforeVerify();
      setVerificationInProgress(false);
      props.cleanSignupOtpStatus();
      setVerifyOtp("");
      // seteUserName('');
    }

  }
  };
  const fullNameChangeHandler = (event) => {
    let pattern = /[^a-zA-Z\s]/g;

    let result = pattern.test(event.target.value);

    result
      ? alert(`can't use '${event.target.value.match(pattern)}' in Full Name`)
      : seteFullName(event.target.value);
  };

  // const userNameChangeHandler= (event) =>
  // {seteUserName(event.target.value);

  // }
  const emailChangeHandler = (event) => {

    if(props.isVerified!==1 && props.signupemailotp === false){
      seteEmail(event.target.value);
      console.log("ejefjefjef",props.signupemailotp);
    }
  };

  const phoneNumberChangeHandler = (event) => {
    setePhoneNumber(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setePassword(event.target.value);
  };

  const confirmpasswordChangeHandler = (event) => {
    setconfPassword(event.target.value);
  };

  const verifyemail = (event) => {
    let data = {
      email: eemail,
    };
    let pattern = /[a-zA-Z0-9][a-zA-Z0-9_.]*@[a-zA-Z0-9]+([.][a-zA-z]+)+/g;
    console.log("email", data);
    pattern.test(eemail)
      ? props.otpdataFromSignupToApp(data)
      : alert("Email id not valid");
  };

  useEffect(() => {
    success.length != 0
      ? setTimeout(() => {
          setsuccess("");
        }, 4000)
      : console.log("hello");
  }, [success]);

  // let passwordStyle={

  // epassword?{

  // }:{

  // };
  // }

  const verifyClickHandler = (e) => {

    console.log("props.emailBeforeVerify",props.emailBeforeVerify);
    let detail = {
      email: props.emailBeforeVerify,
      otp: verifyOtp,
    };

    setVerificationInProgress(true);
    props.OtpVerifyFromSignupToApp(detail, true);
  };

  epassword && !passwordPattern.test(epassword)
    ? (passwordLabelStyle = { color: "red" })
    : epassword
    ? (passwordLabelStyle = { color: "green" })
    : console.log("");

  console.log(
    passwordPattern.test(epassword),
    "paassssss",
    epassword,
    epassword.match(passwordPattern)
  );

  const verifyOtpField = (e) => {
    e.preventDefault();

    setVerifyOtp(e.target.value);
  };


  console.log("this is the best way", props.response)
  return (
    <div>
      <style>
        {ephonenumber ? ".txt-field-password span::before{width:100% }" : null}
      </style>
      <div className="center">
        <h1>Signup</h1>
        {success}
        <form
          // method="post"
          onSubmit={submitHandler}
        >
          <div className="txt_field">
            <input
              type="text"
              value={efullName}
              onChange={fullNameChangeHandler}
              required
            />
            <span></span>
            <label>Full Name</label>
          </div>
          {/* <div className="txt_field">
              <input type="text" value={euserName} onChange={userNameChangeHandler} required/>
              <span></span>
              <label>Username</label>
            </div> */}
          <div className="txt_field" style={eemail.length != 0 ? {} : null}>
            <input
              type="text"
              value={eemail}
              onChange={emailChangeHandler}
              required
            />
            <span></span>
            <label style={props.isVerified===1?{color:"green"}:null}>Email</label>
          </div>
          <button
            type="button"
            onClick={verifyemail}
            style={
              eemail.length != 0 && props.signupemailotp === false
                ? {
                    display: "inline-block",

                    padding: "5px 5px 5px 5px",
                  }
                : { display: "none" }
            }
          >
            send OTP
          </button>
          {props.isVerified===1?<h6
                  style={{
                    color: "green",
                    marginTop:"-30px"
                  }}
                >Verified!!</h6>:null}

          {(props.signupemailotp && props.isVerified!==1 ) && (
            <>
              <div
                style={{
                  display: "flex",
                  padding: "0px",
                }}
              >
                <div
                  className="txt_field"
                  style={{
                    margin: "13px 0px",
                  }}
                >
                  <input
                    type="text"
                    value={verifyOtp}
                    onChange={verifyOtpField}
                   
                  />
                  <span></span>
                  <label>Enter OTP</label>
                </div>

                <button
                  type="button"
                  style={{
                    marginLeft: "20px",
                    marginTop: "20px",
                    padding: "5px 20px 5px 20px",
                    height: "30px",
                  }}
                  onClick={verifyClickHandler}
                >
                  verify
                </button>
              </div>
              {props.isVerified===2?<h6
                  style={{
                    color: "red",
                    marginTop:"-10px"
                  }}
                >not valid OTP!!</h6>:null}
            </>
          )}

          <div className="txt-field-password">
            <input
              type="text"
              className={
                ephonenumber ? "epassword-enable" : "epassword-disable"
              }
              value={ephonenumber}
              onChange={phoneNumberChangeHandler}
            />
            <span></span>
            <label
              style={ephonenumber ? { top: "-5px", color: "#2691d9" } : null}
            >
              Phone Number
            </label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              value={epassword}
              onChange={passwordChangeHandler}
              required
            />
            <span></span>
            <label style={passwordLabelStyle}>Password </label>
          </div>

          <div className="txt_field">
            <input
              type="password"
              value={confirmpassword}
              onChange={confirmpasswordChangeHandler}
              required
            />
            <span></span>
            <label
              style={
                epassword === confirmpassword
                  ? epassword.length != 0
                    ? { color: "green" }
                    : null
                  : { color: "red" }
              }
            >
              Confirm Password
            </label>
          </div>
          {/* <p>{epassword && !passwordPattern.test(epassword)?<span>true{passwordPattern.test(epassword)}</span>:<span>false{epassword}</span>}</p> */}

          <div>
            {epassword && !passwordPattern.test(epassword) ? (
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <h6
                  style={{
                    color: "red",
                  }}
                >
                  Password should be 8-20 characters<sup>*</sup>
                  <br /> include atleast one letter<sup>*</sup>
                  <br />
                  include atleast one number <sup>*</sup>
                  <br />
                  include atleast one special character<sup>*</sup>
                </h6>
              </div>
            ) : null}
          </div>
          <input type="submit" value="Signup" />
          <div className="signup_link">
            Already a member?
            <Link to="/">&nbsp;Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
