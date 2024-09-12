import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image1 from "../assets/products/product1.jpg";
import Image2 from "../assets/products/product2.jfif";
import Image3 from "../assets/products/product3.jpg";
import Image4 from "../assets/products/product4.jpg";
import Image5 from "../assets/products/product5.jfif";
import Image6 from "../assets/products/product6.webp";
import Image7 from "../assets/products/product7.jpeg";
import Image8 from "../assets/products/product8.png";

export default function Home() {
  const div2Ref = useRef(null);
  const [div1Animation, setDiv1Animation] = useState(false);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setDiv1Animation(true);
    };

    const div2 = div2Ref.current;
    if (div2) {
      div2.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (div2) {
        div2.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

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
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="home-container" id="home-container">
      <div className="both-header-content">
        <div className="new-home-header">
          <div
            className={`cssanimation leMagnify sequence${
              div1Animation ? "animate" : ""
            }`}
            id={`new${div1Animation ? "animate" : ""}`}
          >
            {" "}
            New{" "}
          </div>{" "}
          <hr id="line" ref={div2Ref} />
          <div
            className={`cssanimation leMagnify sequence${
              div1Animation ? "animate" : ""
            }`}
            id={`fashion${div1Animation ? "animate" : ""}`}
          >
            {" "}
            Fashion{" "}
          </div>
        </div>

        <div className="blur-content">
          <div className="statement">{statements[currentIndex]}</div>
        </div>
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="side">
        <div className="box">
          <span style={{ "--i": 1 }}>
            <img src={Image1} alt="" />
          </span>
          <span style={{ "--i": 2 }}>
            <img src={Image2} alt="" />
          </span>
          <span style={{ "--i": 3 }}>
            <img src={Image3} alt="" />
          </span>
          <span style={{ "--i": 4 }}>
            <img src={Image4} alt="" />
          </span>
          <span style={{ "--i": 5 }}>
            <img src={Image5} alt="" />
          </span>
          <span style={{ "--i": 6 }}>
            <img src={Image6} alt="" />
          </span>
          <span style={{ "--i": 7 }}>
            <img src={Image7} alt="" />
          </span>
          <span style={{ "--i": 8 }}>
            <img src={Image8} alt="" />
          </span>
        </div>
      </div>

      <div className="new-home-footer"></div>
    </div>
  );
}
