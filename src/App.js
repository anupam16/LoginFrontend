import Login from "./pages/login";
import Signup from "./pages/signup";
import PostLogin from "./pages/postlogin";
import data from "./Config.json";
import Dashboard from "./pages/dashboard";

import React, { useState, useEffect } from "react";

import { Routes, Route, useNavigation, useNavigate, useSearchParams } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword";
import localforage from "localforage";

function App() {
  const navigate = useNavigate();
  let pages;
  let signup;
  const [resjsonobj, setResjsonobj] = useState("");
  const[loginMessage,setLoginMessage]=useState("");

  const [res, setRes] = useState("");
  const [isOTP, setisOtp] = useState(false);
  const [isOTPsignup, setisOtpsignup] = useState(false);
  const [casLoginData, setCasLoginData] = useState();
  const [messageCasLogin, setMessageCasLogin] = useState("");
  const [showLogin, setShowLogin] = useState();

  const [authorized, setAuthorized] = useState();

  const [casToken, setCasToken] = useState(localStorage.getItem("token"));

  const [isVerified, setIsVerified] = useState(0);

  const [emailBeforeVerify, setEmailBeforeVerify] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  let a= localStorage.getItem("token");
const [login,setLogin]=useState(false);

  const casDataGather = (castoken) => {
    fetch(data.casaftertoken, {
      headers: {
        method: "POST",
        Authorization: "Bearer " + castoken,
      },
    })
      .then((res) => res.json())
      .then((obj) => {
        if (obj.status != 200) {
          console.log("obj.status", obj.status);
         setLogin(true);
          setCasToken("");
          localStorage.removeItem("token");
        } else {
          console.log("obj.status111", obj);
          setLogin(false);
        
          setCasLoginData(obj.data);
        }
      });
  };

  

  const resCleanUp=()=>{
 
    setRes("");

  }
  useEffect(() => {
    if (casToken) {
      casDataGather(a);
    } else if(searchParams.get("token"))  {
        localStorage.setItem("token",searchParams.get("token"));
        casDataGather(searchParams.get("token"));
      console.log("testinh",searchParams.get("token"))
    }

     else{ 
      console.log("login true");
      setLogin(true);
    }
 }, [casToken]);



  function dataFromLoginToApp(logininfo) {
    fetch(data.login, {
      method: "POST",
      body: JSON.stringify(logininfo),
      headers:
       {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json.status",json.status)
      
      

          if(json.status ===401 || json.status === "401")
          {  console.log("json.status",json.status)
           setLoginMessage(json.message);

          }else{
            localStorage.setItem(
              "token",
              json["auth_token"]
            );
            fetch(data.casaftertoken, {
              headers: {
                method: "POST",
                Authorization:
                  "Bearer " + json["auth_token"],
              },
            })
              .then((res) => res.json())
              .then((obj) => {
                setCasLoginData(obj.data);
              });
    
          }
      });
  }

  function loginMessageCleanUp()
  {

    setLoginMessage("");
  }


  function casLoginMessageCleanUp()
  {
    setMessageCasLogin("");
  
  }
  function dataFromAppToCasLogin(detail) {
    fetch(data.caslogintoken, {
      method: "POST",
      body: JSON.stringify(detail),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((obj) => {
        if (obj.status != 200) {
          setMessageCasLogin("Invalid Credentials");
          console.log("invalid credentials");
        } else {
          localStorage.setItem("token", obj.auth_token);
          fetch(data.casaftertoken, {
            headers: {
              method: "POST",
              Authorization: "Bearer " + obj.auth_token,
            },
          })
            .then((res) => res.json())
            .then((obj) => {
              setCasLoginData(obj.data);
            });
        }
      });
  }

 
  function dataFromForgotPasswordToApp(detail) {
    console.log("detail.eeemail",detail.email);
    setEmailBeforeVerify(detail.email);
    fetch(data.forgot, {
      method: "POST",
      body: JSON.stringify(detail),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setisOtp(json.status));
  }

  function otpdataFromSignupToApp(detail) {
    console.log("detail.eeemail",detail.email);
    setEmailBeforeVerify(detail.email);
    fetch(data.forgot, {
      method: "POST",
      body: JSON.stringify(detail),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setisOtpsignup(json.status);
      });
  }

  console.log(isOTP);

  console.log("signupotp", isOTPsignup);
  const cleanIsVerified = () => {
    setIsVerified(0);
  };

  const cleanEmailBeforeVerify=()=>{

    setEmailBeforeVerify("");
  }

  const cleanSignupOtpStatus=()=>{

    setisOtpsignup(false);

  }

  function OtpDataFromForgotPasswordToApp(detail, isSignup) {
    console.log("detaul", detail);
    fetch(data.verify, {
      method: "POST",
      body: JSON.stringify(detail),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === true) {
          
          setIsVerified(1);
        } else {
          setIsVerified(2);
        }
      });
  }

  let loginPage = (
    <Login datafromlogintoapp={dataFromLoginToApp} responseobj={resjsonobj} message={loginMessage}  loginMessageCleanUp={loginMessageCleanUp}/>
  );

  if (!login) {
    loginPage = "";
  }

  if (resjsonobj === "" || resjsonobj.userId === 0) {
    pages = (
      <>
        <Route path="/" element={loginPage}></Route>
        <Route
          path="/signup"
          element={
            <Signup
              datafromsignuptoapp={dataFromSignupToApp}
              response={res}
              otpdataFromSignupToApp={otpdataFromSignupToApp}
              signupemailotp={isOTPsignup}
              OtpVerifyFromSignupToApp={OtpDataFromForgotPasswordToApp}
              emailBeforeVerify={emailBeforeVerify}
              isVerified={isVerified}
              cleanIsVerified={cleanIsVerified}
              cleanEmailBeforeVerify={cleanEmailBeforeVerify}
              cleanSignupOtpStatus={cleanSignupOtpStatus}
              resCleanUp={resCleanUp}
            />
          }
        ></Route>

        <Route
          path="/forgotpassword"
          element={
            <ForgotPassword
              dataFromForgotPasswordToApp={dataFromForgotPasswordToApp}
              OtpDataFromForgotPasswordToApp={OtpDataFromForgotPasswordToApp}
              isotp={isOTP}
            />
          }
        ></Route>


        <Route
          path="/dashboard"
          element={<Dashboard data={casLoginData} nav={navigate} />}
        />
      </>
    );
  } else {
    pages = (
      <Route path="/" element={<PostLogin responseobj={resjsonobj} />}></Route>
    );
  }

  function dataFromSignupToApp(userinfo) {
  
     console.log("userinfo",userinfo);
  
    fetch(data.registration, {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: {
        "content-Type": "application/json",
      },
    }).then((response) => {

      setRes(response.status);
      console.log("after registration",response);

      cleanIsVerified();
      cleanEmailBeforeVerify();
      cleanSignupOtpStatus();

    });
  }

  console.log("casdata", casLoginData);

  useEffect(() => {
    casLoginData !== undefined ? navigate("/dashboard") : console.log("okkkk");
  }, [casLoginData]);

  

  return (
    <div className="App">
      <header className="App-header">
        <Routes>{pages}</Routes>
      </header>
    </div>
  );
}

export default App;
