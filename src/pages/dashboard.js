import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../Config.json";
const Dashboard = (props) => {
  props.data == undefined
    ? (window.location.href = "/")
    : console.log("ffaaaaaaaaaaaaaaa"); //props.nav("/")

  const logoutClickHandler = (e) => {
    fetch(config.logout, {
   
        method : "POST",
        headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
      .then((res) => res.json())
      .then((obj) => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  };

  return (
    <>
      <style>
        {`body {  background: white; } 
   .logoutbutton:hover{
      cursor:pointer

   }

   `}
      </style>

      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <span
          className="logoutbutton"
          onClick={logoutClickHandler}
          style={{
            border: "1px Solid black",
            padding: "3px 4px 3px 4px",
            background: "grey",
          }}
        >
          {" "}
          Logout{" "}
        </span>
      </div>
    

      <div className="userDetails" style={{

        textAlign:"center"
      }}>
        <ul>
          <li> {props.data ? props.data.email : null} </li>
          <li>{props.data?props.data.full_name:null}</li>
          <li>{props.data?props.data.contact_no:null}</li>
          <li>{props.data?props.data.method:null}</li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
