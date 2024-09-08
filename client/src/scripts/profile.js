import React, { useState } from "react";

export default function Profile() {
    const [Information, setInfo] = useState({
        fname:"",
        lname:"",
        date:"",
        phone:"",
        address:"",
        email:"",
        password:""
    })


    // const [fname, setFname] = useState("");
    // const [lname, setLname] = useState("");
    // const [date, setDate] = useState("");
    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    }

    const handleConfirmDelete = () => {
        alert("User Deleted Successfully");
        setShowDeletePopup(false);
    }

    const handleCancelDelete = () => {
        setShowDeletePopup(false);
    }

    const handleUpdateButton = (event) => {
        event.preventDefault();
    }

    const handleUpdateClick = () => {
        setShowUpdatePopup(true);
    }

    const handleConfirmUpdate = () => {
        alert("User Updated Successfully");
        setShowUpdatePopup(false);
    }

    const handleCancelUpdate = () => {
        setShowUpdatePopup(false);
    }

    return (
        <div id="profile-container" className="profile-container">
            <h1 id="profile-h1" className="profile-h1">Profile</h1>
            <br /> <br />
            <table id="profile-table" className="profile-table">
                <tr id="profile-table-row" className="profile-table-row">
                    <td id="profile-table-row-label" className="profile-table-row-label"><h3>Name:  </h3></td>
                    <td id="profile-table-row-value" className="profile-table-row-value"><input type="text" placeholder="Default Name" /></td>
                </tr>
                <tr id="profile-table-row" className="profile-table-row">
                    <td id="profile-table-row-label" className="profile-table-row-label"><h3>Date Of Birth:  </h3></td>
                    <td id="profile-table-row-value" className="profile-table-row-value"><input type="text" placeholder="1/1/2024" /></td>
                </tr>
                <tr id="profile-table-row" className="profile-table-row">
                    <td id="profile-table-row-label" className="profile-table-row-label"><h3>Phone:  </h3></td>
                    <td id="profile-table-row-value" className="profile-table-row-value"><input type="text" placeholder="01234567891" /></td>
                </tr>
                <tr id="profile-table-row" className="profile-table-row">
                    <td id="profile-table-row-label" className="profile-table-row-label"><h3>Address:  </h3></td>
                    <td id="profile-table-row-value" className="profile-table-row-value"><input type="text" placeholder="Area, City" /></td>
                </tr>
                <tr id="profile-table-row" className="profile-table-row">
                    <td id="profile-table-row-label" className="profile-table-row-label"><h3>Email:  </h3></td>
                    <td id="profile-table-row-value" className="profile-table-row-value"><input type="text" placeholder="fashion.show@mail.com" /></td>
                </tr>
                <tr id="profile-table-row" className="profile-table-row">
                    <td id="profile-table-row-label" className="profile-table-row-label"><h3>Bio:  </h3></td>
                    <td id="profile-table-row-value" className="profile-table-row-value"><textarea placeholder="Commercial Website To Sel, Buy Products"/></td>
                </tr>
            </table>

            <br />

            <button id="profile-update-button" className="profile-update-button" onClick={handleUpdateClick}>Update Data</button>
            <button id="profile-delete-button" className="profile-delete-button" onClick={handleDeleteClick}>Delete User</button>

            {
                showDeletePopup &&
                (
                    <div className="delete-popup" id="delete-popup">
                        <div className="delete-popup-content">
                            <h2 className="delete-popup-h2">Do You Want To Delete Your Account !?</h2>
                            <br /><br />
                            <button className="yes-delete" onClick={handleConfirmDelete}>Delete</button>
                            <button className="cancel-delete" onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    </div>
                )
            }

            {
                showUpdatePopup &&
                (
                    <div className="update-popup" id="update-popup">
                        <div className="update-popup-content">
                            <form id="update-form" className="update-form" onClick={handleUpdateButton}>
                                <h2 className="update-popup-h2">Update Account Data</h2>
                                <br />

                                <label id="update-label" className="update-label">First Name</label>
                                <input 
                                    id="update-input-fname"
                                    className="update-input-fname"
                                    type="text" 
                                    placeholder="First Name"
                                    value={Information.fname}
                                    onChange= {((e) => setInfo({...Information,fname:e.target.value}))}
                                />

                                <label id="update-label" className="update-label">Last Name</label>
                                <input 
                                    id="update-input-lname"
                                    className="update-input-lname"
                                    type="text" 
                                    placeholder="Last Name"
                                    value={Information.lname}
                                    onChange= {((e) => setInfo({...Information,lname:e.target.value}))}
                                />

                                <label id="update-label" className="update-label">Date Of Birth</label>
                                <input 
                                    id="update-input-date"
                                    className="update-input-date"
                                    type="date" 
                                    placeholder="Date Of Birth"
                                    value={Information.date}
                                    onChange= {((e) => setInfo({...Information,date:e.target.value}))}
                                />

                                <label id="update-label" className="update-label">Phone</label>
                                <input 
                                    id="update-input-phone"
                                    className="update-input-phone"
                                    type="text" 
                                    placeholder="Phone Number"
                                    value={Information.phone}
                                    onChange= {((e) => setInfo({...Information,phone:e.target.value}))}
                                />

                                <label id="update-label" className="update-label">Address</label>
                                <input 
                                    id="update-input-address"
                                    className="update-input-address"
                                    type="text" 
                                    placeholder="Address"
                                    value={Information.address}
                                    onChange= {((e) => setInfo({...Information,address:e.target.value}))}
                                />

                                <label id="update-label" className="update-label">Email</label>
                                <input 
                                    id="update-input-email"
                                    className="update-input-email"
                                    type="email" 
                                    placeholder="Email"
                                    value={Information.email}
                                    onChange= {((e) => setInfo({...Information,email:e.target.value}))}
                                />

                                <label id="update-label" className="update-label">Password</label>
                                <input 
                                    id="update-input-password"
                                    className="update-input-password"
                                    type="text" 
                                    placeholder="Password"
                                    value={Information.password}
                                    onChange= {((e) => setInfo({...Information,password:e.target.value}))}
                                />
                            </form>
                            <button className="yes-update" onClick={handleConfirmUpdate}>Update</button>
                            <button className="cancel-update" onClick={handleCancelUpdate}>Cancel</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}