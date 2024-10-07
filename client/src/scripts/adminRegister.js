import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function AdminRegister() {
  const [AInfo, setAInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: Date,
    phone: "",
    address: "",
    email: "",
    password: "",
    cPassword: "",
    userType: "Admin",
  });
  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  // const [date, setDate] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const SendData = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/sign-in", { ...AInfo })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.response) {
          let message = "";
          for (let key in err.response.data.errors) {
            message += "\n" + err.response.data.errors[key];
          }
          window.alert(message);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("no");
          console.log(err.message);
        }
      });
  };

  return (
    <div className="admin-register-container" id="admin-register-container">
      <form
        id="admin-register-form"
        className="admin-register-form"
        onSubmit={handleRegister}
      >
        <h1 id="admin-register-h1" className="admin-register-h1">
          Register As Admin
        </h1>
        <br />
        <label id="admin-register-label" className="admin-register-label">
          First Name
        </label>
        <input
          id="admin-register-input-fname"
          className="admin-register-input-fname"
          type="text"
          placeholder="     First Name"
          value={AInfo.firstName}
          onChange={(e) => setAInfo({ ...AInfo, firstName: e.target.value })}
          required
        />

        <label id="admin-register-label" className="admin-register-label">
          Last Name
        </label>
        <input
          id="admin-register-input-lname"
          className="admin-register-input-lname"
          type="text"
          placeholder="     Last Name"
          value={AInfo.lastName}
          onChange={(e) => setAInfo({ ...AInfo, lastName: e.target.value })}
          required
        />

        <label id="admin-register-label" className="admin-register-label">
          Date Of Birth
        </label>
        <input
          id="admin-register-input-date"
          className="admin-register-input-date"
          type="date"
          placeholder="     Date Of Birth"
          value={AInfo.dateOfBirth}
          onChange={(e) => setAInfo({ ...AInfo, dateOfBirth: e.target.value })}
          required
        />

        <label id="admin-register-label" className="admin-register-label">
          Phone
        </label>
        <input
          id="admin-register-input-phone"
          className="admin-register-input-phone"
          type="text"
          placeholder="     Phone Number"
          value={AInfo.phone}
          onChange={(e) => setAInfo({ ...AInfo, phone: e.target.value })}
          required
        />

        <label id="admin-register-label" className="admin-register-label">
          Address
        </label>
        <input
          id="admin-register-input-address"
          className="admin-register-input-address"
          type="text"
          placeholder="     Address"
          value={AInfo.address}
          onChange={(e) => setAInfo({ ...AInfo, address: e.target.value })}
          required
        />

        <label id="admin-register-label" className="admin-register-label">
          Email
        </label>
        <input
          id="admin-register-input-email"
          className="admin-register-input-email"
          type="email"
          placeholder="     Email"
          value={AInfo.email}
          onChange={(e) => setAInfo({ ...AInfo, email: e.target.value })}
          required
        />

        <label id="admin-register-label" className="admin-register-label">
          Password
        </label>
        <input
          id="admin-register-input-password"
          className="admin-register-input-password"
          type="password"
          placeholder="     Password"
          value={AInfo.password}
          onChange={(e) => setAInfo({ ...AInfo, password: e.target.value })}
          required
        />

        <label id="admin-register-label" className="admin-register-label">
          Confirm Password
        </label>
        <input
          id="admin-register-input-cpassword"
          className="admin-register-input-cpassword"
          type="password"
          placeholder="     Confirm Password"
          value={AInfo.cPassword}
          onChange={(e) => setAInfo({ ...AInfo, cPassword: e.target.value })}
          required
        />

        {/* This Is The Honey Bot Captcha */}
        <input
          id="admin-register-honey-bot"
          className="admin-register-honey-bot"
          type="text"
          hidden
        />

        <button
          id="admin-register-submit"
          onClick={SendData}
          className="admin-register-submit"
        >
          Register
        </button>

        <p className="reference-to-register-user">
          You Want User Account?{" "}
          <Link to="/user-register" className="link-inside-p-admin-register">
            Register As User
          </Link>
        </p>
      </form>
    </div>
  );
}
