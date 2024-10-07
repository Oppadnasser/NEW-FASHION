import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const navigate = useNavigate();
  const [logInfo, setLogInfo] = useState({
    email: "",
    password: "",
  });
  const [worngPopup, setWrongPopup] = useState(false);
  const SendData = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/log-in",
        { ...logInfo },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          const hiddenItems = document.querySelectorAll(".hidden-content");
          hiddenItems.forEach((item) => {
            item.style.display = "block";
          });
          const showedItem = document.querySelector(".showed-content");
          showedItem.style.display = "none";
          if (res.request.response === "Admin") {
            const admin = document.querySelector(".admin-register-text");
            admin.style.display = "block";
          } else if (res.request.response === "Seller") {
            const Seller = document.querySelectorAll(".seller-content");
            Seller.forEach((item) => {
              item.style.display = "block";
            });
          }
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err);
        setWrongPopup(true);
      });
  };
  const Redirect = () => {
    navigate("/register");
  };

  return (
    <div className="Log-in-div">
      <form className="log-in-form">
        <h1>Log-In</h1>
        <br />
        <br />

        <label>Email</label>
        <input
          value={logInfo.email}
          type="text"
          onChange={(event) => {
            setLogInfo({ ...logInfo, email: event.target.value });
          }}
        />

        <label>Password</label>
        <input
          value={logInfo.password}
          type="password"
          onChange={(event) => {
            setLogInfo({ ...logInfo, password: event.target.value });
          }}
        />

        <button onClick={SendData} className="log-in-login-page">
          Log-in
        </button>

        <label id="to-register-link">Don't Have An Account?</label>
        <br />
        <button onClick={Redirect} className="register-login-page">
          Register
        </button>
      </form>
      {worngPopup && (
        <div className="wrong-popup">
          <h3>WRONG PASSWORD OR E-MAIL!</h3>
          <button
            onClick={() => {
              setWrongPopup(false);
            }}
          >
            try again
          </button>
          <h5>or</h5>
          <Link to="/user-register">
            <button>Sign-in</button>
          </Link>
        </div>
      )}
    </div>
  );
}
