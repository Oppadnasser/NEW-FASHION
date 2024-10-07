import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: Date,
    phone: "",
    address: "",
    email: "",
    password: "",
    cPassword: "",
    userType: "User",
    image: null,
    bio: "",
  });
  const navigate = useNavigate();

  const SendData = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", info.firstName);
    formData.append("lastName", info.lastName);
    formData.append("dateOfBirth", info.dateOfBirth);
    formData.append("phone", info.phone);
    formData.append("address", info.address);
    formData.append("email", info.email);
    formData.append("password", info.password);
    formData.append("userType", info.userType);
    formData.append("image", info.image);
    formData.append("bio", info.bio);
    axios
      .post("http://localhost:3000/sign-in", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/formdata",
        },
      })
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
  const setSeller = (checked) => {
    return checked ? "Seller" : "User";
  };
  return (
    <div className="register-form">
      <form
        className="the-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h1>Register As User</h1>
        <br />
        <br />
        <label>First Name</label>
        <input
          type="text"
          required
          value={info.firstName}
          onChange={(event) => {
            setInfo({ ...info, firstName: event.target.value });
          }}
        />
        <label>Last Name</label>
        <input
          type="text"
          required
          value={info.lastName}
          onChange={(event) => {
            setInfo({ ...info, lastName: event.target.value });
          }}
        />
        <label>Date Of Birth</label>
        <input
          type="date"
          required
          onChange={(event) => {
            setInfo({ ...info, dateOfBirth: event.target.value });
          }}
        />
        <label>Phone</label>
        <input
          type="text"
          required
          value={info.phone}
          onChange={(event) => {
            setInfo({ ...info, phone: event.target.value });
          }}
        />
        <label>Address</label>
        <input
          type="text"
          required
          value={info.address}
          onChange={(event) => {
            setInfo({ ...info, address: event.target.value });
          }}
        />
        <label>Email</label>
        <input
          type="text"
          required
          value={info.email}
          onChange={(event) => {
            setInfo({ ...info, email: event.target.value });
          }}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={info.password}
          onChange={(event) => {
            setInfo({ ...info, password: event.target.value });
          }}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          value={info.cPassword}
          onChange={(event) => {
            setInfo({ ...info, cPassword: event.target.value });
          }}
        />
        <label>Bio</label>
        <input
          type="textarea"
          required
          value={info.bio}
          onChange={(event) => {
            setInfo({ ...info, bio: event.target.value });
          }}
        />
        <label>Photo</label>
        <input
          type="file"
          required
          className="photo"
          accept="image/*"
          onChange={(event) => {
            setInfo({ ...info, image: event.target.files[0] });
          }}
        />
        <div style={{ display: "flex" }}>
          <input
            id="checkbox"
            type="checkbox"
            onClick={(event) => {
              setInfo({ ...info, userType: setSeller(event.target.checked) });
            }}
          />{" "}
          Account seller?
        </div>
        <button className="register-button" onClick={SendData}>
          Register
        </button>
        <label className="log-in-question">Already Have An Account?</label>
        <button className="log-in-button">
          <Link to="/Login" id="log-in-link">
            Log-in
          </Link>
        </button>
      </form>
    </div>
  );
}
