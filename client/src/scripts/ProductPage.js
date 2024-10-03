import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export default function ProductPage() {
  const location = useLocation();
  const productInfo = location.state;
  const starPercentage = (productInfo.evaluation / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  productInfo.shippingDays = 3; //////////////////////////
  productInfo.color = "selver"; //////////////////////////
  const date = new Date();
  date.setDate(date.getDate() + productInfo.shippingDays);
  let days = date.getDate();
  let months = date.getMonth() + 1;
  const year = date.getFullYear();
  days = days > 9 ? days : "0" + days;
  months = months > 9 ? months : "0" + months;
  const ArriveDate = `${days}-${months}-${year}`;

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const review = () => {
    if (productInfo.evaluatorNumber >= 1000000) {
      return `${(productInfo.evaluatorNumber / 1000000).toFixed(0)} M+`;
    } else if (productInfo.evaluatorNumber >= 1000) {
      return `${(productInfo.evaluatorNumber / 1000).toFixed(0)} K+`;
    } else {
      return productInfo.evaluatorNumber;
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/status", { withCredentials: true })
      .then((res) => {
        const hiddenItems = document.querySelectorAll(".hidden-content");
        hiddenItems.forEach((item) => {
          item.style.display = "block";
        });
        const showedItem = document.querySelectorAll(".showed-content");
        showedItem.forEach((el) => {
          el.style.display = "none";
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
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="product-page">
      <div className="product-information">
        <h2 id="product-name">{productInfo.name}alsdkj</h2>
        <p id="product-description">{productInfo.description}</p>
        <p id="brand">Brand : {productInfo.companyName}</p>
        <div id="rats">
          <p id="number-ratings"> Rats {review()}</p>
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
        <h5>+{productInfo.shippingExpenses}eg Shipping expenses </h5>
        <br />
        <hr />
        <h3 id="aboutItem">About this Item:-</h3>
        <br />
        <table className="info-table">
          <tr>
            <td className="the-title">Name</td>
            <td>{productInfo.name}</td>
          </tr>
          <tr>
            <td className="the-title">
              <p>Description</p>
            </td>
            <td>
              <p className="product-description">{productInfo.description}</p>
            </td>
          </tr>
          <tr>
            <td className="the-title">Color</td>
            <td className="product color">{productInfo.color}</td>
          </tr>
          <tr>
            <td className="the-title">Total Price</td>
            <td>{productInfo.price + productInfo.ShippingExpenses}eg</td>
          </tr>
          <tr>
            <td className="the-title">Arrival Date</td>
            <td>{ArriveDate}</td>
          </tr>
          <tr>
            <td className="the-title">Available pices</td>
            <td>{productInfo.quantity}</td>
          </tr>
        </table>
        <button className="add-to-cart">Buy</button>
      </div>

      <div className="div-photo">
        <img className="product-photo" src={productInfo.photo} alt="" />
      </div>
    </div>
  );
}
