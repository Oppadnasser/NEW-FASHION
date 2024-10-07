import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Image1 from "../assets/products/product1.jpg";
import Image2 from "../assets/products/product2.jfif";
import Image3 from "../assets/products/product3.jpg";
import Image4 from "../assets/products/product4.jpg";
import Image5 from "../assets/products/easy deal.jfif";
import Image6 from "../assets/products/product6.webp";
import Image7 from "../assets/products/product7.jpeg";
import Image8 from "../assets/products/product8.png";
import { Link } from "react-router-dom";

export default function Home() {
  const statements = [
    "Welcome In New Fashion Store",
    "We Represent The Greatest Products",
    "With High Quality",
    "Best Place",
    "Easy Deal",
    "High Recommendation",
    "Sign-In Now",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % statements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [statements.length]);
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
            item.style.display = "block";
          });
        }
      })
      .catch((err) => {});
  });

  return (
    <div className="home-container" id="home-container">
      <div className="both-header-content">
        <div className="blur-content">
          <div className="statement">{statements[currentIndex]}</div>
        </div>
      </div>
      <div className="home-photos">
        <img src={images[currentIndex]} alt="no" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="/login">
        <button className="home-log-button">Log In</button>
      </Link>
      <span className="or">OR</span>
      <Link to="/user-register">
        <button className="home-sign-button">Sign In</button>
      </Link>
      <div className="new-home-footer"></div>
    </div>
  );
}
