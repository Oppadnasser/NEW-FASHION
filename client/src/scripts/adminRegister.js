import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

export default function AdminRegister() {
    const [AInfo, setAInfo] = useState({
        fname:"",
        lname:"",
        date:"",
        phone:"",
        address:"",
        email:"",
        password:"",
        confirmPassword:""
    })
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
    }

    return (
        <div className="admin-register-container" id="admin-register-container">
            <form id="admin-register-form" className="admin-register-form" onSubmit={handleRegister}>
                <h1 id="admin-register-h1" className="admin-register-h1">Register As Admin</h1>
                <br />
                <label id="admin-register-label" className="admin-register-label">First Name</label>
                <input 
                    id="admin-register-input-fname"
                    className="admin-register-input-fname"
                    type="text" 
                    placeholder="     First Name"
                    value={AInfo.fname}
                    onChange= {((e) => setAInfo({...AInfo,fname:e.target.value}))}
                    required
                />

                <label id="admin-register-label" className="admin-register-label">Last Name</label>
                <input 
                    id="admin-register-input-lname"
                    className="admin-register-input-lname"
                    type="text" 
                    placeholder="     Last Name"
                    value={AInfo.lname}
                    onChange= {((e) => setAInfo({...AInfo,lname:e.target.value}))}
                    required
                />

                <label id="admin-register-label" className="admin-register-label">Date Of Birth</label>
                <input 
                    id="admin-register-input-date"
                    className="admin-register-input-date"
                    type="date" 
                    placeholder="     Date Of Birth"
                    value={AInfo.date}
                    onChange= {((e) => setAInfo({...AInfo,date:e.target.value}))}
                    required
                />

                <label id="admin-register-label" className="admin-register-label">Phone</label>
                <input 
                    id="admin-register-input-phone"
                    className="admin-register-input-phone"
                    type="text" 
                    placeholder="     Phone Number"
                    value={AInfo.phone}
                    onChange= {((e) => setAInfo({...AInfo,phone:e.target.value}))}
                    required
                />

                <label id="admin-register-label" className="admin-register-label">Address</label>
                <input 
                    id="admin-register-input-address"
                    className="admin-register-input-address"
                    type="text" 
                    placeholder="     Address"
                    value={AInfo.address}
                    onChange= {((e) => setAInfo({...AInfo,address:e.target.value}))}
                    required
                />

                <label id="admin-register-label" className="admin-register-label">Email</label>
                <input 
                    id="admin-register-input-email"
                    className="admin-register-input-email"
                    type="email" 
                    placeholder="     Email"
                    value={AInfo.email}
                    onChange= {((e) => setAInfo({...AInfo,email:e.target.value}))}
                    required
                />

                <label id="admin-register-label" className="admin-register-label">Password</label>
                <input 
                    id="admin-register-input-password"
                    className="admin-register-input-password"
                    type="text" 
                    placeholder="     Password"
                    value={AInfo.password}
                    onChange= {((e) => setAInfo({...AInfo,password:e.target.value}))}
                    required
                />

                <label id="admin-register-label" className="admin-register-label">Confirm Password</label>
                <input 
                    id="admin-register-input-cpassword"
                    className="admin-register-input-cpassword"
                    type="text" 
                    placeholder="     Confirm Password"
                    value={AInfo.confirmPassword}
                    onChange= {((e) => setAInfo({...AInfo,confirmPassword:e.target.value}))}
                    required
                />

                {/* This Is The Honey Bot Captcha */}
                <input 
                    id="admin-register-honey-bot"
                    className="admin-register-honey-bot"
                    type="text" 
                    hidden
                />

                <button id="admin-register-submit" className="admin-register-submit">Register</button>

                <p className="reference-to-register-user">You Want User Account? <Link to="/user-register" className="link-inside-p-admin-register">Register As User</Link></p>
            </form>
        </div>
    );
}