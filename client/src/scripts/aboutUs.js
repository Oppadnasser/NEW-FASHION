import { React, useEffect } from "react";
import axios from "axios";
export default function About() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/status", { withCredentials: true })
      .then((res) => {
        const hiddenItems = document.querySelectorAll(".hidden-content");
        hiddenItems.forEach((item) => {
          item.style.display = "block";
        });
        const showedItem = document.querySelectorAll(".showed-content");
        showedItem.forEach((element) => {
          element.style.display = "none";
        });
        if (res.request.response === "Admin") {
          const admin = document.querySelector(".admin-register-text");
          admin.style.display = "block";
        } else if (res.request.response === "Seller") {
          const Seller = document.querySelectorAll(".seller-content");
          Seller.forEach((item) => {
            item.style.display = "inline";
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="about-container" id="about-container">
      <h1 id="contact-h1" className="about-h1">
        About Us
      </h1>
      <br /> <br />
      <br />
      <details className="about-details">
        <summary id="summary-2" className="summary">
          Abd El-Gafour Nasser
        </summary>
        <ul className="summary-list">
          <li>
            <p className="about-summary">
              Student In Faculty Of Computer Science And Artificial
              Intelligence, Cairo University
            </p>
          </li>
          <li>
            <p className="about-summary">
              UndergraduateComputer Science Student{" "}
            </p>
          </li>
          <li>
            <p className="about-summary">
              Student At Information Systems Department
            </p>
          </li>
          <li>
            <p className="about-summary">Contact Number: (+20)103 045 2252</p>
          </li>
          <li>
            <p className="about-summary">
              Contact Email: oppadnasser@gmail.com
            </p>
          </li>
        </ul>
      </details>
    </div>
  );
}
