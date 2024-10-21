import React, { useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import data from "../Config.json";
import App from "../App";

const Login = (props) => {
  const [edetail, setedetail] = useState("");
  const [epassword, setepassword] = useState("");
  const [message, setMessage] = useState("");
  const detailHandler = (event) => {
    setedetail(event.target.value);
  };

  let danger;
  const passwordHandler = (event) => {
    setepassword(event.target.value);
  };

  function loginSubmitHandler(event) {
    event.preventDefault();
    let logininfo = {
      email: edetail,
      password: epassword,
    };

    props.datafromlogintoapp(logininfo);

    setedetail("");
    setepassword("");
  }
  if (props.responseobj.userId === 0) {
    danger = (
      <div className="sucesss">
        <p>Wrong credentials</p>
      </div>
    );
  }

  const anchorClick = (e) => {
    e.preventDefault();
    fetch(data.googlelogin)
      .then((response) => response.json())
      .then((data) => console.log(data));
    // window.location.href = "http://10.10.6.167:5000/template";
  };

  const anchorClickCas = (e) => {
    e.preventDefault();

    console.log("anchor");

    fetch("http://10.10.6.39:8080/google", {
      method: "POST",
      body: JSON.stringify({
        username: "chink",
        password: "bebo123",
      }),
      headers: {
        "content-Type": "application/json",
      },
    }).then((res) => {
      console.log("resp", res);
    });
    // window.location.href = "http://10.10.6.167:5000/cas";
  };
  useEffect(() => {
    if (props.message) {
      setMessage(
        <div className="sucesss">
          <p>{props.message}</p>
        </div>
      );
    }
  }, [props.message]);

  useEffect(() => {
    message
      ? setTimeout(() => {
          setMessage("");
          props.loginMessageCleanUp();
        }, 4000)
      : console.log("hello");
  }, [message]);
  return (
    <div>
      <div className="center">
        <h1>Login</h1>
        {message}

        <form method="post" onSubmit={loginSubmitHandler}>
          <div className="txt_field">
            <input
              type="text"
              value={edetail}
              onChange={detailHandler}
              required
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              value={epassword}
              onChange={passwordHandler}
              required
            />
            <span></span>
            <label>Password</label>
          </div>

          <div className="pass">
            <Link to="/forgotpassword">&nbsp;Forgot Password?</Link>
          </div>
          <input type="submit" value="Login" />

          <div>
            {/* <hr style={{
 margin:"15px 0px 10px 0px",
  width:"30%",
  display:"inline-block"

            }}/>
            <span>Or sign in with</span>
 */}

            {data.isCasLogin == false && data.isCasLogin == false ? null : (
              <p className="or_sign_in">
                <span>Or sign in with</span>
              </p>
            )}
          </div>
          <div className="or_sign_in_container">
           { data.isGoogleOauth?<a
              href="#"
              role="button"
              onClick={anchorClick}
              className="or_signin_icon"
            >
              <span className=" or_signin_icon_child">
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB&psig=AOvVaw100QIWuoAsZdWnrmqFG7BC&ust=1669872190023000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJi6xfuT1fsCFQAAAAAdAAAAABAD"></img>
              </span>
              Google
            </a>:null
           }


           { data.isCasLogin? <Link
              to="/caslogin"
              role="button"
              className="or_signin_icon"
              style={{ marginLeft: "10px" }}
            >
              <span className=" or_signin_icon_child">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/263/263069.png"
                  style={{ marginLeft: "14px", padding: "6px" }}
                ></img>
              </span>
              Cas Login
            </Link>:null}
          </div>

          <div className="signup_link">
            Not a member?
            <Link to="/signup">&nbsp;Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
