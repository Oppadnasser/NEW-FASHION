import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [Information, setInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: Date,
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    deleteUser();
    alert("User Deleted Successfully");
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleUpdateButton = (event) => {
    event.preventDefault();
  };

  const handleUpdateClick = () => {
    setShowUpdatePopup(true);
  };

  const handleConfirmUpdate = () => {
    Update();
    alert("User Updated Successfully");
    setShowUpdatePopup(false);
  };

  const handleCancelUpdate = () => {
    setShowUpdatePopup(false);
  };

  const toPosts = () => {
    navigate("/myPosts");
  };
  const getData = () => {
    axios
      .get("http://localhost:3000/profile", { withCredentials: true })
      .then((res) => {
        setInfo(JSON.parse(res.request.response));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/status", { withCredentials: true })
      .then((res) => {
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
            item.style.display = "inline";
          });
        }
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const Update = () => {
    axios
      .patch(
        "http://localhost:3000/update",
        { ...Information },
        { withCredentials: true }
      )
      .then(() => {
        console.log("sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = () => {
    axios
      .delete("http://localhost:3000/delete", { withCredentials: true })
      .then(() => {
        console.log("done");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("some thing wrong");
      });
  };

  return (
    <div id="profile-container" className="profile-container">
      <h1 id="profile-h1" className="profile-h1">
        Profile
      </h1>
      <br /> <br />
      <table id="profile-table" className="profile-table">
        <tr id="profile-table-row" className="profile-table-row">
          <td id="profile-table-row-label" className="profile-table-row-label">
            <h3>Name: </h3>
          </td>
          <td id="profile-table-row-value" className="profile-table-row-value">
            <input
              type="text"
              value={Information.firstName + " " + Information.lastName}
              placeholder="Default Name"
              readOnly
            />
          </td>
        </tr>
        <tr id="profile-table-row" className="profile-table-row">
          <td id="profile-table-row-label" className="profile-table-row-label">
            <h3>Date Of Birth: </h3>
          </td>
          <td id="profile-table-row-value" className="profile-table-row-value">
            <input
              type="text"
              value={Information.dateOfBirth.toString().split("T")[0]}
              placeholder="1/1/2024"
              readOnly
            />
          </td>
        </tr>
        <tr id="profile-table-row" className="profile-table-row">
          <td id="profile-table-row-label" className="profile-table-row-label">
            <h3>Phone: </h3>
          </td>
          <td id="profile-table-row-value" className="profile-table-row-value">
            <input
              type="text"
              value={Information.phone}
              placeholder="01234567891"
              readOnly
            />
          </td>
        </tr>
        <tr id="profile-table-row" className="profile-table-row">
          <td id="profile-table-row-label" className="profile-table-row-label">
            <h3>Address: </h3>
          </td>
          <td id="profile-table-row-value" className="profile-table-row-value">
            <input
              type="text"
              value={Information.address}
              placeholder="Area, City"
              readOnly
            />
          </td>
        </tr>
        <tr id="profile-table-row" className="profile-table-row">
          <td id="profile-table-row-label" className="profile-table-row-label">
            <h3>Email: </h3>
          </td>
          <td id="profile-table-row-value" className="profile-table-row-value">
            <input
              type="text"
              value={Information.email}
              placeholder="fashion.show@mail.com"
              readOnly
            />
          </td>
        </tr>
        <tr id="profile-table-row" className="profile-table-row">
          <td id="profile-table-row-label" className="profile-table-row-label">
            <h3>Bio: </h3>
          </td>
          <td id="profile-table-row-value" className="profile-table-row-value">
            <textarea placeholder="Commercial Website To Sel, Buy Products" />
          </td>
        </tr>
      </table>
      <br />
      <button
        id="profile-update-button"
        className="profile-update-button"
        onClick={handleUpdateClick}
      >
        Update Data
      </button>
      <button
        id="profile-delete-button"
        className="profile-delete-button"
        onClick={handleDeleteClick}
      >
        Delete User
      </button>
      <button id="my-posts-button" className="seller-content" onClick={toPosts}>
        My Posts
      </button>
      {showDeletePopup && (
        <div className="delete-popup" id="delete-popup">
          <div className="delete-popup-content">
            <h2 className="delete-popup-h2">
              Do You Want To Delete Your Account !?
            </h2>
            <br />
            <br />
            <button className="yes-delete" onClick={handleConfirmDelete}>
              Delete
            </button>
            <button className="cancel-delete" onClick={handleCancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {showUpdatePopup && (
        <div className="update-popup" id="update-popup">
          <div className="update-popup-content">
            <form
              id="update-form"
              className="update-form"
              onClick={handleUpdateButton}
            >
              <h2 className="update-popup-h2">Update Account Data</h2>
              <br />

              <label id="update-label" className="update-label">
                First Name
              </label>
              <input
                id="update-input-fname"
                className="update-input-fname"
                type="text"
                placeholder="First Name"
                value={Information.firstName}
                onChange={(e) =>
                  setInfo({ ...Information, firtsName: e.target.value })
                }
              />

              <label id="update-label" className="update-label">
                Last Name
              </label>
              <input
                id="update-input-lname"
                className="update-input-lname"
                type="text"
                placeholder="Last Name"
                value={Information.lastName}
                onChange={(e) =>
                  setInfo({ ...Information, lastName: e.target.value })
                }
              />

              <label id="update-label" className="update-label">
                Date Of Birth
              </label>
              <input
                id="update-input-date"
                className="update-input-date"
                type="date"
                placeholder="Date Of Birth"
                value={Information.dateOfBirth.split("T")[0]}
                onChange={(e) =>
                  setInfo({ ...Information, dateOfBirth: e.target.value })
                }
              />

              <label id="update-label" className="update-label">
                Phone
              </label>
              <input
                id="update-input-phone"
                className="update-input-phone"
                type="text"
                placeholder="Phone Number"
                value={Information.phone}
                onChange={(e) =>
                  setInfo({ ...Information, phone: e.target.value })
                }
              />

              <label id="update-label" className="update-label">
                Address
              </label>
              <input
                id="update-input-address"
                className="update-input-address"
                type="text"
                placeholder="Address"
                value={Information.address}
                onChange={(e) =>
                  setInfo({ ...Information, address: e.target.value })
                }
              />

              <label id="update-label" className="update-label">
                Email
              </label>
              <input
                id="update-input-email"
                className="update-input-email"
                type="email"
                placeholder="Email"
                value={Information.email}
                onChange={(e) =>
                  setInfo({ ...Information, email: e.target.value })
                }
              />

              <label id="update-label" className="update-label">
                Password
              </label>
              <input
                id="update-input-password"
                className="update-input-password"
                type="text"
                placeholder="Password"
                value={Information.password}
                onChange={(e) =>
                  setInfo({ ...Information, password: e.target.value })
                }
              />
            </form>
            <button className="yes-update" onClick={handleConfirmUpdate}>
              Update
            </button>
            <button className="cancel-update" onClick={handleCancelUpdate}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
