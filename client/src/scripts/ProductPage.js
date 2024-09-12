import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export default function ProductPage() {
  const location = useLocation();
  const productInfo = location.state;
  console.log(productInfo.evaluation);
  const starPercentage = (productInfo.evaluation / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="product-page">
      <div className="product-information">
        <p id="product-describtion">{productInfo.description}</p>
        <p id="brand">Brand : {productInfo.companyName}</p>
        <div id="rats">
          <p id="number-ratings"> Rats {productInfo.evaluatorNumber}</p>
          <p id="the-rate">{productInfo.evaluation.toFixed(1)}</p>
          <div class="stars-outer">
            <div
              class="stars-inner"
              style={{ width: starPercentageRounded }}
            ></div>
          </div>
        </div>
        <hr />
        <h1 className="price">{numberWithCommas(productInfo.price)} eg</h1>
        <h5>the Shipping expenses {productInfo.shippingExpenses} eg</h5>
        <br />
        <hr />
        <h3 id="aboutItem">About this Item</h3>2
      </div>

      <div className="div-photo">
        <img className="product-photo" src={productInfo.photo} alt="" />
      </div>
    </div>
  );
}
